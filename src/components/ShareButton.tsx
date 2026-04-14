import { useState, useCallback } from 'react'
import { toPng } from 'html-to-image'

interface ShareButtonProps {
  /** 要截图的 DOM 元素的 ref */
  targetRef: React.RefObject<HTMLElement | null>
  /** 保存的文件名前缀 */
  fileName?: string
  /** 按钮样式类名 */
  className?: string
  /** 按钮文字 */
  label?: string
}

/** 将远程图片 URL 转为 base64 data URL */
async function urlToBase64(url: string): Promise<string> {
  try {
    const resp = await fetch(url, { mode: 'cors' })
    const blob = await resp.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    // fetch 也失败时，用 canvas 代理方式尝试
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        try {
          resolve(canvas.toDataURL('image/png'))
        } catch {
          reject(new Error('Canvas tainted'))
        }
      }
      img.onerror = reject
      img.src = url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now()
    })
  }
}

/** 判断是否为跨域 URL */
function isCrossOrigin(url: string): boolean {
  if (!url || url.startsWith('data:') || url.startsWith('blob:')) return false
  try {
    const u = new URL(url, window.location.href)
    return u.origin !== window.location.origin
  } catch {
    return false
  }
}

/** 将 DOM 中所有跨域图片和背景图转为 base64，返回恢复函数 */
async function inlineAllCrossOriginImages(root: HTMLElement): Promise<() => void> {
  const restoreTasks: Array<() => void> = []

  // 1. 处理 <img> 标签
  const imgs = root.querySelectorAll<HTMLImageElement>('img')
  const imgPromises = Array.from(imgs).map(async (img) => {
    const src = img.src
    if (!isCrossOrigin(src)) return
    try {
      const base64 = await urlToBase64(src)
      const origSrc = img.src
      img.src = base64
      restoreTasks.push(() => { img.src = origSrc })
    } catch {
      // 跳过无法转换的图片
    }
  })

  // 2. 处理 CSS background-image
  const allElements = root.querySelectorAll<HTMLElement>('*')
  const bgPromises = Array.from(allElements).map(async (el) => {
    const style = window.getComputedStyle(el)
    const bgImage = style.backgroundImage
    if (!bgImage || bgImage === 'none') return

    const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/)
    if (!urlMatch) return
    const bgUrl = urlMatch[1]
    if (!isCrossOrigin(bgUrl)) return

    try {
      const base64 = await urlToBase64(bgUrl)
      const origBg = el.style.backgroundImage
      el.style.backgroundImage = `url(${base64})`
      restoreTasks.push(() => { el.style.backgroundImage = origBg })
    } catch {
      // 跳过无法转换的背景
    }
  })

  await Promise.all([...imgPromises, ...bgPromises])

  return () => {
    restoreTasks.forEach(fn => fn())
  }
}

export default function ShareButton({ targetRef, fileName = 'share', className, label = '分享图片' }: ShareButtonProps) {
  const [generating, setGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    if (!targetRef.current || generating) return

    setGenerating(true)
    let restoreImages: (() => void) | null = null
    try {
      const node = targetRef.current

      // 先将所有跨域图片内联为 base64
      restoreImages = await inlineAllCrossOriginImages(node)

      // 多次渲染以确保字体等资源加载完成
      let dataUrl = ''
      for (let i = 0; i < 2; i++) {
        dataUrl = await toPng(node, {
          cacheBust: false,
          pixelRatio: 2,
          backgroundColor: '#f8fafc',
          style: {
            padding: '16px',
          },
          filter: (domNode) => {
            if (domNode instanceof HTMLElement) {
              return !domNode.classList?.contains('share-btn-exclude')
            }
            return true
          },
        })
      }

      // 恢复原始图片 URL
      restoreImages()
      restoreImages = null

      // 添加百鸟会水印
      const img = new Image()
      img.src = dataUrl
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height + 60
          const ctx = canvas.getContext('2d')!
          ctx.fillStyle = '#f8fafc'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
          ctx.fillStyle = '#f0fdf4'
          ctx.fillRect(0, img.height, canvas.width, 60)
          ctx.fillStyle = '#16a34a'
          ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('🐦 百鸟会 Birdie Club', canvas.width / 2, img.height + 38)
          dataUrl = canvas.toDataURL('image/png')
          resolve()
        }
      })

      setImageUrl(dataUrl)
      setShowPreview(true)
    } catch (err) {
      console.error('生成图片失败:', err)
      alert('生成图片失败，请重试')
    } finally {
      // 确保任何情况下都恢复原始图片
      if (restoreImages) restoreImages()
      setGenerating(false)
    }
  }, [targetRef, generating])

  const handleDownload = useCallback(() => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.download = `${fileName}-${new Date().toISOString().slice(0, 10)}.png`
    link.href = imageUrl
    link.click()
  }, [imageUrl, fileName])

  const handleClose = useCallback(() => {
    setShowPreview(false)
    setImageUrl(null)
  }, [])

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className={className || `share-btn-exclude inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-golf-600 hover:bg-golf-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
      >
        {generating ? (
          <>
            <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>生成中...</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{label}</span>
          </>
        )}
      </button>

      {/* 图片预览弹窗 */}
      {showPreview && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleClose}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">📸 分享图片</h3>
              <button onClick={handleClose} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 图片预览 */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <img src={imageUrl} alt="分享图片" className="w-full rounded-lg shadow-sm border border-gray-100" />
            </div>

            {/* 操作按钮 */}
            <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-golf-600 hover:bg-golf-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                保存图片
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                关闭
              </button>
            </div>

            {/* 长按提示 */}
            <div className="px-4 pb-3 text-center">
              <p className="text-[10px] sm:text-xs text-gray-400">💡 手机端可长按图片保存到相册</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
