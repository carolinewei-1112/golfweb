import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getCourseImage } from '../data'
import type { ReactNode } from 'react'
import { Icon, Logo, ClubBrand, BirdKingBadge } from '../components/Icons'

function Card({ to, icon, title, children, accent }: {
  to: string; icon: ReactNode; title: string; children: ReactNode; accent?: string
}) {
  return (
    <Link
      to={to}
      className="block rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 card-shadow hover:card-shadow-hover"
      style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
    >
      <div className={`px-4 sm:px-5 py-3.5 ${accent || ''}`} style={!accent ? { background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.5) 0%, rgba(240, 243, 236, 0.5) 100%)' } : undefined}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(78, 126, 58, 0.1)' }}>
            {icon}
          </div>
          <h2 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h2>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-3.5 sm:py-4">{children}</div>
    </Link>
  )
}

function StatBadge({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
      <span>{icon}</span>
      <span className="text-white font-semibold">{value}</span>
      <span className="text-white/75">{label}</span>
    </div>
  )
}

export default function HomePage() {
  const { tournaments, games, progressRanking, getMemberById, announcements, members, birdieRecords } = useStore()

  const recentTournaments = [...tournaments]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)

  // 获取最近打鸟记录（按鸟号降序，显示最新的3个）
  const recentBirdies = [...birdieRecords]
    .sort((a, b) => b.number - a.number)
    .slice(0, 3)

  // 鸟王映射：打鸟次数前3名
  const birdKingMap = (() => {
    const countMap = new Map<string, number>()
    birdieRecords.forEach(r => countMap.set(r.memberId, (countMap.get(r.memberId) || 0) + 1))
    return new Map([...countMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id], i) => [id, i]))
  })()

  return (
    <div className="space-y-5 sm:space-y-7 animate-fade-in">
      {/* Hero Banner - 全幅插画背景 + 叠加文字 */}
      <div className="rounded-3xl overflow-hidden relative" style={{
        background: '#4a7a38',
        boxShadow: '0 4px 32px rgba(26, 46, 20, 0.25), 0 1px 4px rgba(0, 0, 0, 0.06)',
        minHeight: '320px',
      }}>
        {/* 背景图片 */}
        <img
          src="/images/backgrounds/golf-banner.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* 深色遮罩 - 左侧文字区域更深，保证文字可读 */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20, 40, 15, 0.55) 0%, rgba(20, 40, 15, 0.25) 50%, rgba(20, 40, 15, 0.15) 100%)' }} />

        {/* 内容层 */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col justify-between" style={{ minHeight: '320px' }}>
          {/* 顶部 - Logo + 统计 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="text-white">
                <Logo className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-lg" />
              </div>
              <span className="text-[10px] sm:text-xs text-white/60 font-medium tracking-widest uppercase">Bainiao Golf Club</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <StatBadge icon={<Icon name="golfball" className="w-3.5 h-3.5 text-white" />} value={tournaments.length} label="场赛" />
              <StatBadge icon={<Icon name="person" className="w-3.5 h-3.5 text-white" />} value={members.length} label="会员" />
            </div>
          </div>

          {/* 中间 - 大标题 + 副标题 */}
          <div className="my-4 sm:my-6">
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight drop-shadow-lg" style={{ fontFamily: "'SF Pro Display', 'PingFang SC', system-ui, sans-serif", textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              百鸟会
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-2 sm:mt-3 leading-relaxed max-w-[280px] sm:max-w-[360px] drop-shadow-md" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              高尔夫会员 记录每次挥杆时刻
            </p>
            {/* 百鸟进度条 */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2.5 max-w-[280px] sm:max-w-[340px]">
              <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap" style={{ color: '#c5e84d', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                百鸟进度
              </span>
              <div className="flex-1 rounded-full h-1.5 overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min((birdieRecords.length / 100) * 100, 100)}%`, background: '#c5e84d', boxShadow: '0 0 8px rgba(197, 232, 77, 0.5)' }} />
              </div>
              <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap" style={{ color: '#c5e84d', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                <Icon name="bird" className="w-3.5 h-3.5 inline-block align-[-0.12em]" /> {birdieRecords.length}/100
              </span>
            </div>
          </div>

          {/* 底部 - 公告 */}
          <div className="flex items-stretch gap-2 sm:gap-3">
            <div className="flex items-center flex-shrink-0">
              <div className="rounded-lg flex items-center justify-center px-2 py-2" style={{ background: 'rgba(197, 232, 77, 0.2)', backdropFilter: 'blur(4px)' }}>
                <Icon name="megaphone" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {announcements.slice(0, 2).map(a => (
                <div key={a.id} className="rounded-lg px-3 py-2 text-xs sm:text-sm break-words leading-relaxed font-medium" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255, 255, 255, 0.9)' }}>
                  {a.content}
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="rounded-lg px-3 py-2 text-xs sm:text-sm break-words leading-relaxed font-medium" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)', color: 'rgba(255, 255, 255, 0.9)' }}>
                  4月月赛时间4月18日，请各位会员预留时间。
                </div>
              )}
              {announcements.length > 2 && (
                <div className="text-xs text-white/50 text-right mt-1">还有 {announcements.length - 2} 条公告</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 本月月赛预告 */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl card-shadow group" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.5)' }}>
        <div className="h-40 sm:h-52 overflow-hidden relative">
          <img
            src="/images/courses/junlan-aerial-island.png"
            alt="广州君兰高尔夫球场"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white flex items-center gap-1" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)' }}>
              <Icon name="megaphone" className="w-3.5 h-3.5" /> 本月月赛预告
            </span>
          </div>

          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 text-white">
            <h3 className="text-xl sm:text-2xl font-bold drop-shadow-lg">4月月赛</h3>
            <p className="text-xs sm:text-sm text-white/90 drop-shadow-sm mt-0.5">广州君兰高尔夫球场</p>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
              <div className="px-2.5 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Icon name="clipboard" className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold text-amber-700">2026年4月18日</span>
              </div>
              <div className="px-2.5 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(221, 228, 213, 0.6)' }}>
                <Icon name="pin" className="w-3.5 h-3.5 text-golf-600" />
                <span className="font-medium text-golf-700">广州君兰</span>
              </div>
            </div>
            <div className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 2px 8px rgba(46, 79, 36, 0.2)' }}>
              即将开赛 <Icon name="golf" className="w-3.5 h-3.5 inline-block align-[-0.12em]" />
            </div>
          </div>
        </div>
      </div>

      {/* 近期比赛 和 排行榜 并排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* 历史比赛入口 */}
        <Card to="/history" icon={<Icon name="clipboard" className="w-5 h-5" />} title="近期比赛">
          <div className="space-y-3">
            {recentTournaments.slice(0, 3).map(t => {
              const monthMatch = t.name.match(/(\d+)月/)
              const monthLabel = monthMatch ? `${monthMatch[1]}月` : t.name
              const imageUrl = getCourseImage(t.courseName)
              const game = games.find(g => g.tournamentId === t.id)
              const participantCount = game?.scores.length ?? 0
              const participantAvatars = game?.scores.slice(0, 3).map(s => {
                const member = getMemberById(s.memberId)
                return member?.avatar
              }).filter(Boolean) ?? []
              return (
                <div key={t.id} className="group">
                  {/* 球场头图 */}
                  <div className="h-16 sm:h-20 rounded-xl overflow-hidden mb-2 relative">
                    <img
                      src={imageUrl}
                      alt={t.courseName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=200&fit=crop&q=80&auto=format'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-1.5 left-2.5 text-white">
                      <span className="text-xs font-medium truncate max-w-[140px] block drop-shadow-sm">{t.courseName}</span>
                    </div>
                    {/* 参赛人数 badge */}
                    <div className="absolute top-1.5 right-2 rounded-full px-2 py-0.5 text-white text-[10px] sm:text-xs font-medium" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
                      <Icon name="people" className="w-3.5 h-3.5 inline-block align-[-0.1em]" /> {participantCount}人
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-gray-800">{monthLabel}</div>
                      {/* 参赛会员头像 */}
                      {participantAvatars.length > 0 && (
                        <div className="flex -space-x-1.5">
                          {participantAvatars.slice(0, 2).map((avatar, idx) => (
                            <img
                              key={idx}
                              src={avatar}
                              alt=""
                              className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border-2 border-white bg-gray-100 shadow-sm"
                            />
                          ))}
                          {participantCount > 2 && (
                            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-golf-700 font-medium shadow-sm" style={{ background: '#f0f3ec' }}>
                              +{participantCount - 2}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] sm:text-xs text-gray-400">{t.date}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">S {t.slope} / R {t.rating}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs text-golf-600 font-semibold group-hover:gap-2 transition-all">
            查看全部比赛 <span className="text-sm">→</span>
          </div>
        </Card>

        {/* 进步排行榜入口 */}
        <Card to="/ranking" icon={<Icon name="trophy" className="w-5 h-5" />} title="进步排行" accent="bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
          <div className="space-y-1.5 sm:space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {progressRanking.map(r => {
              const crownConfigs = [
                { body: '#FBBF24', bodyStroke: '#D97706', jewel: '#DC2626', jewelStroke: '#B91C1C', band: '#F59E0B', bandStroke: '#B45309', numColor: '#78350F', glow: 'drop-shadow(0 1px 3px rgba(251,191,36,0.5))' },
                { body: '#CBD5E1', bodyStroke: '#94A3B8', jewel: '#60A5FA', jewelStroke: '#3B82F6', band: '#94A3B8', bandStroke: '#64748B', numColor: '#334155', glow: 'drop-shadow(0 1px 2px rgba(148,163,184,0.45))' },
                { body: '#F97316', bodyStroke: '#C2410C', jewel: '#FDE68A', jewelStroke: '#F59E0B', band: '#EA580C', bandStroke: '#9A3412', numColor: '#431407', glow: 'drop-shadow(0 1px 2px rgba(249,115,22,0.4))' },
              ];
              const isTop3 = r.rank >= 1 && r.rank <= 3;
              const crown = isTop3 ? crownConfigs[r.rank - 1] : null;

              return (
              <div key={r.member.id} className="flex items-center gap-2 sm:gap-3 py-1 rounded-xl px-1 hover:bg-golf-50/50 transition-colors">
                <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                  r.rank === 1 ? 'text-white shadow-sm' :
                  r.rank === 2 ? 'text-white shadow-sm' :
                  r.rank === 3 ? 'text-white shadow-sm' :
                  'bg-gray-100 text-gray-500'
                }`} style={
                  r.rank === 1 ? { background: 'linear-gradient(135deg, #facc15, #eab308)' } :
                  r.rank === 2 ? { background: 'linear-gradient(135deg, #9ca3af, #6b7280)' } :
                  r.rank === 3 ? { background: 'linear-gradient(135deg, #d97706, #b45309)' } :
                  undefined
                }>{r.rank}</span>
                {/* 头像 + 前三名皇冠 */}
                <div className={`relative flex-shrink-0 ${isTop3 ? 'mt-1.5' : ''}`}>
                  {isTop3 && crown && (
                    <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 z-10" style={{ filter: crown.glow }}>
                      <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 sm:w-6 sm:h-4.5">
                        <path d="M5 28L9 12L17 20L24 8L31 20L39 12L43 28H5Z" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1.5" strokeLinejoin="round"/>
                        <circle cx="9" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                        <circle cx="24" cy="6" r="3.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="1"/>
                        <circle cx="39" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                        <rect x="5" y="26" width="38" height="9" rx="2" fill={crown.band} stroke={crown.bandStroke} strokeWidth="1"/>
                        <text x="24" y="33.5" textAnchor="middle" fill={crown.numColor} fontSize="8.5" fontWeight="800" fontFamily="'SF Pro Display', system-ui, -apple-system, sans-serif">{r.rank}</text>
                        {r.rank === 1 && <>
                          <circle cx="13" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                          <circle cx="35" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                        </>}
                      </svg>
                    </div>
                  )}
                  <img src={r.member.avatar} alt="" className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 shadow-sm ${isTop3 ? 'ring-2 ring-offset-1 ' + (r.rank === 1 ? 'ring-amber-300/80' : r.rank === 2 ? 'ring-slate-300/70' : 'ring-orange-400/60') : ''}`} />
                </div>
                <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate flex items-center gap-1">{r.member.name}{birdKingMap.has(r.member.id) && <BirdKingBadge rank={birdKingMap.get(r.member.id)!} />}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  r.latestProgress >= 0 
                    ? 'text-golf-700 bg-golf-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {r.latestProgress >= 0 ? '+' : ''}{r.latestProgress.toFixed(1)}
                </span>
              </div>
              );
            })}
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs text-golf-600 font-semibold">
            查看完整排行 <span className="text-sm">→</span>
          </div>
        </Card>
      </div>

      {/* 百鸟记录入口 */}
      <Card to="/birdie" icon={<Icon name="bird" className="w-5 h-5" />} title="百鸟记录" accent="bg-gradient-to-r from-sky-50/50 to-blue-50/50">
        <div className="space-y-3">
          {/* 百鸟进度 */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-600">百鸟进度</span>
            <span className="text-base sm:text-lg font-bold text-golf-700">{birdieRecords.length} <span className="text-gray-400 font-normal text-sm">/ 100</span></span>
          </div>
          <div className="w-full rounded-full h-2.5 mb-3 sm:mb-4 overflow-hidden" style={{ background: 'rgba(221, 228, 213, 0.6)' }}>
            <div 
              className="h-2.5 rounded-full transition-all duration-700"
              style={{ 
                width: `${Math.min((birdieRecords.length / 100) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #4e7e3a, #8cc63f)',
                boxShadow: '0 0 8px rgba(140, 198, 63, 0.4)',
              }}
            />
          </div>
          {/* 最近打鸟记录 */}
          {recentBirdies.length === 0 ? (
            <div className="text-center py-4 text-gray-400 text-sm">暂无打鸟记录</div>
          ) : (
            <div className="space-y-2">
              {recentBirdies.map(record => {
                const member = members.find(m => m.id === record.memberId)
                return (
                  <div key={record.id} className="flex items-center gap-2.5 sm:gap-3 py-1 px-1 rounded-xl hover:bg-golf-50/50 transition-colors">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #dde4d5, #b8ccaa)', color: '#2e4f24' }}>
                      {record.number}
                    </span>
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
                    )}
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate flex items-center gap-1">{member?.name || '未知'}{member && birdKingMap.has(member.id) && <BirdKingBadge rank={birdKingMap.get(member.id)!} />}</span>
                    {record.location && record.location !== '-' && (
                      <span className="text-[10px] sm:text-xs text-gray-400 px-2 py-0.5 rounded-full truncate max-w-[80px] sm:max-w-[100px]" style={{ background: 'rgba(221, 228, 213, 0.4)' }}>
                        {record.location}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs text-golf-600 font-semibold">
          查看全部百鸟记录 <span className="text-sm">→</span>
        </div>
      </Card>
    </div>
  )
}
