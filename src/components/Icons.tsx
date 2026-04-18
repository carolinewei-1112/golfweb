// 双色调 SVG 图标集 — 统一风格：黑线条(#2d2d2d, sw=1.8) + 黄绿色(#c5e84d)纯色色块
// 用于替换全站 emoji

const sw = '1.8'
const ac = '#c5e84d' // accent 黄绿色

// 百鸟会 Logo — 极简现代风：圆形浅灰绿底 + 圆胖深色小鸟 + 亮绿翅膀
// 参考设计：简洁圆形图标，小鸟居中，绿色叶形翅膀装饰
export function Logo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* 圆形浅灰绿背景 */}
      <circle cx="32" cy="32" r="31" fill="#e4e8e0" />

      {/* 绿色翅膀/叶子装饰（左后方） */}
      <ellipse cx="22" cy="28" rx="9" ry="14" transform="rotate(-25 22 28)" fill="#8cc63f" />
      <ellipse cx="22" cy="28" rx="9" ry="14" transform="rotate(-25 22 28)" fill="none" stroke="#6aa22a" strokeWidth="0.8" opacity="0.5"/>
      {/* 叶脉 */}
      <path d="M18 18c2.5 5 5 9 7.5 13" stroke="#6aa22a" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>
      <path d="M16 22c2 3.5 4 6.5 6 10" stroke="#6aa22a" strokeWidth="0.6" opacity="0.25" strokeLinecap="round"/>

      {/* 小鸟圆胖身体 */}
      <ellipse cx="35" cy="33" rx="14.5" ry="15" fill="#3a4538" />
      {/* 鸟腹部略亮 */}
      <ellipse cx="34.5" cy="38" rx="9" ry="8.5" fill="#4a5846" />

      {/* 鸟嘴（朝左，小三角） */}
      <path d="M21.5 29l-5.5-1.5 3 4.5z" fill="#e8a735" stroke="#c48820" strokeWidth="0.6" strokeLinejoin="round"/>

      {/* 眼睛（大白眼 + 深瞳孔 + 高光） */}
      <circle cx="25.5" cy="28" r="4.5" fill="white" />
      <circle cx="24.5" cy="27.5" r="2.5" fill="#2d2d2d" />
      <circle cx="23.5" cy="26.5" r="0.9" fill="white" />

      {/* 小尾巴（右上方翘起） */}
      <path d="M49 25c2-3.5 3-6.5 2.5-10" stroke="#3a4538" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M48.5 27c3-2.5 5-5.5 4.5-9.5" stroke="#3a4538" strokeWidth="2.5" strokeLinecap="round"/>

      {/* 小脚 */}
      <line x1="30" y1="47" x2="28.5" y2="52.5" stroke="#3a4538" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="38" y1="47.5" x2="37" y2="52.5" stroke="#3a4538" strokeWidth="2.2" strokeLinecap="round"/>
      {/* 脚趾 */}
      <path d="M28.5 52.5l-2.5 1" stroke="#3a4538" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28.5 52.5l1.5 1.2" stroke="#3a4538" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M37 52.5l-2 1" stroke="#3a4538" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M37 52.5l1.8 1.2" stroke="#3a4538" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// 鸟王专属小鸟图标 — 与主Logo完全一致的缩小版（64x64 viewBox，相同造型和配色）
function BirdKingIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* 圆形浅灰绿背景 */}
      <circle cx="32" cy="32" r="31" fill="#e4e8e0" />

      {/* 绿色翅膀/叶子装饰（左后方） */}
      <ellipse cx="22" cy="28" rx="9" ry="14" transform="rotate(-25 22 28)" fill="#8cc63f" />
      <ellipse cx="22" cy="28" rx="9" ry="14" transform="rotate(-25 22 28)" fill="none" stroke="#6aa22a" strokeWidth="0.8" opacity="0.5"/>
      {/* 叶脉 */}
      <path d="M18 18c2.5 5 5 9 7.5 13" stroke="#6aa22a" strokeWidth="0.8" opacity="0.35" strokeLinecap="round"/>

      {/* 小鸟圆胖身体 */}
      <ellipse cx="35" cy="33" rx="14.5" ry="15" fill="#3a4538" />
      {/* 鸟腹部略亮 */}
      <ellipse cx="34.5" cy="38" rx="9" ry="8.5" fill="#4a5846" />

      {/* 鸟嘴（朝左，小三角） */}
      <path d="M21.5 29l-5.5-1.5 3 4.5z" fill="#e8a735" stroke="#c48820" strokeWidth="0.6" strokeLinejoin="round"/>

      {/* 眼睛（大白眼 + 深瞳孔 + 高光） */}
      <circle cx="25.5" cy="28" r="4.5" fill="white" />
      <circle cx="24.5" cy="27.5" r="2.5" fill="#2d2d2d" />
      <circle cx="23.5" cy="26.5" r="0.9" fill="white" />

      {/* 小尾巴（右上方翘起） */}
      <path d="M49 25c2-3.5 3-6.5 2.5-10" stroke="#3a4538" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M48.5 27c3-2.5 5-5.5 4.5-9.5" stroke="#3a4538" strokeWidth="2.5" strokeLinecap="round"/>

      {/* 小脚 */}
      <line x1="30" y1="47" x2="28.5" y2="52.5" stroke="#3a4538" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="38" y1="47.5" x2="37" y2="52.5" stroke="#3a4538" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

// 鸟王徽章 — 鸟王小鸟图标 + 序号，胶囊形状
const birdKingStyles = [
  { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', text: '#92400e', border: '1px solid rgba(251, 191, 36, 0.4)', shadow: '0 1px 4px rgba(251,191,36,0.25)' },
  { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', text: '#475569', border: '1px solid rgba(148, 163, 184, 0.4)', shadow: '0 1px 4px rgba(148,163,184,0.2)' },
  { bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)', text: '#9a3412', border: '1px solid rgba(249, 115, 22, 0.3)', shadow: '0 1px 4px rgba(249,115,22,0.2)' },
]

export function BirdKingBadge({ rank, className = '' }: { rank: number; className?: string }) {
  const s = birdKingStyles[rank] || birdKingStyles[0]
  const num = rank + 1
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1 sm:px-1.5 py-px rounded-full flex-shrink-0 whitespace-nowrap ${className}`}
      style={{ background: s.bg, color: s.text, border: s.border, boxShadow: s.shadow, fontSize: 0 }}
    >
      <BirdKingIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full" />
      <span className="text-[9px] sm:text-[10px] font-bold leading-none">鸟王{num}</span>
    </span>
  )
}

// 统一品牌组件 — Logo + 俱乐部名 + 副标题
// variant: 'nav' 导航栏紧凑版, 'hero' 首页大版
export function ClubBrand({ variant = 'nav' }: { variant?: 'nav' | 'hero' }) {
  if (variant === 'hero') {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Logo 带光晕 */}
        <div className="relative text-white flex-shrink-0">
          <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(197, 232, 77, 0.2) 0%, transparent 70%)', transform: 'scale(1.3)' }} />
          <Logo className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-lg relative" />
        </div>
        {/* 文字区 */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md tracking-wide leading-tight">百鸟会</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="text-[10px] sm:text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: 'rgba(197, 232, 77, 0.2)', color: ac, border: '1px solid rgba(197, 232, 77, 0.3)' }}
            >GOLF TIME</span>
            <span className="text-white/40 text-[10px]">⛳</span>
          </div>
        </div>
      </div>
    )
  }

  // variant === 'nav'
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 group">
      <div className="relative flex-shrink-0 text-white group-hover:scale-105 transition-transform">
        <Logo className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-extrabold text-sm sm:text-base tracking-wide drop-shadow-sm">百鸟会</span>
        <span
          className="text-[8px] sm:text-[9px] font-semibold tracking-widest mt-0.5"
          style={{ color: ac, opacity: 0.85 }}
        >BIRD CLUB</span>
      </div>
    </div>
  )
}

export function Icon({ name, className = 'w-[1em] h-[1em] inline-block align-[-0.125em]' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {

    // ⛳ 高尔夫旗
    golf: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 3v18" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M6 3l10 4.5L6 12V3z" fill={ac} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <ellipse cx="8" cy="20.5" rx="4.5" ry="1.5" fill="currentColor" opacity="0.15"/>
      </svg>
    ),

    // 🏆 奖杯
    trophy: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="6" r="2.5" fill={ac}/>
        <path d="M8 4h8v7a4 4 0 01-8 0V4z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M8 6H5.5A1.5 1.5 0 004 7.5 3.5 3.5 0 007.5 11H8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M16 6h2.5A1.5 1.5 0 0120 7.5 3.5 3.5 0 0116.5 11H16" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M12 15v3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M8 20h8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 🐦 小鸟（朝左）
    bird: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="15" cy="13" rx="3" ry="4" transform="rotate(20 15 13)" fill={ac}/>
        <ellipse cx="13" cy="12.5" rx="7.5" ry="7" stroke="currentColor" strokeWidth={sw}/>
        <path d="M6 10.5L2 9l0.2 3z" fill={ac} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="9" cy="10.5" r="2.2" fill="currentColor"/>
        <circle cx="8.3" cy="9.8" r="0.8" fill="white"/>
        <path d="M18.5 10c1 1.5.5 4-1.5 5.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M20.5 11.5c1.2-.8 1.8-2.2 1.2-3.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M11 19v2.2M14.5 19.3v2.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 📋 剪贴板
    clipboard: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="8.5" y="2" width="7" height="3.5" rx="1.2" fill={ac} stroke="currentColor" strokeWidth="1.4"/>
        <rect x="4" y="4.5" width="16" height="17" rx="2.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 11h8M8 14.5h5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 👥 多人
    people: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="9" cy="7.5" r="3" fill={ac}/>
        <circle cx="9" cy="7.5" r="3" stroke="currentColor" strokeWidth={sw}/>
        <path d="M3 19.5c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="16.5" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M18 13.5c2 .8 3.5 2.8 3.5 5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),

    // 👤 人像
    person: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="8" r="3.5" fill={ac}/>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 📊 柱状图
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="14" width="4" height="7" rx="1" fill={ac}/>
        <rect x="3" y="14" width="4" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="10" y="8" width="4" height="13" rx="1" stroke="currentColor" strokeWidth={sw}/>
        <rect x="17" y="4" width="4" height="17" rx="1" stroke="currentColor" strokeWidth={sw}/>
      </svg>
    ),

    // 💰 钱袋
    moneybag: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 6c-4 0-7.5 3-7.5 8.5s3.5 7 7.5 7 7.5-1.5 7.5-7S16 6 12 6z" fill={ac} opacity="0.25"/>
        <path d="M12 6c-4 0-7.5 3-7.5 8.5s3.5 7 7.5 7 7.5-1.5 7.5-7S16 6 12 6z" stroke="currentColor" strokeWidth={sw}/>
        <path d="M9.5 3.5L12 6l2.5-2.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14.5h4M12 12.5v4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // ➕ 收入(加号圆圈)
    income: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill={ac} opacity="0.18"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={sw}/>
        <path d="M12 7.5v9M7.5 12h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),

    // ➖ 支出(减号圆圈)
    expense: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={sw}/>
        <path d="M7.5 12h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),

    // 🚀 进步之星 — 火箭上升 + 星星
    horse: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* 尾焰 */}
        <path d="M10 19c0.8-1.5 1.2-3 1-4.5" stroke="#e8a735" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
        <path d="M14 19c-0.8-1.5-1.2-3-1-4.5" stroke="#e8a735" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
        <path d="M12 20c0-2 0-3.5 0-5" stroke="#ef6c00" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
        {/* 火箭身体 */}
        <path d="M12 3c-3 3-4 6.5-4 10h8c0-3.5-1-7-4-10z" fill={ac} opacity="0.25"/>
        <path d="M12 3c-3 3-4 6.5-4 10h8c0-3.5-1-7-4-10z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        {/* 火箭窗口 */}
        <circle cx="12" cy="9.5" r="2" fill={ac} stroke="currentColor" strokeWidth="1.2"/>
        {/* 侧翼 */}
        <path d="M8 13l-2.5 2.5 1 0.5L8 14.5" fill={ac} opacity="0.4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        <path d="M16 13l2.5 2.5-1 0.5L16 14.5" fill={ac} opacity="0.4" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        {/* 小星星装饰 */}
        <path d="M4.5 5l0.6 1.2 1.3 0.2-0.95 0.9 0.22 1.3L4.5 7.9 3.33 8.6l0.22-1.3-0.95-0.9 1.3-0.2z" fill="currentColor" opacity="0.3"/>
        <path d="M19 8l0.4 0.8 0.9 0.13-0.65 0.63 0.15 0.9L19 10l-0.8 0.45 0.15-0.9-0.65-0.63 0.9-0.13z" fill="currentColor" opacity="0.25"/>
      </svg>
    ),

    // 📉 退步红马 — 下坠流星 + 向下箭头
    downfall: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* 下坠轨迹 */}
        <path d="M5 4c2 2 4.5 5 6.5 8" stroke="#e8a735" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
        <path d="M3 6c2.5 2 5 5.5 7 8.5" stroke="#ef6c00" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
        {/* 主体箭头 */}
        <path d="M8 5l10 10v-4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 15h-4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        {/* 中心下坠物 */}
        <circle cx="14" cy="14" r="4.5" fill={ac} opacity="0.2"/>
        <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M14 12v4M12.5 14.5l1.5 1.5 1.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        {/* 碎片装饰 */}
        <circle cx="6" cy="18" r="1" fill="currentColor" opacity="0.2"/>
        <circle cx="9.5" cy="20" r="0.8" fill="currentColor" opacity="0.15"/>
      </svg>
    ),

    // 🐦 打鸟之星 — 鸟 + 星光，用于打鸟之哥/姐
    birdstar: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* 翅膀 */}
        <ellipse cx="15" cy="13" rx="3" ry="4" transform="rotate(20 15 13)" fill={ac}/>
        {/* 鸟身 */}
        <ellipse cx="13" cy="12.5" rx="7.5" ry="7" stroke="currentColor" strokeWidth={sw}/>
        {/* 鸟嘴 */}
        <path d="M6 10.5L2 9l0.2 3z" fill={ac} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        {/* 眼睛 */}
        <circle cx="9" cy="10.5" r="2.2" fill="currentColor"/>
        <circle cx="8.3" cy="9.8" r="0.8" fill="white"/>
        {/* 尾巴 */}
        <path d="M18.5 10c1 1.5.5 4-1.5 5.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M20.5 11.5c1.2-.8 1.8-2.2 1.2-3.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        {/* 小脚 */}
        <path d="M11 19v2.2M14.5 19.3v2.2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        {/* 星星装饰 */}
        <path d="M3.5 3l0.5 1.1 1.2 0.17-0.85 0.83 0.2 1.2L3.5 5.7 2.45 6.3l0.2-1.2-0.85-0.83 1.2-0.17z" fill={ac} stroke="currentColor" strokeWidth="0.6"/>
        <path d="M20 2l0.35 0.7 0.8 0.12-0.58 0.56 0.14 0.8L20 3.8l-0.7 0.38 0.14-0.8-0.58-0.56 0.8-0.12z" fill={ac} stroke="currentColor" strokeWidth="0.5"/>
      </svg>
    ),

    // 🎯 靶心
    target: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={sw}/>
        <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="2.2" fill={ac} stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),

    // 👑 皇冠
    crown: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 17L6 8l4 5 2-6 2 6 4-5 2 9H4z" fill={ac}/>
        <path d="M4 17L6 8l4 5 2-6 2 6 4-5 2 9H4z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M4 17h16v3H4z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
      </svg>
    ),

    // 🎉 庆祝
    party: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 21L8 7l10 10L4 21z" fill={ac} opacity="0.25"/>
        <path d="M4 21L8 7l10 10L4 21z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M14 3v3M18 5l-2 2M20 9h-3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="10" cy="3.5" r="1" fill={ac}/>
        <circle cx="20" cy="13" r="1" fill={ac}/>
      </svg>
    ),

    // 💪 肌肉(加油)
    muscle: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M7 13c-1.5 0-2.5 1-2.5 2.5V18c0 1.4 1.1 2.5 2.5 2.5h2" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M9 20.5h4c1.5 0 3-1 3-3v-4l2-3c.8-1.2.3-2.8-1-3.5-1.2-.6-2.5 0-3 1L13 10" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 10V6c0-1.4-1-2.5-2.3-2.5S8.5 4.6 8.5 6v7" fill={ac} opacity="0.3"/>
        <path d="M13 10V6c0-1.4-1-2.5-2.3-2.5S8.5 4.6 8.5 6v7" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 📍 图钉
    pin: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" fill={ac} opacity="0.2"/>
        <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" stroke="currentColor" strokeWidth={sw}/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth={sw}/>
      </svg>
    ),

    // 🥚 蛋
    egg: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 3c-3.5 0-6.5 4-6.5 9.5S8.5 21 12 21s6.5-3.5 6.5-8.5S15.5 3 12 3z" fill={ac} opacity="0.15"/>
        <path d="M12 3c-3.5 0-6.5 4-6.5 9.5S8.5 21 12 21s6.5-3.5 6.5-8.5S15.5 3 12 3z" stroke="currentColor" strokeWidth={sw}/>
        <ellipse cx="13.5" cy="10" rx="1.5" ry="2" fill="white" opacity="0.6" transform="rotate(-15 13.5 10)"/>
      </svg>
    ),

    // 📈 趋势上升
    trending: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 18l6-6 4 3 8-9" fill={ac} opacity="0" />
        <path d="M3 18l6-6 4 3 8-9" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6h5v5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="12" r="1.5" fill={ac}/>
      </svg>
    ),

    // 🏌️ 高尔夫球手
    golfer: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="14" cy="5" r="2.5" fill={ac}/>
        <circle cx="14" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 21l2-8 4 2-1 6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 13l-5-4 7-1" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5" cy="9" r="1.2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),

    // 📢 喇叭
    megaphone: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M18 3v18l-8-4.5V7.5L18 3z" fill={ac} opacity="0.25"/>
        <path d="M18 3v18l-8-4.5V7.5L18 3z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <rect x="4" y="7.5" width="6" height="9" rx="1.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M4 16.5l-1 4h3l1-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // 🍽️ 餐具(吃饭)
    dining: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="14" rx="8" ry="6" fill={ac} opacity="0.15"/>
        <ellipse cx="12" cy="14" rx="8" ry="6" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 3v5.5c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M12 11v3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 🎁 礼物
    gift: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="8.5" width="18" height="4" rx="1.2" fill={ac} stroke="currentColor" strokeWidth={sw}/>
        <rect x="4.5" y="12.5" width="15" height="8.5" rx="1.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M12 8.5v12.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M12 8.5c-2-3-5.5-3-5.5-.5s3.5 2.5 5.5.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M12 8.5c2-3 5.5-3 5.5-.5s-3.5 2.5-5.5.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),

    // 📦 包裹
    box: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3.5 8L12 3l8.5 5v10L12 23l-8.5-5V8z" fill={ac} opacity="0.15"/>
        <path d="M3.5 8L12 3l8.5 5v10L12 23l-8.5-5V8z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M12 13v10M3.5 8L12 13l8.5-5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
      </svg>
    ),

    // 📜 卷轴
    scroll: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M8 3h10a2 2 0 012 2v14c0 1.7-1.3 3-3 3H7" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M8 3C6.3 3 5 4.3 5 6v12a3 3 0 003 3h9" stroke="currentColor" strokeWidth={sw}/>
        <path d="M5 6c0-1.7 1.3-3 3-3" stroke="currentColor" strokeWidth={sw}/>
        <rect x="9" y="7" width="6" height="3" rx="1" fill={ac}/>
        <path d="M9 13h8M9 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),

    // 🧤 手套
    glove: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M7 10V5c0-1.1.9-2 2-2s2 .9 2 2v5" fill={ac} opacity="0.2"/>
        <path d="M7 10V5c0-1.1.9-2 2-2s2 .9 2 2v5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M11 10V4c0-1.1.9-2 2-2s2 .9 2 2v6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M15 10V6c0-1.1.9-2 2-2s2 .9 2 2v6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M7 10c-1.7 0-3 1.3-3 3v2c0 3.3 2.7 6 6 6h4c3.3 0 6-2.7 6-6v-3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 💡 灯泡
    bulb: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" fill={ac} opacity="0.2"/>
        <path d="M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" stroke="currentColor" strokeWidth={sw}/>
        <path d="M9 18h6M10 20h4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M12 3V1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),

    // 📌 图钉(标记)
    pushpin: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M9 2l6 0 1.5 6H7.5L9 2z" fill={ac} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7.5 8h9v2.5a2 2 0 01-2 2h-5a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth={sw}/>
        <path d="M12 12.5V22" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // 🍚 米饭
    rice: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 12h16c0 5.5-3.6 9-8 9s-8-3.5-8-9z" fill={ac} opacity="0.15"/>
        <path d="M4 12h16c0 5.5-3.6 9-8 9s-8-3.5-8-9z" stroke="currentColor" strokeWidth={sw}/>
        <path d="M6 12c0-3 1.5-5.5 3-7M12 12c0-3.5 0-6.5 0-8M18 12c0-3-1.5-5.5-3-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),

    // 🏟️ 体育场
    stadium: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="9" rx="9" ry="4" fill={ac} opacity="0.2"/>
        <ellipse cx="12" cy="9" rx="9" ry="4" stroke="currentColor" strokeWidth={sw}/>
        <path d="M3 9v6c0 2.2 4 4 9 4s9-1.8 9-4V9" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 5V2M16 5V2M12 5V1" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    ),

    // ✏️ 铅笔
    pencil: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M15.5 4.5l4 4L8 20H4v-4L15.5 4.5z" fill={ac} opacity="0.15"/>
        <path d="M15.5 4.5l4 4L8 20H4v-4L15.5 4.5z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M13 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),

    // 📷 相机
    camera: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="2" y="7" width="20" height="13" rx="2.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 7l1.5-3h5L16 7" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <circle cx="12" cy="13.5" r="3.5" fill={ac} opacity="0.25"/>
        <circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth={sw}/>
        <circle cx="12" cy="13.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),

    // 🔒 锁
    lock: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="10" width="16" height="12" rx="2.5" fill={ac} opacity="0.15"/>
        <rect x="4" y="10" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="12" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),

    // 🔓 开锁
    unlock: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="10" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth={sw}/>
        <path d="M8 10V7a4 4 0 018 0" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <circle cx="12" cy="16" r="2" fill={ac}/>
      </svg>
    ),

    // 🔧 扳手
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="8" cy="8" r="5" fill={ac} opacity="0.2"/>
        <path d="M14 14l6 6M14 14l-1.5-1.5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
        <path d="M8 3a5 5 0 00-4.5 7l7-7A5 5 0 008 3z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M3.5 10l7-7" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="18.5" cy="18.5" r="1.5" fill="currentColor"/>
      </svg>
    ),

    // 🥇 金牌
    gold: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="14" r="6.5" fill="#FBBF24" opacity="0.3"/>
        <circle cx="12" cy="14" r="6.5" stroke="currentColor" strokeWidth={sw}/>
        <text x="12" y="17.5" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800">1</text>
        <path d="M8 3l4 5 4-5" stroke="#D97706" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // 🥈 银牌
    silver: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="14" r="6.5" fill="#CBD5E1" opacity="0.3"/>
        <circle cx="12" cy="14" r="6.5" stroke="currentColor" strokeWidth={sw}/>
        <text x="12" y="17.5" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800">2</text>
        <path d="M8 3l4 5 4-5" stroke="#94A3B8" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // 🥉 铜牌
    bronze: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="14" r="6.5" fill="#F97316" opacity="0.2"/>
        <circle cx="12" cy="14" r="6.5" stroke="currentColor" strokeWidth={sw}/>
        <text x="12" y="17.5" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="800">3</text>
        <path d="M8 3l4 5 4-5" stroke="#C2410C" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),

    // ⛳ 高尔夫球 (用于奖品展示) — 真实高尔夫球：圆球+凹坑纹理+底部阴影
    golfball: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        {/* 球体外圈 */}
        <circle cx="12" cy="12" r="9.5" fill="currentColor" opacity="0.15"/>
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5"/>
        {/* 镂空凹坑 - 大圆点，清晰可见 */}
        <circle cx="12" cy="6.5" r="1.4" fill="currentColor" opacity="0.5"/>
        <circle cx="8" cy="9" r="1.4" fill="currentColor" opacity="0.5"/>
        <circle cx="16" cy="9" r="1.4" fill="currentColor" opacity="0.5"/>
        <circle cx="12" cy="12" r="1.4" fill="currentColor" opacity="0.5"/>
        <circle cx="7.5" cy="13.5" r="1.2" fill="currentColor" opacity="0.4"/>
        <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" opacity="0.4"/>
        <circle cx="10" cy="16.5" r="1.2" fill="currentColor" opacity="0.4"/>
        <circle cx="14" cy="16.5" r="1.2" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  }

  return <>{icons[name] || null}</>
}
