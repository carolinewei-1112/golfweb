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

/** 判断 URL 是否为跨域 */
function isCrossOrigin(url: string): boolean {
  if (!url || url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('/')) return false
  try {
    const u = new URL(url, window.location.href)
    return u.origin !== window.location.origin
  } catch {
    return false
  }
}

/**
 * 生成首字母占位头像 data URL（用于无法处理的跨域小图）
 */
function generateAvatarPlaceholder(name: string, size = 128): string {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  ctx.fillStyle = `hsl(${Math.abs(hash) % 360}, 55%, 60%)`
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = `bold ${size * 0.45}px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size / 2 + 1)
  return canvas.toDataURL('image/png')
}

/**
 * 生成渐变色矩形占位图 data URL（用于无法处理的跨域大图）
 */
function generateRectPlaceholder(width = 400, height = 200): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#16a34a')
  gradient.addColorStop(1, '#059669')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.15)'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = `${Math.min(width, height) * 0.08}px sans-serif`
  ctx.textAlign = 'right'
  ctx.fillText('🏌️ Birdie Club', width - 10, height - 10)
  return canvas.toDataURL('image/png')
}

/**
 * 将 DOM 中残留的跨域图片替换为占位符（兜底用）
 * 主要图片已经通过 Vite 代理变为同源，这里只处理漏网之鱼
 */
function replaceCrossOriginImages(root: HTMLElement): () => void {
  const restoreTasks: Array<() => void> = []

  // 处理 <img> 标签
  root.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    if (!isCrossOrigin(img.src)) return
    const origSrc = img.src
    const isSmall = img.clientWidth <= 80 && img.clientHeight <= 80
    img.src = isSmall
      ? generateAvatarPlaceholder(img.alt || '?')
      : generateRectPlaceholder(img.clientWidth * 2 || 400, img.clientHeight * 2 || 200)
    restoreTasks.push(() => { img.src = origSrc })
  })

  // 处理 CSS background-image
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    const bg = window.getComputedStyle(el).backgroundImage
    if (!bg || bg === 'none') return
    const m = bg.match(/url\(["']?(.*?)["']?\)/)
    if (!m || !isCrossOrigin(m[1])) return
    const origBg = el.style.backgroundImage
    const placeholder = generateRectPlaceholder(el.clientWidth * 2 || 400, el.clientHeight * 2 || 200)
    el.style.backgroundImage = `url(${placeholder})`
    restoreTasks.push(() => { el.style.backgroundImage = origBg })
  })

  return () => restoreTasks.forEach(fn => fn())
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

      // 兜底：替换残留的跨域图片为占位符
      restoreImages = replaceCrossOriginImages(node)

      // 等待一帧让 DOM 更新
      await new Promise(r => requestAnimationFrame(r))

      // 渲染两次确保字体等资源加载
      let dataUrl = ''
      for (let i = 0; i < 2; i++) {
        dataUrl = await toPng(node, {
          cacheBust: false,
          pixelRatio: 2,
          backgroundColor: '#f8fafc',
          style: { padding: '16px' },
          filter: (domNode) => {
            if (domNode instanceof HTMLElement) {
              return !domNode.classList?.contains('share-btn-exclude')
            }
            return true
          },
        })
      }

      // 恢复原始图片
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
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm sm:text-base font-bold text-gray-800">📸 分享图片</h3>
              <button onClick={handleClose} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <img src={imageUrl} alt="分享图片" className="w-full rounded-lg shadow-sm border border-gray-100" />
            </div>

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

            <div className="px-4 pb-3 text-center">
              <p className="text-[10px] sm:text-xs text-gray-400">💡 手机端可长按图片保存到相册</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
