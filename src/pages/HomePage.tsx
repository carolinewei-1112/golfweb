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
      style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div className={`px-4 sm:px-5 py-3.5 ${accent || 'bg-gradient-to-r from-golf-50/80 to-emerald-50/80'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(22, 168, 90, 0.1)' }}>
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
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}>
      <span>{icon}</span>
      <span className="text-white/90 font-medium">{value}</span>
      <span className="text-white/65">{label}</span>
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
      {/* Hero Banner + 公告 */}
      <div className="rounded-3xl overflow-hidden relative" style={{
        background: 'linear-gradient(135deg, #145730 0%, #166e3a 30%, #1a8a47 60%, #22a85a 100%)',
        boxShadow: '0 4px 20px rgba(22, 110, 58, 0.2), 0 1px 4px rgba(0, 0, 0, 0.06)',
      }}>
        {/* 装饰性背景图案 */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {/* 装饰性光圈 */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(75, 198, 135, 0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)' }} />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/logos/logo.png" alt="百鸟会" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 p-1 shadow-lg" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white/50" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">百鸟会</h1>
                <p className="text-xs text-white/60 mt-0.5">高尔夫成绩管理</p>
              </div>
            </div>
            {/* 统计信息 - 胶囊徽章 */}
            <div className="flex flex-wrap gap-2">
              <StatBadge icon="🏌️" value={tournaments.length} label="场比赛" />
              <StatBadge icon="👤" value={members.length} label="位会员" />
              <StatBadge icon="🐦" value={`${100 - birdieRecords.length}`} label="只待打" />
            </div>
          </div>

          {/* 公告区域 */}
          <div className="mt-4 sm:mt-5 pt-4 border-t border-white/15">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: 'rgba(250, 204, 21, 0.2)' }}>
                  📢
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {announcements.slice(0, 2).map(a => (
                  <div key={a.id} className="rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white/90 break-words leading-relaxed" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }}>
                    {a.content}
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white/90 break-words leading-relaxed" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }}>
                    4月月赛时间4月18日，请各位会员预留时间。
                  </div>
                )}
                {announcements.length > 2 && (
                  <div className="text-xs text-white/50 text-right mt-1.5">还有 {announcements.length - 2} 条公告</div>
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
                            <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full bg-golf-50 border-2 border-white flex items-center justify-center text-[10px] text-golf-700 font-medium shadow-sm">
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
        <Card to="/ranking" icon="🏆" title="进步排行" accent="bg-gradient-to-r from-amber-50/80 to-yellow-50/80">
          <div className="space-y-1.5 sm:space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {progressRanking.map(r => (
              <div key={r.member.id} className="flex items-center gap-2 sm:gap-3 py-1 rounded-xl px-1 hover:bg-gray-50/80 transition-colors">
                <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                  r.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                  r.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                  r.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                  'bg-gray-100 text-gray-500'
                }`}>{r.rank}</span>
                <img src={r.member.avatar} alt="" className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
                <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{r.member.name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  r.latestProgress >= 0 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-red-600 bg-red-50'
                }`}>
                  {r.latestProgress >= 0 ? '+' : ''}{r.latestProgress.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 sm:mt-4 flex items-center gap-1 text-xs text-golf-600 font-semibold">
            查看完整排行 <span className="text-sm">→</span>
          </div>
        </Card>
      </div>

      {/* 百鸟记录入口 */}
      <Card to="/birdie" icon="🐦" title="百鸟记录" accent="bg-gradient-to-r from-sky-50/80 to-blue-50/80">
        <div className="space-y-3">
          {/* 百鸟进度 */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-600">百鸟进度</span>
            <span className="text-base sm:text-lg font-bold text-golf-700">{birdieRecords.length} <span className="text-gray-400 font-normal text-sm">/ 100</span></span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 sm:mb-4 overflow-hidden">
            <div 
              className="h-2.5 rounded-full transition-all duration-700"
              style={{ 
                width: `${Math.min((birdieRecords.length / 100) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #22a85a, #4bc687)',
                boxShadow: '0 0 8px rgba(75, 198, 135, 0.4)',
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
                  <div key={record.id} className="flex items-center gap-2.5 sm:gap-3 py-1 px-1 rounded-xl hover:bg-gray-50/80 transition-colors">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-golf-100 to-golf-200 text-golf-700 flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 shadow-sm">
                      {record.number}
                    </span>
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
                    )}
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{member?.name || '未知'}</span>
                    {record.location && record.location !== '-' && (
                      <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full truncate max-w-[80px] sm:max-w-[100px]">
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
