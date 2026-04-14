import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee } from '../data'

type RankingType = 'handicap' | 'progress'

interface RankingItem {
  rank: number
  member: {
    id: string
    name: string
    avatar: string
    gender: '男' | '女'
    joinDate: string
    initialHandicap: number
    tee?: string
  }
  handicapIndex?: number
  avgProgress?: number
  latestProgress?: number
  latestScore?: number
  avgScore: number
  bestScore: number
  worstScore: number
  participationRate: number
  gameCount?: number
}

export default function RankingPage() {
  const { overallRanking, progressRanking } = useStore()
  const [activeTab, setActiveTab] = useState<RankingType>('handicap')

  const isHandicapTab = activeTab === 'handicap'
  const currentRanking: RankingItem[] = isHandicapTab ? overallRanking : progressRanking

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(135deg, #145730 0%, #166e3a 30%, #1a8a47 60%, #22a85a 100%)',
        boxShadow: '0 4px 20px rgba(22, 110, 58, 0.2)',
      }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(75, 198, 135, 0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)' }} />
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🏆</span> 总排行榜
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1.5">
            {isHandicapTab ? '按平均差点排名，差点越低排名越高' : '按最近一场月赛进步系数排名'}
          </p>
        </div>
      </div>

      {/* Tab切换 - 精致胶囊样式 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('handicap')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            isHandicapTab
              ? 'text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
          }`}
          style={isHandicapTab ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
        >
          <span className="mr-1.5">📊</span>平均差点总排行
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            !isHandicapTab
              ? 'text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
          }`}
          style={!isHandicapTab ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
        >
          <span className="mr-1.5">🐎</span>最近月赛进步排行
        </button>
      </div>

      {/* Top 3 Podium - 毛玻璃效果 */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {currentRanking.slice(0, 3).map((r, i) => {
            const order = i === 0 ? 0 : i === 1 ? 2 : 1;
            const heights = ['h-20 sm:h-28', 'h-16 sm:h-24', 'h-14 sm:h-20'];
            const medals = ['🥇', '🥈', '🥉'];
            const bgColors = [
              'from-yellow-400 via-amber-400 to-yellow-500',
              'from-gray-300 via-gray-200 to-gray-300',
              'from-amber-600 via-amber-500 to-amber-700',
            ];
            const borderColors = ['border-yellow-300', 'border-gray-200', 'border-amber-400'];
            return (
              <div key={r.member.id} className="flex flex-col items-center">
                <Link to={`/member/${r.member.id}`} className="flex flex-col items-center text-center group">
                  <div className={`relative p-0.5 rounded-full bg-gradient-to-br ${bgColors[order]} shadow-lg`}>
                    <img src={r.member.avatar} alt="" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-gray-100 group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 truncate max-w-[80px] mt-2">{r.member.name}</div>
                  {isHandicapTab ? (
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 bg-gray-50 px-2 py-0.5 rounded-full">{r.handicapIndex} 差点</div>
                  ) : (
                    <div className={`text-[10px] sm:text-xs mt-0.5 px-2 py-0.5 rounded-full font-medium ${r.latestProgress == null ? 'text-gray-400 bg-gray-50' : r.latestProgress > 0 ? 'text-green-700 bg-green-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-50'}`}>
                      {r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                    </div>
                  )}
                </Link>
                <div className={`w-full mt-3 bg-gradient-to-t ${bgColors[order]} rounded-t-2xl flex items-center justify-center ${heights[order]} shadow-inner border-t ${borderColors[order]}`}>
                  <span className="text-xl sm:text-3xl drop-shadow-sm">{medals[order]}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full Ranking List - 精致卡片 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}>
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium text-gray-400 border-b border-gray-100" style={{ background: 'rgba(249, 250, 251, 0.8)' }}>
          <div className="col-span-1">排名</div>
          <div className="col-span-3">会员</div>
          <div className="col-span-2 text-center">
            {isHandicapTab ? '平均差点' : '进步系数'}
          </div>
          <div className="col-span-4 text-center">
            {isHandicapTab ? '平均杆' : '最近杆数/历史平均'}
          </div>
          <div className="col-span-2 text-center">参赛率</div>
        </div>
        
        {/* Mobile Header */}
        <div className="sm:hidden grid grid-cols-10 gap-1 px-3 py-2.5 text-[10px] font-medium text-gray-400 border-b border-gray-100" style={{ background: 'rgba(249, 250, 251, 0.8)' }}>
          <div className="col-span-1">排名</div>
          <div className="col-span-4">会员</div>
          <div className="col-span-2 text-center">
            {isHandicapTab ? '差点' : '进步'}
          </div>
          <div className="col-span-3 text-center">
            {isHandicapTab ? '平均杆' : '杆数/平均'}
          </div>
        </div>

        {currentRanking.map(r => (
          <Link
            key={r.member.id}
            to={`/member/${r.member.id}`}
            className="block sm:grid sm:grid-cols-12 sm:gap-2 sm:px-5 sm:py-3.5 px-3 py-3 border-b border-gray-50/80 hover:bg-golf-50/50 transition-all duration-200"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden flex items-center gap-2">
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-lg text-[10px] font-bold flex-shrink-0 ${
                r.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                r.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                r.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                'bg-gray-100 text-gray-500'
              }`}>{r.rank}</span>
              <img src={r.member.avatar} alt="" className="w-7 h-7 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 truncate">{r.member.name}</div>
                <div className="text-[10px] text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
              </div>
              <div className={`text-right text-xs font-bold px-2 py-0.5 rounded-full ${isHandicapTab ? 'text-golf-700 bg-golf-50' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-green-700 bg-green-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
                {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
              </div>
              <div className="text-right text-[10px] text-gray-600 min-w-[50px]">
                {isHandicapTab ? (
                  <span>{r.avgScore}</span>
                ) : (
                  <span>{r.latestScore}/{r.avgScore}</span>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:contents">
              <div className="col-span-1">
                <span className={`inline-flex w-7 h-7 items-center justify-center rounded-lg text-xs font-bold ${
                  r.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                  r.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                  r.rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                  'bg-gray-100 text-gray-500'
                }`}>{r.rank}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2.5">
                <img src={r.member.avatar} alt="" className="w-9 h-9 rounded-xl bg-gray-100 shadow-sm" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{r.member.name}</div>
                  <div className="text-xs text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
                </div>
              </div>
              <div className={`col-span-2 flex items-center justify-center`}>
                <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${isHandicapTab ? 'text-golf-700 bg-golf-50' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-green-700 bg-green-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
                  {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                </span>
              </div>
              <div className="col-span-4 text-center flex items-center justify-center">
                {isHandicapTab ? (
                  <span className="text-xs text-gray-600 bg-gray-50 px-2.5 py-0.5 rounded-full">{r.avgScore}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">{r.latestScore}</span>
                    <span className="text-xs text-gray-300">/</span>
                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{r.avgScore}</span>
                  </div>
                )}
              </div>
              <div className="col-span-2 text-center flex items-center justify-center">
                <div className="text-sm text-gray-600">
                  <span className="bg-gray-50 px-2.5 py-0.5 rounded-full">{r.participationRate}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
