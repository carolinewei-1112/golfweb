import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee, getCourseImage, type Tournament } from '../data'

type Tab = 'gross' | 'putt'
type SortBy = 'gross' | 'progress'

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
    getProgressStar,
    getProgressScore, getMemberGames,
  } = useStore()

  const tournament = tournaments.find(t => t.id === id)
  if (!tournament || !id) return <div className="text-center py-20 text-gray-400">未找到该比赛</div>

  const game = games.find(g => g.tournamentId === id)
  const [tab, setTab] = useState<Tab>('gross')
  const [sortBy, setSortBy] = useState<SortBy>('gross')

  const grossRanking = getGrossRanking(id)
  const puttRanking = getPuttRanking(id)
  const progressStar = getProgressStar(id)

  // 获取完整数据（包含杆数和进步系数）
  const fullRanking = (game?.scores ?? [])
    .map(s => {
      const member = getMemberById(s.memberId)!
      const progress = getProgressScore(s.memberId, id)
      return { member, score: s, progress, grossScore: s.grossScore }
    })
    .filter(r => r.member)
    .sort((a, b) => {
      if (sortBy === 'gross') {
        return a.grossScore - b.grossScore
      } else {
        return (b.progress ?? -999) - (a.progress ?? -999)
      }
    })
    .map((r, i) => ({ ...r, rank: i + 1 }))

  const showPuttTab = hasPuttData(tournament.date)

  const currentData = tab === 'putt' ? puttRanking : fullRanking

  // 提取月份
  const monthMatch = tournament.name.match(/(\d+)月/)
  const monthLabel = monthMatch ? `${monthMatch[1]}月` : tournament.name

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      <div className="flex items-center justify-between">
        <Link to="/history" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-golf-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-golf-50">
          ← 返回历史比赛
        </Link>
      </div>

      <div className="space-y-5 sm:space-y-7">
      {/* Game Info with Course Image */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        {/* 球场头图 */}
        <div className="h-40 sm:h-52 overflow-hidden relative">
          <img
            src={getCourseImageUrl(tournament)}
            alt={tournament.courseName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&h=400&fit=crop&q=80&auto=format'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 text-white">
            <h1 className="text-xl sm:text-3xl font-bold drop-shadow-lg">{monthLabel}</h1>
            <p className="text-white/90 mt-1 sm:mt-1.5 text-sm sm:text-base drop-shadow-sm">{tournament.courseName}</p>
          </div>
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-white font-medium" style={{ background: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(8px)' }}>
              {tournament.date}
            </span>
          </div>

          {/* 比赛照片展示 */}
          {game?.photos && game.photos.length > 0 && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1">
              {game.photos.slice(0, 4).map((photo, index) => (
                <div
                  key={index}
                  className="w-9 h-9 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg cursor-pointer hover:scale-110 transition-transform"
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
                  className="w-9 h-9 sm:w-13 sm:h-13 rounded-xl border-2 border-white/50 shadow-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
                  style={{ marginLeft: '-8px', zIndex: 0, background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
                >
                  +{game.photos.length - 4}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              👥 {game?.scores.length ?? 0} 人参赛
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              Slope {tournament.slope}
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              Rating {tournament.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Stars */}
      {progressStar && (
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 card-shadow" style={{
          background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.5) 0%, rgba(238, 248, 242, 0.6) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 226, 191, 0.3)',
        }}>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-golf-700 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>🐎</div>
            进步之星
          </div>
          <Link to={`/member/${progressStar.member.id}`} className="flex items-center gap-3 sm:gap-4 p-2 rounded-xl hover:bg-white/60 transition-colors">
            <img src={progressStar.member.avatar} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 shadow-sm" />
            <div>
              <div className="text-sm sm:text-base font-bold text-gray-800">{progressStar.member.name}</div>
              <div className="text-[10px] sm:text-xs text-gray-400">{getMemberTee(progressStar.member, getMemberGames(progressStar.member.id).length)}</div>
              <div className="text-[10px] sm:text-xs text-golf-600 font-semibold mt-0.5">
                进步系数 <span className="text-golf-500">↑{progressStar.progress}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* 推杆排名Tab - 仅当有推杆数据时显示切换 */}
      {showPuttTab && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setTab('gross')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === 'gross'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:bg-white/80 card-shadow'
            }`}
            style={tab === 'gross' ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <span className="mr-1.5">🏆</span>杆数排名
          </button>
          <button
            onClick={() => setTab('putt')}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === 'putt'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:bg-white/80 card-shadow'
            }`}
            style={tab === 'putt' ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <span className="mr-1.5">⛳</span>推杆排名
          </button>
        </div>
      )}

      {/* 排序切换 */}
      {tab !== 'putt' && (
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={() => setSortBy('gross')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              sortBy === 'gross'
                ? 'text-golf-700 shadow-sm'
                : 'text-gray-500 hover:bg-white/80 card-shadow'
            }`}
            style={sortBy === 'gross' ? { background: 'rgba(212, 238, 232, 0.6)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            按杆数
          </button>
          <button
            onClick={() => setSortBy('progress')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              sortBy === 'progress'
                ? 'text-golf-700 shadow-sm'
                : 'text-gray-500 hover:bg-white/80 card-shadow'
            }`}
            style={sortBy === 'progress' ? { background: 'rgba(212, 238, 232, 0.6)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            按进步系数
          </button>
        </div>
      )}

      {/* Ranking Table */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        {currentData.length === 0 && (
          <div className="px-4 sm:px-5 py-10 sm:py-12 text-center text-gray-400 text-sm">暂无数据</div>
        )}
        {/* 表头 - 杆数、进步系数 */}
        {tab !== 'putt' && (
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-gray-50/80 text-xs text-gray-400 border-b border-gray-100 font-medium">
            <span className="w-6 sm:w-7 text-center">排名</span>
            <span className="flex-1 ml-8 sm:ml-11">会员</span>
            <div className="flex text-right gap-2 sm:gap-4">
              <span className="w-12 sm:w-16">杆数</span>
              <span className="w-10 sm:w-12">进步</span>
            </div>
          </div>
        )}
        <div className="divide-y divide-gray-50">
          {currentData.map((item: any) => {
            // 前三名皇冠配置（与排行榜一致）
            const crownConfigs = [
              { // 🥇 金冠
                body: '#FBBF24', bodyStroke: '#D97706',
                jewel: '#DC2626', jewelStroke: '#B91C1C',
                band: '#F59E0B', bandStroke: '#B45309',
                numColor: '#78350F',
                glow: 'drop-shadow(0 1px 4px rgba(251,191,36,0.5))',
              },
              { // 🥈 银冠
                body: '#CBD5E1', bodyStroke: '#94A3B8',
                jewel: '#60A5FA', jewelStroke: '#3B82F6',
                band: '#94A3B8', bandStroke: '#64748B',
                numColor: '#334155',
                glow: 'drop-shadow(0 1px 3px rgba(148,163,184,0.45))',
              },
              { // 🥉 铜冠
                body: '#F97316', bodyStroke: '#C2410C',
                jewel: '#FDE68A', jewelStroke: '#F59E0B',
                band: '#EA580C', bandStroke: '#9A3412',
                numColor: '#431407',
                glow: 'drop-shadow(0 1px 3px rgba(249,115,22,0.4))',
              },
            ];
            const isTop3 = item.rank >= 1 && item.rank <= 3;
            const crown = isTop3 ? crownConfigs[item.rank - 1] : null;

            return (
            <Link
              key={item.member.id}
              to={`/member/${item.member.id}`}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 hover:bg-golf-50/50 transition-colors"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                item.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                item.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                item.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                'bg-gray-100 text-gray-500'
              }`}>{item.rank}</span>
              {/* 头像 + 前三名皇冠 */}
              <div className={`relative flex-shrink-0 ${isTop3 ? 'mt-1.5' : ''}`}>
                {isTop3 && crown && (
                  <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 z-10" style={{ filter: crown.glow }}>
                    <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-5 sm:w-7 sm:h-5">
                      {/* 皇冠主体 */}
                      <path d="M5 28L9 12L17 20L24 8L31 20L39 12L43 28H5Z" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1.5" strokeLinejoin="round"/>
                      {/* 三颗尖顶珠 */}
                      <circle cx="9" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                      <circle cx="24" cy="6" r="3.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="1"/>
                      <circle cx="39" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                      {/* 冠带 + 名次数字 */}
                      <rect x="5" y="26" width="38" height="9" rx="2" fill={crown.band} stroke={crown.bandStroke} strokeWidth="1"/>
                      <text x="24" y="33.5" textAnchor="middle" fill={crown.numColor} fontSize="8.5" fontWeight="800" fontFamily="'SF Pro Display', system-ui, -apple-system, sans-serif">{item.rank}</text>
                      {/* 金冠宝石装饰 */}
                      {item.rank === 1 && <>
                        <circle cx="13" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                        <circle cx="35" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                      </>}
                    </svg>
                  </div>
                )}
                <img src={item.member.avatar} alt="" className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-100 shadow-sm ${isTop3 ? 'ring-2 ring-offset-1 ' + (item.rank === 1 ? 'ring-amber-300/80' : item.rank === 2 ? 'ring-slate-300/70' : 'ring-orange-400/60') : ''}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">{item.member.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-400">{getMemberTee(item.member, getMemberGames(item.member.id).length)}</div>
              </div>
              {tab === 'putt' ? (
                <span className="text-xs sm:text-sm font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg">{item.putts} 推</span>
              ) : (
                <div className="flex text-right gap-2 sm:gap-4 flex-shrink-0">
                  <span className="w-12 sm:w-16 text-xs sm:text-sm font-bold text-gray-900">{item.grossScore} 杆</span>
                  <span className={`w-10 sm:w-12 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                    item.progress == null ? 'text-gray-400' : 
                    item.progress > 0 ? 'text-green-700 bg-green-50' : 
                    item.progress < 0 ? 'text-red-600 bg-red-50' : 'text-gray-500'
                  }`}>
                    {item.progress == null ? '--' : `${item.progress > 0 ? '↑' : item.progress < 0 ? '↓' : ''}${Math.abs(item.progress)}`}
                  </span>
                </div>
              )}
            </Link>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  )
}
