import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getCourseImage, type Tournament } from '../data'
import { Icon } from '../components/Icons'

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
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8ccaa 0%, #8cb57a 40%, #4a7a38 80%, #3d6630 100%)',
        boxShadow: '0 4px 24px rgba(46, 79, 36, 0.15)',
      }}>
        <div className="absolute top-3 left-[12%] animate-drift">
          <div className="w-14 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.25)' }} />
        </div>
        <div className="absolute top-6 right-[10%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.2)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(61, 102, 48, 0.2)" />
          </svg>
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2 text-white drop-shadow-md">
              <span className="text-xl sm:text-2xl"><Icon name="clipboard" className="w-6 h-6" /></span> 历史比赛
            </h1>
            <p className="text-xs sm:text-sm mt-1.5 text-white/85 drop-shadow-sm">共 {tournaments.length} 场比赛 · 按时间从近到远</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm" style={{ background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <span><Icon name="golfball" className="w-3.5 h-3.5 text-white" /></span>
            <span className="text-white font-semibold">{sortedTournaments.length}</span>
            <span className="text-white/75">场赛</span>
          </div>
        </div>
      </div>

      {/* 年份筛选 Tab */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            selectedYear === 'all'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={selectedYear === 'all' ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
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
                : 'text-gray-600 hover:bg-white/80 card-shadow'
            }`}
            style={selectedYear === year ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            {year}年
          </button>
        ))}
      </div>

      <div className="space-y-4 sm:space-y-5">
        {sortedTournaments.map(t => {
          const game = games.find(g => g.tournamentId === t.id)
          const participantCount = game?.scores.length ?? 0
          // 按总杆排名取top3头像
          const participantAvatars = game?.scores
            .slice().sort((a, b) => a.grossScore - b.grossScore)
            .slice(0, 3).map(s => {
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
              style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
            >
              {/* 球场头图 - 所有信息都在图片上 */}
              <div className="h-36 sm:h-44 overflow-hidden relative">
                <img
                  src={getCourseImageUrl(t)}
                  alt={t.courseName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=300&fit=crop&q=80&auto=format'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                {/* 右上：日期 */}
                <div className="absolute top-2 right-2.5 rounded-full px-2.5 py-1 text-white text-[10px] sm:text-xs font-medium" style={{ background: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(4px)' }}>
                  {t.date}
                </div>
                {/* 左下：月份 + 球场名 */}
                <div className="absolute bottom-2.5 left-3 text-white">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-bold drop-shadow-md">{monthLabel}</span>
                    <span className="text-xs sm:text-sm text-white/85 drop-shadow-sm">{t.courseName}</span>
                  </div>
                  {/* 最佳 + 难度标签 */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    {bestScore != null && (
                      <span className="inline-flex items-center text-[10px] sm:text-xs text-white/90 font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                        最佳 <span className="ml-0.5 font-bold">{bestScore}杆</span>
                      </span>
                    )}
                    <span className="inline-flex items-center text-[10px] sm:text-xs text-white/90 font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                      难度 <span className="ml-0.5 font-bold">S{t.slope}</span>
                    </span>
                  </div>
                </div>
                {/* 右下：头像 + 等X人参赛 */}
                <div className="absolute bottom-2.5 right-2.5 flex items-center">
                  {participantAvatars.slice(0, 2).map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt=""
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] border-white/70 bg-gray-100 shadow-sm -ml-1 first:ml-0"
                    />
                  ))}
                  <span className="text-[10px] sm:text-xs text-white/80 font-medium ml-1.5 drop-shadow-sm">等{participantCount}人参赛</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
