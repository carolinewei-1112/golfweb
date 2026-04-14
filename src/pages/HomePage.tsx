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
      className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 h-full"
    >
      <div className={`px-4 sm:px-5 py-3 ${accent || 'bg-gradient-to-r from-golf-50 to-emerald-50'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h2 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h2>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-3 sm:py-4">{children}</div>
    </Link>
  )
}

export default function HomePage() {
  const { tournaments, games, overallRanking, progressRanking, getMemberById, announcements, members, birdieRecords } = useStore()

  const recentTournaments = [...tournaments]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)

  // 获取最近打鸟记录（按鸟号降序，显示最新的3个）
  const recentBirdies = [...birdieRecords]
    .sort((a, b) => b.number - a.number)
    .slice(0, 3)

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Hero Banner + 公告 */}
      <div className="bg-gradient-to-r from-golf-700 via-golf-600 to-emerald-600 rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex items-center gap-2">
            <img src="https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/logos/logo.png" alt="百鸟会" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white" />
            <h1 className="text-xl sm:text-2xl font-bold">百鸟会</h1>
          </div>
          {/* 统计信息 - 右对齐 */}
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="text-white/80">比赛{tournaments.length}场</span>
            <span className="text-white/80">会员{members.length}位</span>
            <span className="text-white/80">百鸟还差{100 - birdieRecords.length}只</span>
          </div>
        </div>
        {/* 公告区域 - 嵌入在banner内 */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-xs sm:text-sm">📢</span>
              <span className="text-xs sm:text-sm font-medium text-white/90">公告</span>
            </div>
            <div className="flex-1 min-w-0">
              {/* 动态公告 */}
              {announcements.slice(0, 2).map(a => (
                <div key={a.id} className="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white/90 break-words">
                  {a.content}
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white/90 break-words">
                  暂无公告
                </div>
              )}
              {announcements.length > 2 && (
                <div className="text-xs text-white/60 text-right mt-1">还有 {announcements.length - 2} 条公告</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 近期比赛 和 排行榜 并排 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* 历史比赛入口 */}
        <Card to="/history" icon="📋" title="近期比赛">
          <div className="space-y-3">
            {recentTournaments.slice(0, 3).map(t => {
              // 提取月份数字，将"3月月例赛"转为"3月"
              const monthMatch = t.name.match(/(\d+)月/)
              const monthLabel = monthMatch ? `${monthMatch[1]}月` : t.name
              // 使用PIC2文件夹中的本地球场图片
              const imageUrl = getCourseImage(t.courseName)
              // 获取该比赛的参赛数据
              const game = games.find(g => g.tournamentId === t.id)
              const participantCount = game?.scores.length ?? 0
              const participantAvatars = game?.scores.slice(0, 3).map(s => {
                const member = getMemberById(s.memberId)
                return member?.avatar
              }).filter(Boolean) ?? []
              return (
                <div key={t.id} className="group">
                  {/* 球场头图 */}
                  <div className="h-14 sm:h-16 rounded-lg overflow-hidden mb-2 relative">
                    <img
                      src={imageUrl}
                      alt={t.courseName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=200&fit=crop&q=80&auto=format'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-2 text-white">
                      <span className="text-xs font-medium truncate max-w-[120px] block">{t.courseName}</span>
                    </div>
                    {/* 参赛人数 badge */}
                    <div className="absolute top-1 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs">
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
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white bg-gray-100"
                            />
                          ))}
                          {participantCount > 2 && (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[10px] text-gray-500">
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
          <div className="mt-2 sm:mt-3 text-xs text-golf-600 font-medium">查看全部比赛 →</div>
        </Card>

        {/* 进步排行榜入口 - 显示全部 */}
        <Card to="/ranking" icon="🏆" title="进步排行" accent="bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="space-y-1.5 sm:space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {progressRanking.map(r => (
              <div key={r.member.id} className="flex items-center gap-2 sm:gap-3 py-0.5">
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                  r.rank === 1 ? 'bg-gold-400 text-white' :
                  r.rank === 2 ? 'bg-gray-300 text-gray-700' :
                  r.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-gray-100 text-gray-500'
                }`}>{r.rank}</span>
                <img src={r.member.avatar} alt="" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 flex-shrink-0" />
                <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{r.member.name}</span>
                <span className={`text-xs font-bold ${r.latestProgress >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {r.latestProgress >= 0 ? '+' : ''}{r.latestProgress.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 sm:mt-3 text-xs text-golf-600 font-medium">查看完整排行 →</div>
        </Card>
      </div>

      {/* 百鸟记录入口 */}
      <Card to="/birdie" icon="🐦" title="百鸟记录" accent="bg-gradient-to-r from-sky-50 to-blue-50">
        <div className="space-y-3">
          {/* 百鸟进度 */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-600">百鸟进度</span>
            <span className="text-base sm:text-lg font-bold text-golf-700">{birdieRecords.length} / 100</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-3 sm:mb-4">
            <div 
              className="bg-gradient-to-r from-golf-500 to-golf-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((birdieRecords.length / 100) * 100, 100)}%` }}
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
                  <div key={record.id} className="flex items-center gap-2 sm:gap-3">
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">
                      {record.number}
                    </span>
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 flex-shrink-0" />
                    )}
                    <span className="flex-1 text-xs sm:text-sm font-medium text-gray-700 truncate">{member?.name || '未知'}</span>
                    {record.location && record.location !== '-' && (
                      <span className="text-[10px] sm:text-xs text-gray-400 truncate max-w-[60px] sm:max-w-[80px]">
                        {record.location}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        <div className="mt-2 sm:mt-3 text-xs text-golf-600 font-medium">查看全部百鸟记录 →</div>
      </Card>
    </div>
  )
}
