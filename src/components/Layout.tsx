import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '../store'

export default function Layout() {
  const location = useLocation()
  const {  } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // SVG 图标组件 — 简洁圆角线条风格（粗描边 + 浅色填充块点缀）
  const NavIcon = ({ type, className = "w-[18px] h-[18px]" }: { type: string; className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
      // 首页 - 小房子（参考 Home 图标风格：屋顶三角 + 大圆角门体）
      home: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 9.5V19a2 2 0 002 2h10a2 2 0 002-2V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="9" y="14" width="6" height="7" rx="1.5" fill="currentColor" opacity="0.2"/>
          <circle cx="12" cy="17" r="0.8" fill="currentColor" opacity="0.5"/>
        </svg>
      ),
      // 排行榜 - 奖杯（简洁粗线条杯身 + 浅色填充）
      ranking: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M8 3h8v8a4 4 0 01-8 0V3z" fill="currentColor" opacity="0.15"/>
          <path d="M8 3h8v8a4 4 0 01-8 0V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5H5.5a1.5 1.5 0 00-1.5 1.5v0A3.5 3.5 0 007.5 10H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 5h2.5A1.5 1.5 0 0120 6.5v0A3.5 3.5 0 0116.5 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 15h4v2H10z" fill="currentColor" opacity="0.2"/>
          <path d="M8 19h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      // 历史比赛 - 日历记分卡（大圆角矩形 + 日历顶环 + 横线）
      history: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="4" width="18" height="18" rx="3" fill="currentColor" opacity="0.12"/>
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="15" r="1.2" fill="currentColor" opacity="0.4"/>
          <circle cx="12" cy="15" r="1.2" fill="currentColor" opacity="0.4"/>
          <circle cx="16" cy="15" r="1.2" fill="currentColor" opacity="0.4"/>
        </svg>
      ),
      // 百鸟记录 - 小鸟（简洁圆润鸟身 + 翅膀弧线）
      birdie: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="10" cy="13" r="6" fill="currentColor" opacity="0.12"/>
          <circle cx="10" cy="13" r="6" stroke="currentColor" strokeWidth="2"/>
          <circle cx="8.5" cy="11.5" r="1" fill="currentColor"/>
          <path d="M13 12l3-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 8c2-2.5 5-2 6-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 19l-1 3M11 19l0.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      // 会费记录 - 钱袋/钱包（参考 Wallet 风格：大圆角矩形 + 搭扣装饰）
      finance: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="6" width="20" height="15" rx="3" fill="currentColor" opacity="0.12"/>
          <rect x="2" y="6" width="20" height="15" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 11h20" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="5" height="3.5" rx="1.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="16.5" cy="15.8" r="0.6" fill="currentColor"/>
        </svg>
      ),
      // 规则 - 书本（参考 Book 风格：大圆角翻书 + 横线装饰）
      rules: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill="currentColor" opacity="0.12"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      // 管理 - 工具扳手（参考 Tool 图标风格：简洁扳手 + 小十字装饰）
      admin: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" fill="currentColor" opacity="0.12"/>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="17" r="1" fill="currentColor" opacity="0.4"/>
        </svg>
      ),
    };
    return icons[type] || null;
  };

  const navItems = [
    { path: '/', label: '首页', iconType: 'home', shortLabel: '首页' },
    { path: '/ranking', label: '排行榜', iconType: 'ranking', shortLabel: '排行' },
    { path: '/history', label: '历史比赛', iconType: 'history', shortLabel: '比赛' },
    { path: '/birdie', label: '百鸟记录', iconType: 'birdie', shortLabel: '百鸟' },
    { path: '/finance', label: '会费记录', iconType: 'finance', shortLabel: '会费' },
    { path: '/rules', label: '规则', iconType: 'rules', shortLabel: '规则' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  return (
    <div className="min-h-screen flex flex-col nature-pattern">
      {/* Header - 天蓝绿色导航栏 */}
      <header className="sticky top-0 z-50" style={{
        background: 'linear-gradient(135deg, #135c33 0%, #17753f 40%, #1d8f4e 80%, #2a9d5c 100%)',
        boxShadow: '0 2px 20px rgba(19, 92, 51, 0.25), 0 1px 3px rgba(0, 0, 0, 0.06)',
      }}>
        {/* 装饰性云朵 */}
        <div className="absolute top-1 right-16 w-12 h-4 rounded-full opacity-10" style={{ background: '#fdf6e3' }} />
        <div className="absolute top-2 right-32 w-8 h-3 rounded-full opacity-8" style={{ background: '#fdf6e3' }} />
        
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 font-bold text-base sm:text-lg tracking-wide group">
            <div className="relative">
              <img src="https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/logos/logo.png" alt="百鸟会" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 p-0.5 group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-white drop-shadow-sm">百鸟会</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-0.5 items-center">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                  isActive(item.path)
                    ? 'font-semibold text-white shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
                style={isActive(item.path) ? { background: 'rgba(253, 246, 227, 0.2)' } : undefined}
              >
                <span className="inline-flex items-center flex-shrink-0"><NavIcon type={item.iconType} /></span>
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              to="/admin"
              className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                location.pathname === '/admin'
                  ? 'font-semibold text-white shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
              style={location.pathname === '/admin' ? { background: 'rgba(253, 246, 227, 0.2)' } : undefined}
            >
              <span className="inline-flex items-center flex-shrink-0"><NavIcon type="admin" /></span>
              <span>管理</span>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-1.5">
            <Link
              to="/admin"
              className={`p-2 rounded-xl transition-all duration-200 inline-flex items-center ${
                location.pathname === '/admin'
                  ? 'font-medium text-white'
                  : 'text-white/80'
              }`}
              style={location.pathname === '/admin' ? { background: 'rgba(253, 246, 227, 0.2)' } : undefined}
            >
              <NavIcon type="admin" className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10" style={{ background: 'rgba(15, 72, 40, 0.96)', backdropFilter: 'blur(16px)' }}>
            <nav className="max-w-4xl mx-auto px-4 py-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive(item.path)
                      ? 'font-semibold text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                  style={isActive(item.path) ? { background: 'rgba(253, 246, 227, 0.15)' } : undefined}
                >
                  <span className="inline-flex items-center flex-shrink-0"><NavIcon type={item.iconType} className="w-5 h-5" /></span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer - 山丘波浪装饰 */}
      <footer className="relative py-4 sm:py-5 text-center text-xs px-4">
        {/* SVG 山丘装饰 */}
        <div className="absolute inset-x-0 -top-6 h-8 overflow-hidden">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 40 Q240 10 480 25 Q720 40 960 20 Q1200 0 1440 15 L1440 40 Z" fill="rgba(29, 143, 78, 0.04)" />
            <path d="M0 40 Q360 20 720 30 Q1080 40 1440 25 L1440 40 Z" fill="rgba(59, 184, 115, 0.03)" />
          </svg>
        </div>
        <div className="relative text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-golf-500">⛳</span>
            <span className="hidden sm:inline text-gray-500">百鸟会 · </span>
            高尔夫会员比赛与成绩管理系统
          </span>
        </div>
      </footer>
    </div>
  )
}
