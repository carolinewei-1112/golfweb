import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee, getCourseImage, type Tournament } from '../data'

type Tab = 'gross' | 'putt'

// 获取球场头图URL
function getCourseImageUrl(tournament: Tournament): string {
  return getCourseImage(tournament.courseName)
}

// 判断是否记录推杆数（2026年4月及以后的比赛才记录推杆，3月及以前不记录）
function hasPuttData(date: string): boolean {
  return date >= '2026-04-01'
}

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    tournaments, games, getMemberById,
    getGrossRanking, getPuttRanking,
    getMemberGames,
  } = useStore()

  const tournament = tournaments.find(t => t.id === id)
  if (!tournament || !id) return <div className="text-center py-20 text-gray-400">未找到该比赛</div>

  const game = games.find(g => g.tournamentId === id)
  const [tab, setTab] = useState<Tab>('gross')

  const grossRanking = getGrossRanking(id)
  const puttRanking = getPuttRanking(id)

  const showPuttTab = hasPuttData(tournament.date)

  const currentData = tab === 'putt' ? puttRanking : grossRanking

  // 提取月份
  const monthMatch = tournament.name.match(/(\d+)月/)
  const monthLabel = monthMatch ? `${monthMatch[1]}月` : tournament.name

  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/history" className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-golf-600">
          ← 返回历史比赛
        </Link>
      </div>

      <div className="space-y-4 sm:space-y-6">
      {/* Game Info with Course Image */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 球场头图 */}
        <div className="h-36 sm:h-48 overflow-hidden relative">
          <img
            src={getCourseImageUrl(tournament)}
            alt={tournament.courseName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=400&fit=crop&q=80&auto=format'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 text-white">
            <h1 className="text-lg sm:text-2xl font-bold">{monthLabel}</h1>
            <p className="text-white/90 mt-0.5 sm:mt-1 text-sm sm:text-base">{tournament.courseName}</p>
          </div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-xs sm:text-sm text-white">
              {tournament.date}
            </span>
          </div>

          {/* 比赛照片展示 - 放在banner右下角 */}
          {game?.photos && game.photos.length > 0 && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1">
              {game.photos.slice(0, 4).map((photo, index) => (
                <div
                  key={index}
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg overflow-hidden border-2 border-white/50 shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => window.open(photo, '_blank')}
                  style={{ marginLeft: index > 0 ? '-8px' : '0', zIndex: (game.photos?.length ?? 0) - index }}
                >
                  <img
                    src={photo}
                    alt={`比赛照片${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {game.photos.length > 4 && (
                <div
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-black/60 border-2 border-white/50 shadow-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
                  style={{ marginLeft: '-8px', zIndex: 0 }}
                >
                  +{game.photos.length - 4}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-5">
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 text-xs sm:text-sm text-gray-500">
            <span>👥 {game?.scores.length ?? 0} 人参赛</span>
            <span>Slope {tournament.slope}</span>
            <span>Rating {tournament.rating}</span>
          </div>
        </div>
      </div>

      {/* 推杆排名Tab - 仅当有推杆数据时显示 */}
      {showPuttTab && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setTab('gross')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              tab === 'gross'
                ? 'bg-golf-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">🏆</span>杆数排名
          </button>
          <button
            onClick={() => setTab('putt')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              tab === 'putt'
                ? 'bg-golf-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-1">⛳</span>推杆排名
          </button>
        </div>
      )}

      {/* Ranking Table */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {currentData.length === 0 && (
          <div className="px-4 sm:px-5 py-8 sm:py-10 text-center text-gray-400 text-sm">暂无数据</div>
        )}
        {/* 表头 */}
        {tab !== 'putt' && (
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 bg-gray-50 text-xs text-gray-500 border-b border-gray-100">
            <span className="w-6 sm:w-7 text-center">排名</span>
            <span className="flex-1 ml-8 sm:ml-11">球员</span>
            <span className="text-right w-12 sm:w-16">杆数</span>
          </div>
        )}
        <div className="divide-y divide-gray-50">
          {currentData.map((item: any) => (
            <Link
              key={item.member.id}
              to={`/member/${item.member.id}`}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 hover:bg-golf-50 transition-colors"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                item.rank === 1 ? 'bg-gold-400 text-white' :
                item.rank === 2 ? 'bg-gray-300 text-gray-700' :
                item.rank === 3 ? 'bg-amber-600 text-white' :
                'bg-gray-100 text-gray-500'
              }`}>{item.rank}</span>
              <img src={item.member.avatar} alt="" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">{item.member.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-400">{getMemberTee(item.member, getMemberGames(item.member.id).length)}</div>
              </div>
              {tab === 'putt' ? (
                <span className="text-xs sm:text-sm font-bold text-gray-900">{item.putts} 推</span>
              ) : (
                <span className="text-xs sm:text-sm font-bold text-gray-900">{item.grossScore} 杆</span>
              )}
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
