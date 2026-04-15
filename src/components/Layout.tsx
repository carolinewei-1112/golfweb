import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '../store'

export default function Layout() {
  const location = useLocation()
  const {  } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // SVG 图标组件
  const NavIcon = ({ type, className = "w-[18px] h-[18px]" }: { type: string; className?: string }) => {
    const icons: Record<string, React.ReactNode> = {
      // 首页 - 高尔夫球场旗帜
      home: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 21V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 4L15 8L4 12" fill="currentColor" opacity="0.85"/>
          <ellipse cx="14" cy="19" rx="6" ry="2.5" fill="currentColor" opacity="0.2"/>
          <circle cx="14" cy="18" r="2" fill="currentColor" opacity="0.5"/>
        </svg>
      ),
      // 排行榜 - 奖杯
      ranking: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M8 2h8v9a4 4 0 01-8 0V2z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 4H5a2 2 0 00-2 2v1a3 3 0 003 3h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 4h3a2 2 0 012 2v1a3 3 0 01-3 3h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M9 15h6l1 3H8l1-3z" fill="currentColor" opacity="0.4"/>
          <path d="M7 18h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
      // 历史比赛 - 记分卡
      history: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="3" y="2" width="18" height="20" rx="3" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 7h10M7 11h7M7 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="17" cy="15" r="2.5" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="1"/>
          <path d="M16.2 15l.6.6 1.4-1.4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      // 百鸟记录 - 小鸟
      birdie: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M14.5 8.5c2.5-2 5.5-1 5.5-1s-1 3-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="11" cy="14" rx="7" ry="5.5" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="9" cy="12.5" r="1.2" fill="currentColor"/>
          <path d="M13 13.5l2.5-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 19.5c-1 1.5-1.5 2.5-1.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 19.5c0 1.5.3 2.5.3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      // 会费管理 - 钱包
      finance: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="6" width="20" height="14" rx="3" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="17" cy="15" r="1.8" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M6 6V5a2 2 0 012-2h8a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      // 规则 - 高尔夫规则书
      rules: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 4.5A2.5 2.5 0 016.5 2H18a2 2 0 012 2v16a2 2 0 01-2 2H6.5A2.5 2.5 0 014 19.5v-15z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 7h6M9 10.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="14.5" r="1" fill="currentColor" opacity="0.5"/>
        </svg>
      ),
      // 管理 - 齿轮设置
      admin: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    { path: '/finance', label: '会费管理', iconType: 'finance', shortLabel: '会费' },
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
