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

export default function ShareButton({ targetRef, fileName = 'share', className, label = '分享图片' }: ShareButtonProps) {
  const [generating, setGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    if (!targetRef.current || generating) return

    setGenerating(true)
    try {
      const node = targetRef.current

      // 多次渲染以确保图片加载完成（html-to-image 的已知问题）
      let dataUrl = ''
      for (let i = 0; i < 3; i++) {
        dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: '#f8fafc',
          style: {
            padding: '16px',
          },
          includeQueryParams: true,
          filter: (domNode) => {
            // 过滤掉分享按钮本身
            if (domNode instanceof HTMLElement) {
              return !domNode.classList?.contains('share-btn-exclude')
            }
            return true
          },
        })
      }

      // 添加百鸟会水印
      const img = new Image()
      img.src = dataUrl
      await new Promise<void>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height + 60
          const ctx = canvas.getContext('2d')!
          // 画白色底部区域
          ctx.fillStyle = '#f8fafc'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          // 画原图
          ctx.drawImage(img, 0, 0)
          // 画底部水印区域
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
