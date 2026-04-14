import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import type { Tournament } from '../data'

// 获取球场头图URL - 使用PIC2文件夹中的本地图片
function getCourseImageUrl(tournament: Tournament): string {
  return `/PIC2/${tournament.courseName}.png`
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
    <div className="animate-fade-in">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">📋 历史比赛</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">按比赛时间从近到远排序</p>
      </div>

      {/* 年份筛选 Tab */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
            selectedYear === 'all'
              ? 'bg-golf-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              selectedYear === year
                ? 'bg-golf-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {year}年
          </button>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
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
              className="block bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group"
            >
              {/* 球场头图 */}
              <div className="h-24 sm:h-32 overflow-hidden relative">
                <img
                  src={getCourseImageUrl(t)}
                  alt={t.courseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=300&fit=crop&q=80&auto=format'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-5 text-white">
                  <h3 className="text-base sm:text-lg font-bold">{monthLabel}</h3>
                  <p className="text-xs sm:text-sm text-white/80 truncate max-w-[200px]">{t.courseName}</p>
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded-lg text-[10px] sm:text-xs text-white">
                    {t.date}
                  </span>
                </div>
                {/* 参赛人数 badge */}
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-white text-[10px] sm:text-xs flex items-center gap-1">
                  <span>👥</span>
                  <span>{participantCount}人</span>
                </div>
              </div>
              <div className="p-3 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                    {bestScore != null && (
                      <div>
                        <span className="text-gray-400">最佳</span>
                        <span className="ml-1 font-bold text-golf-700">{bestScore} 杆</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">难度</span>
                      <span className="ml-1 text-gray-600">S {t.slope}</span>
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
                          className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-gray-100"
                        />
                      ))}
                      {participantCount > 3 && (
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] sm:text-xs text-gray-500">
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
