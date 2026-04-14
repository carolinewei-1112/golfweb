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
    <div className="animate-fade-in">
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">🏆 总排行榜</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {isHandicapTab ? '按平均差点排名，差点越低排名越高' : '按最近一场月赛进步系数排名，+表示进步，-表示退步'}
        </p>
      </div>

      {/* Tab切换 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('handicap')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            isHandicapTab
              ? 'bg-golf-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          平均差点总排行
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            !isHandicapTab
              ? 'bg-golf-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          最近月赛进步排行
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {currentRanking.slice(0, 3).map((r, i) => {
          const order = i === 0 ? 0 : i === 1 ? 2 : 1;
          const heights = ['h-20 sm:h-28', 'h-16 sm:h-24', 'h-14 sm:h-20'];
          const medals = ['🥇', '🥈', '🥉'];
          const bgColors = [
            'bg-gradient-to-t from-gold-500 to-gold-400',
            'bg-gradient-to-t from-gray-300 to-gray-200',
            'bg-gradient-to-t from-amber-700 to-amber-600',
          ];
          return (
            <div key={r.member.id} className="flex flex-col items-center">
              <Link to={`/member/${r.member.id}`} className="flex flex-col items-center text-center">
                <img src={r.member.avatar} alt="" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md bg-gray-100 mb-1" />
                <div className="text-xs sm:text-sm font-bold text-gray-800 truncate max-w-[80px]">{r.member.name}</div>
                {isHandicapTab ? (
                  <div className="text-[10px] sm:text-xs text-gray-500">{r.handicapIndex} 差点</div>
                ) : (
                  <div className={`text-[10px] sm:text-xs ${r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-golf-700' : r.latestProgress < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)} 进步系数`}
                  </div>
                )}
              </Link>
              <div className={`w-full mt-2 ${bgColors[order]} rounded-t-xl flex items-center justify-center ${heights[order]}`}>
                <span className="text-xl sm:text-3xl">{medals[order]}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full Ranking List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-2.5 bg-gray-50 text-xs font-medium text-gray-500">
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
        <div className="sm:hidden grid grid-cols-10 gap-1 px-3 py-2 bg-gray-50 text-[10px] font-medium text-gray-500">
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
            className="block sm:grid sm:grid-cols-12 sm:gap-2 sm:px-4 sm:py-3 px-3 py-2.5 border-b border-gray-50 hover:bg-golf-50 transition-colors"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden flex items-center gap-2">
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-[10px] font-bold flex-shrink-0 ${
                r.rank === 1 ? 'bg-gold-400 text-white' :
                r.rank === 2 ? 'bg-gray-300 text-gray-700' :
                r.rank === 3 ? 'bg-amber-600 text-white' :
                'text-gray-500'
              }`}>{r.rank}</span>
              <img src={r.member.avatar} alt="" className="w-7 h-7 rounded-full bg-gray-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 truncate">{r.member.name}</div>
                <div className="text-[10px] text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
              </div>
              <div className={`text-right text-xs font-bold ${isHandicapTab ? 'text-golf-700' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-golf-700' : r.latestProgress < 0 ? 'text-red-500' : 'text-gray-500'}`}>
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
                <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold ${
                  r.rank === 1 ? 'bg-gold-400 text-white' :
                  r.rank === 2 ? 'bg-gray-300 text-gray-700' :
                  r.rank === 3 ? 'bg-amber-600 text-white' :
                  'text-gray-500'
                }`}>{r.rank}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <img src={r.member.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-100" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{r.member.name}</div>
                  <div className="text-xs text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
                </div>
              </div>
              <div className={`col-span-2 text-center text-sm font-bold ${isHandicapTab ? 'text-golf-700' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-golf-700' : r.latestProgress < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
              </div>
              <div className="col-span-4 text-center">
                {isHandicapTab ? (
                  <span className="text-xs text-gray-600">{r.avgScore}</span>
                ) : (
                  <>
                    <span className="text-xs text-gray-600">{r.latestScore}</span>
                    <span className="text-xs text-gray-300 mx-1">/</span>
                    <span className="text-xs text-blue-500">{r.avgScore}</span>
                  </>
                )}
              </div>
              <div className="col-span-2 text-center text-sm text-gray-600">{r.participationRate}%</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
