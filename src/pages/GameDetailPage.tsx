import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee, getCourseImage, type Tournament } from '../data'
import { Icon, BirdKingBadge } from '../components/Icons'

type Tab = 'gross' | 'putt'
type SortBy = 'gross' | 'progress'

// 获取球场头图URL
function getCourseImageUrl(tournament: Tournament): string {
  return getCourseImage(tournament.courseName)
}

// 判断是否记录推杆数（2026年5月及以后的比赛才记录推杆，4月及以前不记录）
function hasPuttData(date: string): boolean {
  return date >= '2026-05-01'
}

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    tournaments, games, getMemberById,
    getGrossRanking, getPuttRanking,
    getProgressScore, getMemberGames,
    birdieRecords,
  } = useStore()

  const tournament = tournaments.find(t => t.id === id)
  if (!tournament || !id) return <div className="text-center py-20 text-gray-400">未找到该比赛</div>

  // 鸟王映射：打鸟次数前3名
  const birdKingMap = (() => {
    const countMap = new Map<string, number>()
    birdieRecords.forEach(r => countMap.set(r.memberId, (countMap.get(r.memberId) || 0) + 1))
    return new Map([...countMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([mid], i) => [mid, i]))
  })()

  const game = games.find(g => g.tournamentId === id)
  const [tab, setTab] = useState<Tab>('gross')
  const [sortBy, setSortBy] = useState<SortBy>('progress')

  const grossRanking = getGrossRanking(id)
  const puttRanking = getPuttRanking(id)

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
  const playerCount = fullRanking.length
  const topN = playerCount <= 5 ? 2 : 3  // 参赛≤5人只有前2名，否则前3名

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
              <Icon name="people" className="w-3.5 h-3.5 inline-block" /> {game?.scores.length ?? 0} 人参赛
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

      {/* 本场亮点：进步黑马 / 退步红马 / 鸟哥 三模块统一风格 */}
      {(() => {
        const withProgress = fullRanking.filter(r => r.progress != null)
        const bestPlayer = withProgress.length > 0 ? withProgress.reduce((best, r) => (r.progress ?? -999) > (best.progress ?? -999) ? r : best) : null
        const worstPlayer = withProgress.length > 0 ? withProgress.reduce((worst, r) => (r.progress ?? 999) < (worst.progress ?? 999) ? r : worst) : null
        const showWorst = worstPlayer && bestPlayer && worstPlayer.member.id !== bestPlayer.member.id && (worstPlayer.progress ?? 0) < 0
        const gameBirdies = birdieRecords.filter(r => r.date === tournament.date || r.location === tournament.courseName)
        // 取打鸟最多的那个人作为"鸟哥"
        const birdCountMap = new Map<string, { count: number, notes: string[] }>()
        gameBirdies.forEach(b => {
          const prev = birdCountMap.get(b.memberId) || { count: 0, notes: [] }
          prev.count++
          if (b.note) prev.notes.push(b.note)
          birdCountMap.set(b.memberId, prev)
        })
        const birdHero = birdCountMap.size > 0
          ? [...birdCountMap.entries()].sort((a, b) => b[1].count - a[1].count)[0]
          : null
        const birdHeroMember = birdHero ? getMemberById(birdHero[0]) : null

        if (!bestPlayer && gameBirdies.length === 0) return null

        // 计算有几个模块展示
        const moduleCount = (bestPlayer ? 1 : 0) + (showWorst ? 1 : 0) + (birdHeroMember ? 1 : 0)
        const gridCols = moduleCount === 3 ? 'grid-cols-3' : moduleCount === 2 ? 'grid-cols-2' : 'grid-cols-1'

        return (
          <div className={`grid gap-2 sm:gap-2.5 ${gridCols}`}>
            {/* 打鸟哥/姐 */}
            {birdHeroMember && birdHero && (
              <Link to={`/member/${birdHeroMember.id}`} className="group/card relative rounded-2xl p-2.5 sm:p-3 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden card-shadow" style={{
                background: 'linear-gradient(145deg, rgba(207, 233, 250, 0.5) 0%, rgba(228, 243, 255, 0.6) 100%)',
                border: '1px solid rgba(147, 197, 235, 0.35)',
              }}>
                <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(14,116,194,0.4), transparent)' }} />
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="relative">
                    <img src={birdHeroMember.avatar} alt="" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 shadow-md object-cover ring-2 ring-white/80 group-hover/card:ring-sky-300/60 transition-all" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-md ring-1.5 ring-white" style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)' }}>
                      <div style={{ filter: 'brightness(0) invert(1)' }}><Icon name="birdstar" className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></div>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-sky-700">
                    {birdHeroMember.gender === '男' ? '打鸟哥' : '打鸟姐'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 truncate w-full text-center">
                    {birdHeroMember.name}
                  </div>
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold" style={{ background: 'rgba(14, 116, 194, 0.1)', color: '#0369a1' }}>
                    {birdHero[1].notes.length > 0 ? birdHero[1].notes.join('、') : `${birdHero[1].count} 只鸟`}
                  </div>
                </div>
              </Link>
            )}

            {/* 进步黑马 */}
            {bestPlayer && (
              <Link to={`/member/${bestPlayer.member.id}`} className="group/card relative rounded-2xl p-2.5 sm:p-3 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden card-shadow" style={{
                background: 'linear-gradient(145deg, rgba(220, 237, 207, 0.55) 0%, rgba(237, 245, 230, 0.65) 100%)',
                border: '1px solid rgba(184, 204, 170, 0.35)',
              }}>
                <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(78,126,58,0.4), transparent)' }} />
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="relative">
                    <img src={bestPlayer.member.avatar} alt="" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 shadow-md object-cover ring-2 ring-white/80 group-hover/card:ring-golf-300/60 transition-all" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-md ring-1.5 ring-white" style={{ background: 'linear-gradient(135deg, #4e7e3a, #6ba04a)' }}>
                      <div style={{ filter: 'brightness(0) invert(1)' }}><Icon name="horse" className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></div>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-golf-700">
                    进步黑马
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 truncate w-full text-center">
                    {bestPlayer.member.name}
                  </div>
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold" style={{ background: 'rgba(78, 126, 58, 0.12)', color: '#3d6b2b' }}>
                    ↑{(bestPlayer.progress ?? 0).toFixed(1)}
                  </div>
                </div>
              </Link>
            )}

            {/* 退步红马 */}
            {showWorst && worstPlayer && (
              <Link to={`/member/${worstPlayer.member.id}`} className="group/card relative rounded-2xl p-2.5 sm:p-3 transition-all duration-200 hover:-translate-y-0.5 overflow-hidden card-shadow" style={{
                background: 'linear-gradient(145deg, rgba(254, 221, 221, 0.4) 0%, rgba(255, 241, 241, 0.5) 100%)',
                border: '1px solid rgba(252, 165, 165, 0.3)',
              }}>
                <div className="absolute -right-3 -top-3 w-12 h-12 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.4), transparent)' }} />
                <div className="flex flex-col items-center text-center gap-1.5">
                  <div className="relative">
                    <img src={worstPlayer.member.avatar} alt="" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 shadow-md object-cover ring-2 ring-white/80 group-hover/card:ring-red-300/60 transition-all" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-md ring-1.5 ring-white" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                      <div style={{ filter: 'brightness(0) invert(1)' }}><Icon name="downfall" className="w-2.5 h-2.5 sm:w-3 sm:h-3" /></div>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-red-600">
                    退步红马
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 truncate w-full text-center">
                    {worstPlayer.member.name}
                  </div>
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold" style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#b91c1c' }}>
                    ↓{Math.abs(worstPlayer.progress ?? 0).toFixed(1)}
                  </div>
                </div>
              </Link>
            )}
          </div>
        )
      })()}

      {/* 推杆排名Tab - 仅当有推杆数据时显示切换 */}
      {showPuttTab && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setTab('gross')}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === 'gross'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:bg-white/80 card-shadow'
            }`}
            style={tab === 'gross' ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <Icon name="trophy" className="w-4 h-4" />
            <span>杆数排名</span>
          </button>
          <button
            onClick={() => setTab('putt')}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              tab === 'putt'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:bg-white/80 card-shadow'
            }`}
            style={tab === 'putt' ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            <Icon name="golf" className="w-4 h-4" />
            <span>推杆排名</span>
          </button>
        </div>
      )}

      {/* 排序切换 */}
      {tab !== 'putt' && (
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            onClick={() => setSortBy('progress')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              sortBy === 'progress'
                ? 'text-golf-700 shadow-sm'
                : 'text-gray-500 hover:bg-white/80 card-shadow'
            }`}
            style={sortBy === 'progress' ? { background: 'rgba(221, 228, 213, 0.6)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            按进步系数
          </button>
          <button
            onClick={() => setSortBy('gross')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              sortBy === 'gross'
                ? 'text-golf-700 shadow-sm'
                : 'text-gray-500 hover:bg-white/80 card-shadow'
            }`}
            style={sortBy === 'gross' ? { background: 'rgba(221, 228, 213, 0.6)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
          >
            按杆数
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
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="w-14 sm:w-16 text-right">杆数</span>
              <span className="w-12 sm:w-14 text-right">进步</span>
            </div>
          </div>
        )}
        <div className="divide-y divide-gray-50">
          {currentData.map((item: any) => {
            // 前三名皇冠配置（与排行榜一致）
            const crownConfigs = [
              { // 金冠
                body: '#FBBF24', bodyStroke: '#D97706',
                jewel: '#DC2626', jewelStroke: '#B91C1C',
                band: '#F59E0B', bandStroke: '#B45309',
                numColor: '#78350F',
                glow: 'drop-shadow(0 1px 4px rgba(251,191,36,0.5))',
              },
              { // 银冠
                body: '#CBD5E1', bodyStroke: '#94A3B8',
                jewel: '#60A5FA', jewelStroke: '#3B82F6',
                band: '#94A3B8', bandStroke: '#64748B',
                numColor: '#334155',
                glow: 'drop-shadow(0 1px 3px rgba(148,163,184,0.45))',
              },
              { // 铜冠
                body: '#F97316', bodyStroke: '#C2410C',
                jewel: '#FDE68A', jewelStroke: '#F59E0B',
                band: '#EA580C', bandStroke: '#9A3412',
                numColor: '#431407',
                glow: 'drop-shadow(0 1px 3px rgba(249,115,22,0.4))',
              },
            ];
            const isTopN = item.rank >= 1 && item.rank <= topN;
            const crown = isTopN ? crownConfigs[item.rank - 1] : null;

            return (
            <Link
              key={item.member.id}
              to={`/member/${item.member.id}`}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 hover:bg-golf-50/50 transition-colors"
            >
              <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                item.rank === 1 && topN >= 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                item.rank === 2 && topN >= 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                item.rank === 3 && topN >= 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                'bg-gray-100 text-gray-500'
              }`}>{item.rank}</span>
              {/* 头像 + 前三名皇冠 */}
              <div className={`relative flex-shrink-0 ${isTopN ? 'mt-1.5' : ''}`}>
                {isTopN && crown && (
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
                <img src={item.member.avatar} alt="" className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gray-100 shadow-sm ${isTopN ? 'ring-2 ring-offset-1 ' + (item.rank === 1 ? 'ring-amber-300/80' : item.rank === 2 ? 'ring-slate-300/70' : 'ring-orange-400/60') : ''}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-gray-800 truncate flex items-center gap-1">{item.member.name}{birdKingMap.has(item.member.id) && <BirdKingBadge rank={birdKingMap.get(item.member.id)!} />}</div>
                <div className="text-[10px] sm:text-xs text-gray-400">{getMemberTee(item.member, getMemberGames(item.member.id).length)}</div>
              </div>
              {tab === 'putt' ? (
                <span className="text-xs sm:text-sm font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg">{item.putts} 推</span>
              ) : (
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <span className="w-14 sm:w-16 text-right text-xs sm:text-sm font-bold text-gray-900">{item.grossScore} 杆</span>
                  <span className={`w-12 sm:w-14 text-right text-[10px] sm:text-xs font-semibold ${
                    item.progress == null ? 'text-gray-400' : 
                    item.progress > 0 ? 'text-green-700' : 
                    item.progress < 0 ? 'text-red-600' : 'text-gray-500'
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
