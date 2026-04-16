import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useStore } from '../store'
import { Icon, Logo, ClubBrand } from './Icons'

export default function Layout() {
  const location = useLocation()
  const {  } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // SVG 图标组件 — 双色调风格：黑线条 + 黄绿色(#c5e84d)纯色色块点缀
  const NavIcon = ({ type, className = "w-[18px] h-[18px]" }: { type: string; className?: string }) => {
    const sw = "1.8";
    const accent = "#c5e84d"; // 黄绿强调色
    const icons: Record<string, React.ReactNode> = {
      // 首页 - 小房子
      home: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="10" y="14" width="4.5" height="6.5" rx="1" fill={accent}/>
          <path d="M4 11.5L12 4l8 7.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 10v8.5a2 2 0 002 2h8a2 2 0 002-2V10" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      // 排行榜 - 奖杯
      ranking: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="6" r="2.5" fill={accent}/>
          <path d="M8 4h8v7a4 4 0 01-8 0V4z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
          <path d="M8 6H5.5A1.5 1.5 0 004 7.5 3.5 3.5 0 007.5 11H8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          <path d="M16 6h2.5A1.5 1.5 0 0120 7.5 3.5 3.5 0 0116.5 11H16" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          <path d="M12 15v3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          <path d="M8 20h8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      ),
      // 历史比赛 - 日历
      history: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="8" cy="15" r="2" fill={accent}/>
          <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth={sw}/>
          <path d="M8 3v3M16 3v3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          <circle cx="12" cy="15" r="1" fill="currentColor"/>
          <circle cx="16" cy="15" r="1" fill="currentColor"/>
        </svg>
      ),
      // 百鸟记录 - 小鸟（侧脸朝左，圆身体+三角尖嘴+圆眼带高光）
      birdie: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          {/* 黄绿色翅膀 */}
          <ellipse cx="15" cy="13" rx="3" ry="4" transform="rotate(20 15 13)" fill={accent}/>
          {/* 圆滚滚身体 */}
          <ellipse cx="13" cy="12.5" rx="7.5" ry="7" stroke="currentColor" strokeWidth={sw}/>
          {/* 三角形尖嘴巴（朝左） */}
          <path d="M6 10.5L2 9l0.2 3z" fill={accent} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          {/* 圆眼睛 */}
          <circle cx="9" cy="10.5" r="2.2" fill="currentColor"/>
          {/* 眼睛高光 */}
          <circle cx="8.3" cy="9.8" r="0.8" fill="white"/>
          {/* 翅膀轮廓 */}
          <path d="M18.5 10c1 1.5.5 4-1.5 5.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          {/* 小尾巴 */}
          <path d="M20.5 11.5c1.2-.8 1.8-2.2 1.2-3.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          {/* 小脚 */}
          <path d="M11 19v2.2M14.5 19.3v2.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      ),
      // 会费记录 - 钱包
      finance: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="16.5" cy="14" r="2" fill={accent}/>
          <rect x="2.5" y="5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
          <path d="M2.5 10h19" stroke="currentColor" strokeWidth={sw}/>
          <rect x="14" y="12.5" width="5" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      ),
      // 规则 - 书本
      rules: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="8" y="6" width="6" height="3.5" rx="1" fill={accent}/>
          <path d="M6 3h13v18H6a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
          <path d="M4 17.5A2 2 0 016 16h13" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7.5h7" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
          <path d="M8 11h5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      ),
      // 管理 - 齿轮
      admin: (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="3" fill={accent}/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={sw}/>
          <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M17.95 17.95l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M17.95 6.05l1.77-1.77" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
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
        background: 'linear-gradient(135deg, #1f3a18 0%, #2e4f24 40%, #3d6630 80%, #4a7a38 100%)',
        boxShadow: '0 2px 20px rgba(46, 79, 36, 0.25), 0 1px 3px rgba(0, 0, 0, 0.06)',
      }}>
        {/* 装饰性云朵 */}
        <div className="absolute top-1 right-16 w-12 h-4 rounded-full opacity-10" style={{ background: '#fdf6e3' }} />
        <div className="absolute top-2 right-32 w-8 h-3 rounded-full opacity-8" style={{ background: '#fdf6e3' }} />
        
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between relative">
          <Link to="/" className="flex items-center">
            <ClubBrand variant="nav" />
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
              to="/birdie"
              className={`p-2 rounded-xl transition-all duration-200 inline-flex items-center ${
                isActive('/birdie')
                  ? 'font-medium text-white'
                  : 'text-white/80'
              }`}
              style={isActive('/birdie') ? { background: 'rgba(253, 246, 227, 0.2)' } : undefined}
            >
              <NavIcon type="birdie" className="w-5 h-5" />
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
          <div className="md:hidden border-t border-white/10" style={{ background: 'rgba(31, 58, 24, 0.96)', backdropFilter: 'blur(16px)' }}>
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
            <path d="M0 40 Q240 10 480 25 Q720 40 960 20 Q1200 0 1440 15 L1440 40 Z" fill="rgba(78, 126, 58, 0.04)" />
            <path d="M0 40 Q360 20 720 30 Q1080 40 1440 25 L1440 40 Z" fill="rgba(140, 198, 63, 0.03)" />
          </svg>
        </div>
        <div className="relative text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-golf-500"><Icon name="golf" className="w-4 h-4 inline-block" /></span>
            <span className="hidden sm:inline text-gray-500">百鸟会 · </span>
            高尔夫会员比赛与成绩管理系统
          </span>
        </div>
      </footer>
    </div>
  )
}
