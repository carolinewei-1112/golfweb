import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getCourseImage } from '../data'
import type { ReactNode } from 'react'

function Card({ to, icon, title, children, accent }: {
  to: string; icon: string; title: string; children: ReactNode; accent?: string
}) {
  return (
    <Link
      to={to}
      className="block rounded-2xl overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 card-shadow hover:card-shadow-hover"
      style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
    >
      <div className={`px-4 sm:px-5 py-3.5 ${accent || ''}`} style={!accent ? { background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.5) 0%, rgba(238, 248, 242, 0.5) 100%)' } : undefined}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>
            {icon}
          </div>
          <h2 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h2>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-3.5 sm:py-4">{children}</div>
    </Link>
  )
}

function StatBadge({ label, value, icon }: { label: string; value: string | number; icon: string }) {
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

  return (
    <div className="space-y-5 sm:space-y-7 animate-fade-in">
      {/* Hero Banner - 扁平插画风 */}
      <div className="rounded-3xl overflow-hidden relative" style={{
        background: 'linear-gradient(180deg, #1a7a4a 0%, #1d8f4e 25%, #2a9e5c 50%, #35a862 70%, #2a8c4e 100%)',
        boxShadow: '0 4px 24px rgba(19, 92, 51, 0.2), 0 1px 4px rgba(0, 0, 0, 0.06)',
      }}>
        {/* 天空装饰 - 云朵 */}
        <div className="absolute top-4 left-[8%] animate-drift" style={{ animationDelay: '0s' }}>
          <div className="flex gap-0.5">
            <div className="w-14 h-5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.12)' }} />
            <div className="w-8 h-4 rounded-full mt-1" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
          </div>
        </div>
        <div className="absolute top-8 right-[12%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="flex gap-0.5">
            <div className="w-10 h-4 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
            <div className="w-6 h-3 rounded-full mt-0.5" style={{ background: 'rgba(255, 255, 255, 0.07)' }} />
          </div>
        </div>
        <div className="absolute top-3 right-[40%] animate-drift" style={{ animationDelay: '4s' }}>
          <div className="w-12 h-4 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
        </div>

        {/* 远景山丘装饰 */}
        <div className="absolute bottom-0 inset-x-0 h-20 overflow-hidden">
          <svg viewBox="0 0 800 80" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 50 Q100 20 200 35 Q350 55 500 30 Q650 10 800 40 L800 80 L0 80 Z" fill="rgba(15, 72, 40, 0.25)" />
            <path d="M0 60 Q200 30 400 50 Q600 70 800 45 L800 80 L0 80 Z" fill="rgba(15, 72, 40, 0.15)" />
          </svg>
        </div>

        <div className="relative p-5 sm:p-7 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/logos/logo.png" alt="百鸟会" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 p-1 shadow-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white/50" style={{ background: '#3bb873' }} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md">百鸟会</h1>
                <p className="text-xs mt-0.5 px-2 py-0.5 rounded-md inline-block font-medium" style={{ background: 'rgba(253, 246, 227, 0.85)', color: '#135c33' }}>GOLF TIME ⛳</p>
              </div>
            </div>
            {/* 统计信息 - 奶油色胶囊 */}
            <div className="flex flex-wrap gap-2">
              <StatBadge icon="🏌️" value={tournaments.length} label="场比赛" />
              <StatBadge icon="👤" value={members.length} label="位会员" />
              <StatBadge icon="🐦" value={`${100 - birdieRecords.length}`} label="只待打" />
            </div>
          </div>

          {/* 公告区域 */}
          <div className="mt-4 sm:mt-5 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}>
            <div className="flex items-stretch gap-2.5 sm:gap-3">
              <div className="flex items-center flex-shrink-0">
                <div className="h-full rounded-xl flex items-center justify-center text-sm sm:text-base px-2.5 sm:px-3" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  📢
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {announcements.slice(0, 2).map(a => (
                  <div key={a.id} className="rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm break-words leading-relaxed font-medium" style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', color: 'rgba(255, 255, 255, 0.95)' }}>
                    {a.content}
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm break-words leading-relaxed font-medium" style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', color: 'rgba(255, 255, 255, 0.95)' }}>
                    4月月赛时间4月18日，请各位会员预留时间。
                  </div>
                )}
                {announcements.length > 2 && (
                  <div className="text-xs text-white/60 text-right mt-1.5">还有 {announcements.length - 2} 条公告</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 近期比赛 和 排行榜 并排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        {/* 历史比赛入口 */}
        <Card to="/history" icon="📋" title="近期比赛">
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
                      👥 {participantCount}人
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
                            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-golf-700 font-medium shadow-sm" style={{ background: '#eef8f2' }}>
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
        <Card to="/ranking" icon="🏆" title="进步排行" accent="bg-gradient-to-r from-amber-50/50 to-yellow-50/50">
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
                <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{r.member.name}</span>
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
      <Card to="/birdie" icon="🐦" title="百鸟记录" accent="bg-gradient-to-r from-sky-50/50 to-blue-50/50">
        <div className="space-y-3">
          {/* 百鸟进度 */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-600">百鸟进度</span>
            <span className="text-base sm:text-lg font-bold text-golf-700">{birdieRecords.length} <span className="text-gray-400 font-normal text-sm">/ 100</span></span>
          </div>
          <div className="w-full rounded-full h-2.5 mb-3 sm:mb-4 overflow-hidden" style={{ background: 'rgba(212, 238, 232, 0.6)' }}>
            <div 
              className="h-2.5 rounded-full transition-all duration-700"
              style={{ 
                width: `${Math.min((birdieRecords.length / 100) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #1d8f4e, #3bb873)',
                boxShadow: '0 0 8px rgba(59, 184, 115, 0.4)',
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
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #d4f0df, #a8e2bf)', color: '#135c33' }}>
                      {record.number}
                    </span>
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
                    )}
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{member?.name || '未知'}</span>
                    {record.location && record.location !== '-' && (
                      <span className="text-[10px] sm:text-xs text-gray-400 px-2 py-0.5 rounded-full truncate max-w-[80px] sm:max-w-[100px]" style={{ background: 'rgba(212, 238, 232, 0.4)' }}>
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
