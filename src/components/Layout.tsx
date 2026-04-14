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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-golf-700 to-golf-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 font-bold text-base sm:text-lg tracking-wide">
            <img src="/A_minimalist_line_art_logo_for_2026-04-14T05-48-05.png" alt="百鸟会" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white" />
            <span>百鸟会</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 items-center">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  isActive(item.path)
                    ? 'bg-white/20 font-medium'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                location.pathname === '/admin'
                  ? 'bg-white/20 font-medium'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="mr-1">🔧</span>
              管理
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/admin"
              className={`p-2 rounded-lg transition-all ${
                location.pathname === '/admin'
                  ? 'bg-white/20 font-medium'
                  : 'hover:bg-white/10'
              }`}
            >
              <span>🔧</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden bg-golf-800 border-t border-golf-600">
            <nav className="max-w-4xl mx-auto px-4 py-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    isActive(item.path)
                      ? 'bg-white/20 font-medium'
                      : 'hover:bg-white/10'
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
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-3 sm:py-4 text-center text-xs text-gray-400 px-4">
        <span className="hidden sm:inline">百鸟会 · </span>高尔夫会员比赛与成绩管理系统
      </footer>
    </div>
  )
}
