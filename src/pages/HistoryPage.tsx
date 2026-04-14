import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getCourseImage, type Tournament } from '../data'

// 获取球场头图URL
function getCourseImageUrl(tournament: Tournament): string {
  return getCourseImage(tournament.courseName)
}

export default function HistoryPage() {
  const { tournaments, games, getMemberById } = useStore()
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // 提取所有年份并去重排序（从近到远）
  const years = [...new Set(tournaments.map(t => t.date.substring(0, 4)))].sort((a, b) => b.localeCompare(a))

  // 根据选中年份筛选比赛
  const filteredTournaments = selectedYear === 'all'
    ? [...tournaments]
    : tournaments.filter(t => t.date.startsWith(selectedYear))

  const sortedTournaments = filteredTournaments.sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 渐变Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(135deg, #145730 0%, #166e3a 30%, #1a8a47 60%, #22a85a 100%)',
        boxShadow: '0 4px 20px rgba(22, 110, 58, 0.2)',
      }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(75, 198, 135, 0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)' }} />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-xl sm:text-2xl">📋</span> 历史比赛
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1.5">共 {tournaments.length} 场比赛 · 按时间从近到远</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(4px)' }}>
            <span className="text-white/90 font-medium">{sortedTournaments.length}</span>
            <span className="text-white/60">场</span>
          </div>
        </div>
      </div>

      {/* 年份筛选 Tab - 精致胶囊 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            selectedYear === 'all'
              ? 'text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
          }`}
          style={selectedYear === 'all' ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
        >
          全部
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedYear === year
                ? 'text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
            }`}
            style={selectedYear === year ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
          >
            {year}年
          </button>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-5">
        {sortedTournaments.map(t => {
          const game = games.find(g => g.tournamentId === t.id)
          const participantCount = game?.scores.length ?? 0
          const participantAvatars = game?.scores.slice(0, 5).map(s => {
            const member = getMemberById(s.memberId)
            return member?.avatar
          }).filter(Boolean) ?? []
          const bestScore = game && game.scores.length > 0
            ? Math.min(...game.scores.map(s => s.grossScore))
            : null
          // 提取月份
          const monthMatch = t.name.match(/(\d+)月/)
          const monthLabel = monthMatch ? `${monthMatch[1]}月` : t.name

          return (
            <Link
              key={t.id}
              to={`/game/${t.id}`}
              className="block rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 card-shadow hover:card-shadow-hover group"
              style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}
            >
              {/* 球场头图 */}
              <div className="h-28 sm:h-36 overflow-hidden relative">
                <img
                  src={getCourseImageUrl(t)}
                  alt={t.courseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=300&fit=crop&q=80&auto=format'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 text-white">
                  <h3 className="text-lg sm:text-xl font-bold drop-shadow-lg">{monthLabel}</h3>
                  <p className="text-xs sm:text-sm text-white/85 truncate max-w-[220px] drop-shadow-sm">{t.courseName}</p>
                </div>
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="px-2.5 py-1.5 rounded-xl text-[10px] sm:text-xs text-white font-medium" style={{ background: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(8px)' }}>
                    {t.date}
                  </span>
                </div>
                {/* 参赛人数 badge */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-white text-[10px] sm:text-xs flex items-center gap-1 font-medium" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
                  <span>👥</span>
                  <span>{participantCount}人</span>
                </div>
              </div>
              <div className="p-3.5 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
                    {bestScore != null && (
                      <div className="bg-golf-50 px-2.5 py-1 rounded-full">
                        <span className="text-gray-400">最佳</span>
                        <span className="ml-1 font-bold text-golf-700">{bestScore} 杆</span>
                      </div>
                    )}
                    <div className="bg-gray-50 px-2.5 py-1 rounded-full">
                      <span className="text-gray-400">难度</span>
                      <span className="ml-1 text-gray-600 font-medium">S {t.slope}</span>
                    </div>
                  </div>
                  {/* 参赛会员头像 */}
                  {participantAvatars.length > 0 && (
                    <div className="flex -space-x-1.5 sm:-space-x-2 flex-shrink-0">
                      {participantAvatars.slice(0, 3).map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar}
                          alt=""
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white bg-gray-100 shadow-sm"
                        />
                      ))}
                      {participantCount > 3 && (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-golf-50 border-2 border-white flex items-center justify-center text-[10px] sm:text-xs text-golf-700 font-medium shadow-sm">
                          +{participantCount - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
