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
      {/* 页面标题区 - 天蓝绿渐变 */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8dfe8 0%, #9ed4c4 40%, #3a9e5c 80%, #2a8c4e 100%)',
        boxShadow: '0 4px 24px rgba(19, 92, 51, 0.15)',
      }}>
        {/* 云朵 */}
        <div className="absolute top-3 left-[10%] animate-drift">
          <div className="w-12 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-5 right-[15%] animate-drift" style={{ animationDelay: '3s' }}>
          <div className="w-10 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.25)' }} />
        </div>
        {/* 山丘 */}
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(42, 140, 78, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2" style={{ color: '#0f4828' }}>
            <span className="text-xl sm:text-2xl">🏆</span> 总排行榜
          </h1>
          <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'rgba(15, 72, 40, 0.65)' }}>
            {isHandicapTab ? '按平均差点排名，差点越低排名越高' : '按最近一场月赛进步系数排名'}
          </p>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('handicap')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            isHandicapTab
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={isHandicapTab ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">📊</span>平均差点总排行
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            !isHandicapTab
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={!isHandicapTab ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">🐎</span>最近月赛进步排行
        </button>
      </div>

      {/* Top 3 Podium */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
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
            const crownStyles = [
              // 🥇 金冠 - 华丽金色
              { color: '#FFD700', shadow: '#B8860B', accent: '#FFA500', glow: 'drop-shadow(0 2px 6px rgba(255, 215, 0, 0.6))' },
              // 🥈 银冠 - 典雅银色
              { color: '#C0C0C0', shadow: '#808080', accent: '#A8A8A8', glow: 'drop-shadow(0 2px 6px rgba(192, 192, 192, 0.5))' },
              // 🥉 铜冠 - 古典铜色
              { color: '#CD7F32', shadow: '#8B4513', accent: '#D2691E', glow: 'drop-shadow(0 2px 6px rgba(205, 127, 50, 0.5))' },
            ];
            const crown = crownStyles[order];
            const rankNum = order + 1;
            return (
              <div key={r.member.id} className="flex flex-col items-center">
                <Link to={`/member/${r.member.id}`} className="flex flex-col items-center text-center group">
                  <div className={`relative p-0.5 rounded-full bg-gradient-to-br ${bgColors[order]} shadow-lg mt-5 sm:mt-6`}>
                    {/* 皇冠（含名次数字） */}
                    <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 z-10" style={{ filter: crown.glow }}>
                      <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-7 sm:w-11 sm:h-8">
                        {/* 皇冠主体 */}
                        <path d="M4 24L7 10L14 17L20 6L26 17L33 10L36 24H4Z" fill={crown.color} stroke={crown.shadow} strokeWidth="1.2"/>
                        {/* 三个尖顶 */}
                        <circle cx="7" cy="9" r="2.5" fill={crown.accent} stroke={crown.shadow} strokeWidth="0.8"/>
                        <circle cx="20" cy="4.5" r="3" fill={crown.accent} stroke={crown.shadow} strokeWidth="0.8"/>
                        <circle cx="33" cy="9" r="2.5" fill={crown.accent} stroke={crown.shadow} strokeWidth="0.8"/>
                        {/* 底部冠带 */}
                        <rect x="4" y="22" width="32" height="8" rx="1.5" fill={crown.color} stroke={crown.shadow} strokeWidth="0.8"/>
                        {/* 名次数字 */}
                        <text x="20" y="29" textAnchor="middle" fill={crown.shadow} fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif">{rankNum}</text>
                        {/* 宝石装饰 */}
                        {order === 0 && <>
                          <circle cx="12" cy="26" r="1.2" fill={crown.shadow}/>
                          <circle cx="28" cy="26" r="1.2" fill={crown.shadow}/>
                        </>}
                        {order === 1 && <>
                          <circle cx="13" cy="26" r="1" fill={crown.shadow}/>
                          <circle cx="27" cy="26" r="1" fill={crown.shadow}/>
                        </>}
                        {order === 2 && <>
                          <circle cx="13" cy="26" r="1" fill={crown.shadow}/>
                          <circle cx="27" cy="26" r="1" fill={crown.shadow}/>
                        </>}
                      </svg>
                    </div>
                    <img src={r.member.avatar} alt="" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-gray-100 group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800 truncate max-w-[80px] mt-2">{r.member.name}</div>
                  {isHandicapTab ? (
                    <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 px-2 py-0.5 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.6)' }}>{r.handicapIndex} 差点</div>
                  ) : (
                    <div className={`text-[10px] sm:text-xs mt-0.5 px-2 py-0.5 rounded-full font-medium ${r.latestProgress == null ? 'text-gray-400 bg-gray-50' : r.latestProgress > 0 ? 'text-golf-700 bg-golf-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500 bg-gray-50'}`}>
                      {r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full Ranking List */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-3 text-xs font-medium text-gray-400 border-b border-gray-100" style={{ background: 'rgba(212, 238, 232, 0.3)' }}>
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
        <div className="sm:hidden grid grid-cols-10 gap-1 px-3 py-2.5 text-[10px] font-medium text-gray-400 border-b border-gray-100" style={{ background: 'rgba(212, 238, 232, 0.3)' }}>
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
            className="block sm:grid sm:grid-cols-12 sm:gap-2 sm:px-5 sm:py-3.5 px-3 py-3 border-b border-gray-50/80 hover:bg-golf-50/40 transition-all duration-200"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden flex items-center gap-2">
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-lg text-[10px] font-bold flex-shrink-0 ${
                r.rank === 1 ? 'text-white shadow-sm' :
                r.rank === 2 ? 'text-white shadow-sm' :
                r.rank === 3 ? 'text-white shadow-sm' :
                'bg-gray-100 text-gray-500'
              }`} style={
                r.rank === 1 ? { background: 'linear-gradient(135deg, #facc15, #eab308)' } :
                r.rank === 2 ? { background: 'linear-gradient(135deg, #9ca3af, #6b7280)' } :
                r.rank === 3 ? { background: 'linear-gradient(135deg, #d97706, #b45309)' } :
                undefined
              }>{r.rank}</span>
              <img src={r.member.avatar} alt="" className="w-7 h-7 rounded-xl bg-gray-100 flex-shrink-0 shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 truncate">{r.member.name}</div>
                <div className="text-[10px] text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
              </div>
              <div className={`text-right text-xs font-bold px-2 py-0.5 rounded-full ${isHandicapTab ? 'text-golf-700 bg-golf-50' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-golf-700 bg-golf-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
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
                  r.rank === 1 ? 'text-white shadow-sm' :
                  r.rank === 2 ? 'text-white shadow-sm' :
                  r.rank === 3 ? 'text-white shadow-sm' :
                  'bg-gray-100 text-gray-500'
                }`} style={
                  r.rank === 1 ? { background: 'linear-gradient(135deg, #facc15, #eab308)' } :
                  r.rank === 2 ? { background: 'linear-gradient(135deg, #9ca3af, #6b7280)' } :
                  r.rank === 3 ? { background: 'linear-gradient(135deg, #d97706, #b45309)' } :
                  undefined
                }>{r.rank}</span>
              </div>
              <div className="col-span-3 flex items-center gap-2.5">
                <img src={r.member.avatar} alt="" className="w-9 h-9 rounded-xl bg-gray-100 shadow-sm" />
                <div>
                  <div className="text-sm font-medium text-gray-800">{r.member.name}</div>
                  <div className="text-xs text-gray-400">{getMemberTee(r.member, r.gameCount)}</div>
                </div>
              </div>
              <div className={`col-span-2 flex items-center justify-center`}>
                <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${isHandicapTab ? 'text-golf-700 bg-golf-50' : r.latestProgress == null ? 'text-gray-400' : r.latestProgress > 0 ? 'text-golf-700 bg-golf-50' : r.latestProgress < 0 ? 'text-red-500 bg-red-50' : 'text-gray-500'}`}>
                  {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                </span>
              </div>
              <div className="col-span-4 text-center flex items-center justify-center">
                {isHandicapTab ? (
                  <span className="text-xs text-gray-600 px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.5)' }}>{r.avgScore}</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600 px-2 py-0.5 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.5)' }}>{r.latestScore}</span>
                    <span className="text-xs text-gray-300">/</span>
                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{r.avgScore}</span>
                  </div>
                )}
              </div>
              <div className="col-span-2 text-center flex items-center justify-center">
                <div className="text-sm text-gray-600">
                  <span className="px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.4)' }}>{r.participationRate}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
