import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee, getCourseImage } from '../data'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// 判断是否记录推杆数（2026年4月及以后的比赛才记录推杆，3月及以前不记录）
function hasPuttData(date: string): boolean {
  return date >= '2026-04-01'
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const {
    getMemberById, getMemberGames, getAvgScore, getAvgPutts,
    getProgressScore, getGrossRanking,
    games, tournaments,
  } = useStore()

  const member = getMemberById(id ?? '')
  if (!member) return <div className="text-center py-20 text-gray-400">未找到该会员</div>

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
    const ranking = getGrossRanking(g.tournament.id)
    const rank = ranking.find(r => r.member.id === member.id)?.rank ?? '-'
    return {
      tournament: g.tournament,
      score: g.score,
      progress: getProgressScore(member.id, g.tournament.id),
      rank,
    }
  })



  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      <div className="flex items-center justify-between">
        <Link to="/ranking" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-golf-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-golf-50">
          ← 返回排行榜
        </Link>
      </div>

      <div className="space-y-5 sm:space-y-7">
      {/* Profile Card with Full Background */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
        {/* 全屏背景图片 - 优先使用background，否则使用头像高斯模糊 */}
        <div className="absolute inset-0">
          <img
            src={member.background || member.avatar}
            alt=""
            className={`w-full h-full object-cover ${member.background ? '' : 'blur-xl scale-150'}`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
        
        {/* 内容区域 */}
        <div className="relative p-5 sm:p-7 text-white">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative p-0.5 rounded-full bg-gradient-to-br from-golf-400 to-golf-600 shadow-xl">
              <img src={member.avatar} alt="" className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gray-100 border-2 sm:border-3 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white truncate">{member.name}</h1>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-0.5 sm:gap-y-1 mt-1.5 sm:mt-2.5 text-xs sm:text-sm text-white/75">
                <span className="truncate">{member.realName || member.name}</span>
                <span className="bg-white/15 px-2 py-0.5 rounded-full">{member.gender}</span>
                <span className="hidden sm:inline">入会 {joinDate}</span>
                <span className="sm:hidden">{joinDate.slice(5)}</span>
                <span className="bg-white/15 px-2 py-0.5 rounded-full">{getMemberTee(member, memberGames.length)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-7">
            {[
              { label: '累计场次', value: `${memberGames.length}场/${tournaments.length}场`, color: 'text-blue-300' },
              { label: '平均杆数', value: avgScore || '-', color: 'text-emerald-300' },
              { label: '最佳/最差', value: `${bestScore}/${worstScore}`, color: 'text-white' },
              ...(hasAnyPuttData ? [{ label: '平均推杆', value: avgPutts || '-', color: 'text-purple-300' }] : []),
            ].map(s => (
              <div key={s.label} className="rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-center" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div className="text-[10px] sm:text-xs text-white/55 mb-0.5 sm:mb-1">{s.label}</div>
                <div className={`text-sm sm:text-lg font-bold ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart - 杆数变化趋势 */}
      {chartData.length > 0 && (
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(22, 168, 90, 0.1)' }}>📈</div>
            杆数变化趋势
          </h2>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
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
                <Line type="monotone" dataKey="gross" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }} name="总杆数" />
                <Line type="monotone" dataKey="putts" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} name="推杆数" strokeDasharray="5 5" connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Game History */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100" style={{ background: 'rgba(249, 250, 251, 0.8)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(22, 168, 90, 0.1)' }}>📊</div>
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
              className="flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-3 sm:py-4 hover:bg-golf-50/50 transition-all duration-200"
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
                  <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">{d.tournament.date}</span>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{d.tournament.courseName}</div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 ml-2 flex-shrink-0">
                <div className="text-center min-w-[28px] sm:min-w-[40px]">
                  <div className="text-[10px] sm:text-xs text-gray-400">排名</div>
                  <div className={`text-xs sm:text-sm font-bold ${
                    d.rank === 1 ? 'text-amber-500' :
                    d.rank === 2 ? 'text-gray-500' :
                    d.rank === 3 ? 'text-amber-700' :
                    'text-gray-800'
                  }`}>{d.rank}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] sm:text-xs text-gray-400">总杆</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800">{d.score.grossScore}</div>
                </div>
                {hasPuttData(d.tournament.date) && (
                  <div className="text-center hidden sm:block">
                    <div className="text-xs text-gray-400">推杆</div>
                    <div className="text-sm text-gray-600">{d.score.putts}</div>
                  </div>
                )}
                <div className="text-center min-w-[50px] sm:min-w-[70px]">
                  <div className="text-[10px] sm:text-xs text-gray-400">进步系数</div>
                  <div className={`text-xs sm:text-sm font-bold px-1.5 py-0.5 rounded-full ${d.progress == null ? 'text-gray-400' : d.progress > 0 ? 'text-green-700 bg-green-50' : d.progress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
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
