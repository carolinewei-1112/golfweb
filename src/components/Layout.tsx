import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '../store'

export default function Layout() {
  const location = useLocation()
  const {  } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: '首页', icon: '🏠', shortLabel: '首页' },
    { path: '/ranking', label: '排行榜', icon: '🏆', shortLabel: '排行' },
    { path: '/history', label: '历史比赛', icon: '📋', shortLabel: '比赛' },
    { path: '/birdie', label: '百鸟记录', icon: '🐦', shortLabel: '百鸟' },
    { path: '/finance', label: '会费管理', icon: '💰', shortLabel: '会费' },
    { path: '/rules', label: '规则', icon: '📜', shortLabel: '规则' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path))
  }

  return (
    <div className="min-h-screen flex flex-col nature-pattern">
      {/* Header - 毛玻璃导航栏 */}
      <header className="sticky top-0 z-50" style={{
        background: 'linear-gradient(135deg, #166e3a 0%, #1a8a47 40%, #22a85a 100%)',
        boxShadow: '0 2px 16px rgba(22, 110, 58, 0.2), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
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
                className={`px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white/25 font-semibold text-white shadow-sm'
                    : 'text-white/85 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                location.pathname === '/admin'
                  ? 'bg-white/25 font-semibold text-white shadow-sm'
                  : 'text-white/85 hover:bg-white/15 hover:text-white'
              }`}
            >
              <span className="mr-1">🔧</span>
              管理
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-1.5">
            <Link
              to="/admin"
              className={`p-2 rounded-xl transition-all duration-200 ${
                location.pathname === '/admin'
                  ? 'bg-white/25 font-medium'
                  : 'hover:bg-white/15'
              }`}
            >
              <span>🔧</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-white/15 transition-all duration-200"
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
          <div className="md:hidden border-t border-white/15" style={{ background: 'rgba(20, 87, 48, 0.95)', backdropFilter: 'blur(12px)' }}>
            <nav className="max-w-4xl mx-auto px-4 py-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-white/20 font-semibold text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
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

      {/* Footer - 更精致 */}
      <footer className="py-4 sm:py-5 text-center text-xs px-4" style={{ background: 'linear-gradient(to top, rgba(22, 110, 58, 0.04), transparent)' }}>
        <div className="text-gray-400">
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
