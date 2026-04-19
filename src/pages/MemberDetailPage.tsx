import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee, getCourseImage } from '../data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Icon, BirdKingBadge } from '../components/Icons'

// 判断是否记录推杆数（2026年5月及以后的比赛才记录推杆，4月及以前不记录）
function hasPuttData(date: string): boolean {
  return date >= '2026-05-01'
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    getMemberById, getMemberGames, getAvgScore, getAvgPutts,
    getProgressScore,
    games, tournaments, birdieRecords, members,
  } = useStore()

  const member = getMemberById(id ?? '')
  if (!member) return <div className="text-center py-20 text-gray-400">未找到该会员</div>

  // 计算鸟王排名（按打鸟次数前3名）
  const birdKingRank = (() => {
    const countMap = new Map<string, number>()
    birdieRecords.forEach(r => countMap.set(r.memberId, (countMap.get(r.memberId) || 0) + 1))
    const sorted = [...countMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
    const idx = sorted.findIndex(([mid]) => mid === member.id)
    return idx >= 0 ? idx : -1
  })()

  const memberGames = getMemberGames(member.id)
  const avgScore = getAvgScore(member.id)
  const avgPutts = getAvgPutts(member.id)
  const bestScore = memberGames.length > 0 ? Math.min(...memberGames.map(g => g.score.grossScore)) : '-'
  const worstScore = memberGames.length > 0 ? Math.max(...memberGames.map(g => g.score.grossScore)) : '-'

  // 判断是否有推杆数据（是否有2026年3月及以后的比赛）
  const hasAnyPuttData = memberGames.some(g => hasPuttData(g.tournament.date))

  // 入会时间：按第一场参赛比赛日期算
  const joinDate = memberGames.length > 0 ? memberGames[0].tournament.date : member.joinDate

  // 获取最近12场比赛数据
  const recentGames = memberGames.slice(-12)
  // 判断是否有跨年（最近12场比赛中是否存在不同年份）
  const years = new Set(recentGames.map(g => g.tournament.date.slice(0, 4)))
  const hasCrossYear = years.size > 1

  const chartData = recentGames.map(g => ({
    name: g.tournament.name.replace('月例赛', ''),
    date: hasCrossYear ? g.tournament.date : g.tournament.date.slice(5),
    gross: g.score.grossScore,
    putts: hasPuttData(g.tournament.date) ? g.score.putts : null,
  }))

  const detailData = memberGames.slice(-12).reverse().map(g => {
    // 计算该场比赛所有参赛者的进步系数，按进步系数降序排名
    const game = games.find(gm => gm.tournamentId === g.tournament.id)
    const playerCount = game?.scores.length ?? 0
    const topN = playerCount <= 5 ? 2 : 3 // 参赛≤5人只有前2名，否则前3名
    const progressList = (game?.scores ?? [])
      .map(s => ({
        memberId: s.memberId,
        progress: getProgressScore(s.memberId, g.tournament.id),
      }))
      .filter(p => p.progress !== null)
      .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
      .map((p, i) => ({ ...p, rank: i + 1 }))
    const rank = progressList.find(p => p.memberId === member.id)?.rank ?? '-'
    return {
      tournament: g.tournament,
      score: g.score,
      progress: getProgressScore(member.id, g.tournament.id),
      rank,
      topN,
    }
  })



  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      <div className="flex items-center justify-between">
        <Link to="/ranking" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-golf-700 transition-all duration-200 px-3.5 py-2 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(78,126,58,0.2)' }}>
          ← 返回排行榜
        </Link>
      </div>

      <div className="space-y-5 sm:space-y-7">
      {/* Profile Card */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src={member.background || member.avatar}
            alt=""
            className={`w-full h-full object-cover ${member.background ? '' : 'blur-xl scale-150'}`}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75" />

        {/* 内容 */}
        <div className="relative pt-7 sm:pt-10 pb-3 sm:pb-4">
          {/* 上半：头像 + 姓名居中 */}
          <div className="flex flex-col items-center px-5">
            <div className="relative">
              <div className="p-[2.5px] rounded-full shadow-2xl" style={{ background: 'linear-gradient(135deg, #a8d98a, #4e7e3a, #2d5a1e)' }}>
                <img src={member.avatar} alt="" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 border-2 border-white" />
              </div>
              {birdKingRank >= 0 && (
                <div className="absolute -bottom-1 -right-1">
                  <BirdKingBadge rank={birdKingRank} />
                </div>
              )}
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white mt-2 drop-shadow-lg">{member.name}</h1>
            <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white/60">
              <span>{member.realName || member.name}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/35" />
              <span>{member.gender}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/35" />
              <span>{getMemberTee(member, memberGames.length)}</span>
              <span className="w-0.5 h-0.5 rounded-full bg-white/35" />
              <span className="hidden sm:inline">{joinDate}入会</span>
              <span className="sm:hidden">{joinDate.slice(5)}入会</span>
            </div>
          </div>

          {/* 下半：统计数据横排 */}
          <div className="mx-3 sm:mx-4 mt-3 sm:mt-3.5 px-1.5 sm:px-2 py-1.5 sm:py-2">
            <div className={`grid ${hasAnyPuttData ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {[
                { label: '场次', value: `${memberGames.length}/${tournaments.length}`, accent: '#93c5fd' },
                { label: '均杆', value: avgScore || '-', accent: '#6ee7b7' },
                { label: '最佳/最差', value: `${bestScore}/${worstScore}`, accent: '#ffffff' },
                ...(hasAnyPuttData ? [{ label: '推杆', value: avgPutts || '-', accent: '#c4b5fd' }] : []),
              ].map((s, i, arr) => (
                <div key={s.label} className={`flex flex-col items-center py-0.5 ${i < arr.length - 1 ? 'border-r border-white/10' : ''}`}>
                  <span className="text-[9px] sm:text-[10px] text-white/45 font-medium">{s.label}</span>
                  <span className="text-xs sm:text-sm font-bold" style={{ color: s.accent }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart - 杆数变化趋势 */}
      {chartData.length > 0 && (
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="trending" className="w-4 h-4" /></div>
            杆数变化趋势
          </h2>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis domain={['dataMin - 4', 'dataMax + 4']} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value: number, name: string) => {
                    if (value === null) return ['-', name === '总杆数' ? '杆数' : '推杆数']
                    return [value, name === '总杆数' ? '杆数' : '推杆数']
                  }}
                  labelFormatter={(_label: any, payload: any) => payload?.[0]?.payload?.name ?? ''}
                />
                <Line type="monotone" dataKey="gross" stroke="#4e7e3a" strokeWidth={2.5} dot={{ r: 4, fill: '#4e7e3a', strokeWidth: 2, stroke: '#fff' }} name="总杆数" />
                <Line type="monotone" dataKey="putts" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} name="推杆数" strokeDasharray="5 5" connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Birdie Records - 个人打鸟记录 */}
      {(() => {
        const memberBirdies = birdieRecords
          .filter(r => r.memberId === member.id)
          .sort((a, b) => a.number - b.number)
        if (memberBirdies.length === 0) return null
        return (
          <Link
            to="/birdie"
            className="block rounded-2xl sm:rounded-3xl overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-0.5 hover:card-shadow-hover"
            style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
          >
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: 'rgba(221, 228, 213, 0.3)' }}>
              <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="bird" className="w-4 h-4" /></div>
                打鸟记录
                <span className="text-xs font-normal text-golf-600 px-2 py-0.5 rounded-full" style={{ background: 'rgba(78, 126, 58, 0.1)' }}>
                  {memberBirdies.length}只鸟
                </span>
              </h2>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                查看全部 →
              </span>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {memberBirdies.map(birdie => (
                  <span
                    key={birdie.id}
                    className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${
                      birdie.type === 'simulator'
                        ? 'bg-purple-50 text-purple-600 border border-purple-100'
                        : 'text-golf-600'
                    }`}
                    style={birdie.type !== 'simulator' ? { background: 'rgba(221, 228, 213, 0.5)', border: '1px solid rgba(184, 204, 170, 0.4)' } : undefined}
                  >
                    {birdie.type === 'simulator' && <><Icon name="target" className="w-3 h-3 inline-block" /> </>}
                    第{birdie.number}鸟
                  </span>
                ))}
              </div>
            </div>
          </Link>
        )
      })()}

      {/* Game History */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100" style={{ background: 'rgba(221, 228, 213, 0.3)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="chart" className="w-4 h-4" /></div>
            比赛记录与系数分析
          </h2>
        </div>
        {detailData.length === 0 && (
          <div className="px-4 sm:px-5 py-10 sm:py-12 text-center text-gray-400 text-sm">暂无比赛记录</div>
        )}
        <div className="divide-y divide-gray-50">
          {detailData.map(d => (
            <Link
              key={d.tournament.id}
              to={`/game/${d.tournament.id}`}
              className="flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-3 sm:py-4 hover:bg-golf-50/40 transition-all duration-200"
            >
              {/* 球场缩略图 */}
              <div className="w-12 h-9 sm:w-16 sm:h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                <img
                  src={getCourseImage(d.tournament.courseName)}
                  alt={d.tournament.courseName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200&h=150&fit=crop&q=80&auto=format'
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-800">
                    {d.tournament.name.match(/(\d+)月/)?.[1] ?? d.tournament.name}月
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{d.tournament.courseName}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{d.tournament.date}</div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-3 ml-2 flex-shrink-0">
                <div className="text-center w-[38px] sm:w-[46px]">
                  <div className="text-[10px] sm:text-xs text-gray-400">排名</div>
                  <div className={`text-xs sm:text-sm font-bold ${
                    d.rank === 1 ? 'text-amber-500' :
                    d.rank === 2 ? 'text-gray-500' :
                    d.rank === 3 && d.topN >= 3 ? 'text-amber-700' :
                    'text-gray-800'
                  }`}>{d.rank}</div>
                </div>
                <div className="text-center w-[38px] sm:w-[46px]">
                  <div className="text-[10px] sm:text-xs text-gray-400">总杆</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800">{d.score.grossScore}</div>
                </div>
                {hasPuttData(d.tournament.date) && (
                  <div className="text-center w-[46px] hidden sm:block">
                    <div className="text-xs text-gray-400">推杆</div>
                    <div className="text-sm text-gray-600">{d.score.putts}</div>
                  </div>
                )}
                <div className="text-center w-[56px] sm:w-[72px]">
                  <div className="text-[10px] sm:text-xs text-gray-400">进步系数</div>
                  <div className={`text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-full ${d.progress == null ? 'text-gray-400' : d.progress > 0 ? 'text-golf-700 bg-golf-50' : d.progress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
                    {d.progress == null ? '--' : `${d.progress > 0 ? '↑' : d.progress < 0 ? '↓' : ''}${Math.abs(d.progress)}`}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
