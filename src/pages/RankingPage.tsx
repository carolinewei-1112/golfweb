import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { getMemberTee } from '../data'
import { Icon, BirdKingBadge } from '../components/Icons'

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
  const { overallRanking, progressRanking, birdieRecords } = useStore()
  const [activeTab, setActiveTab] = useState<RankingType>('handicap')

  const isHandicapTab = activeTab === 'handicap'
  const currentRanking: RankingItem[] = isHandicapTab ? overallRanking : progressRanking

  // 鸟王映射：打鸟次数前3名
  const birdKingMap = (() => {
    const countMap = new Map<string, number>()
    birdieRecords.forEach(r => countMap.set(r.memberId, (countMap.get(r.memberId) || 0) + 1))
    return new Map([...countMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id], i) => [id, i]))
  })()

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿渐变 */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8ccaa 0%, #8cb57a 40%, #4a7a38 80%, #4a7a38 100%)',
        boxShadow: '0 4px 24px rgba(46, 79, 36, 0.15)',
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
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(61, 102, 48, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2 text-white drop-shadow-md">
            <span className="text-xl sm:text-2xl"><Icon name="trophy" className="w-6 h-6" /></span> 总排行榜
          </h1>
          <p className="text-xs sm:text-sm mt-1.5 text-white/85 drop-shadow-sm">
            {isHandicapTab ? '按平均差点排名，差点越低排名越高' : '按最近一场月赛进步系数排名'}
          </p>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('handicap')}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            isHandicapTab
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={isHandicapTab ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <Icon name="chart" className="w-4 h-4" />
          <span>平均差点总排行</span>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            !isHandicapTab
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={!isHandicapTab ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)', boxShadow: '0 4px 12px rgba(46, 79, 36, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <Icon name="horse" className="w-4 h-4" />
          <span>最近月赛进步排行</span>
        </button>
      </div>

      {/* Top 3 Podium — 精致领奖台 */}
      <div className="rounded-2xl sm:rounded-3xl px-3 pt-10 pb-5 sm:px-8 sm:pt-12 sm:pb-7" style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(243,250,246,0.88) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 2px 20px rgba(19,92,51,0.06)',
      }}>
        <div className="flex items-end justify-center gap-3 sm:gap-6">
          {currentRanking.slice(0, 3).map((r, i) => {
            // 视觉顺序：第2名(左) | 第1名(居中突出) | 第3名(右)
            // i=0 → 第1名(金冠), i=1 → 第2名(银冠), i=2 → 第3名(铜冠)
            const order = i; // order即排名索引: 0=金, 1=银, 2=铜
            const displayOrder = i === 0 ? 1 : i === 1 ? 0 : 2; // CSS order: 第1名居中, 第2名左, 第3名右
            const avatarSizes = ['w-16 h-16 sm:w-20 sm:h-20', 'w-12 h-12 sm:w-16 sm:h-16', 'w-12 h-12 sm:w-14 sm:h-14'];
            const ringColors = [
              'ring-amber-300/80',   // 金
              'ring-slate-300/70',   // 银
              'ring-orange-400/60',  // 铜
            ];
            const crownConfigs = [
              { // 金冠
                body: '#FBBF24', bodyStroke: '#D97706',
                jewel: '#DC2626', jewelStroke: '#B91C1C',
                band: '#F59E0B', bandStroke: '#B45309',
                numColor: '#78350F',
                glow: 'drop-shadow(0 2px 8px rgba(251,191,36,0.5))',
                size: 'w-10 h-8 sm:w-12 sm:h-9',
                top: '-top-6 sm:-top-7',
              },
              { // 银冠
                body: '#CBD5E1', bodyStroke: '#94A3B8',
                jewel: '#60A5FA', jewelStroke: '#3B82F6',
                band: '#94A3B8', bandStroke: '#64748B',
                numColor: '#334155',
                glow: 'drop-shadow(0 2px 6px rgba(148,163,184,0.45))',
                size: 'w-8 h-6 sm:w-10 sm:h-8',
                top: '-top-5 sm:-top-6',
              },
              { // 铜冠
                body: '#F97316', bodyStroke: '#C2410C',
                jewel: '#FDE68A', jewelStroke: '#F59E0B',
                band: '#EA580C', bandStroke: '#9A3412',
                numColor: '#431407',
                glow: 'drop-shadow(0 2px 6px rgba(249,115,22,0.4))',
                size: 'w-8 h-6 sm:w-10 sm:h-8',
                top: '-top-5 sm:-top-6',
              },
            ];
            const crown = crownConfigs[order];
            const rankNum = order + 1;

            return (
              <Link
                key={r.member.id}
                to={`/member/${r.member.id}`}
                className="flex flex-col items-center text-center group transition-transform duration-200 hover:-translate-y-1"
                style={{ order: displayOrder, flex: order === 0 ? '1.2' : '1' }}
              >
                {/* 头像 + 皇冠 */}
                <div className="relative">
                  {/* 皇冠 SVG */}
                  <div className={`absolute ${crown.top} left-1/2 -translate-x-1/2 z-10`} style={{ filter: crown.glow }}>
                    <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={crown.size}>
                      {/* 皇冠主体 */}
                      <path d="M5 28L9 12L17 20L24 8L31 20L39 12L43 28H5Z" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1.5" strokeLinejoin="round"/>
                      {/* 三颗尖顶珠 */}
                      <circle cx="9" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                      <circle cx="24" cy="6" r="3.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="1"/>
                      <circle cx="39" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                      {/* 冠带 + 名次数字 */}
                      <rect x="5" y="26" width="38" height="9" rx="2" fill={crown.band} stroke={crown.bandStroke} strokeWidth="1"/>
                      <text x="24" y="33.5" textAnchor="middle" fill={crown.numColor} fontSize="8.5" fontWeight="800" fontFamily="'SF Pro Display', system-ui, -apple-system, sans-serif">{rankNum}</text>
                      {/* 冠带宝石装饰 */}
                      {order === 0 && <>
                        <circle cx="13" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                        <circle cx="35" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                      </>}
                    </svg>
                  </div>
                  {/* 头像 */}
                  <div className={`${avatarSizes[order]} rounded-full ring-[3px] ${ringColors[order]} overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform duration-200`}>
                    <img src={r.member.avatar} alt={r.member.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* 姓名 */}
                <p className={`font-semibold truncate max-w-[88px] ${order === 0 ? 'text-sm sm:text-base mt-3' : 'text-xs sm:text-sm mt-2.5'}`} style={{ color: '#1e293b' }}>
                  {r.member.name}
                </p>
                {birdKingMap.has(r.member.id) && <BirdKingBadge rank={birdKingMap.get(r.member.id)!} className="mt-1" />}

                {/* 数据标签 */}
                {isHandicapTab ? (
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full font-medium ${order === 0 ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'}`} style={{ color: '#166534', background: 'rgba(220,252,231,0.7)' }}>
                    {r.handicapIndex} 差点
                  </span>
                ) : (
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full font-medium ${order === 0 ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'} ${
                    r.latestProgress == null ? 'text-slate-400 bg-slate-50' :
                    r.latestProgress > 0 ? 'text-emerald-700 bg-emerald-50' :
                    r.latestProgress < 0 ? 'text-rose-600 bg-rose-50' :
                    'text-slate-500 bg-slate-50'
                  }`}>
                    {r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Full Ranking List */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 2px 20px rgba(19,92,51,0.06)',
      }}>
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-12 gap-2 px-6 py-3.5 text-xs font-semibold tracking-wide uppercase border-b" style={{ color: '#64748b', background: 'rgba(241,245,249,0.6)', borderColor: 'rgba(226,232,240,0.6)' }}>
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
        <div className="sm:hidden grid grid-cols-10 gap-1 px-4 py-3 text-[10px] font-semibold tracking-wide uppercase border-b" style={{ color: '#64748b', background: 'rgba(241,245,249,0.6)', borderColor: 'rgba(226,232,240,0.6)' }}>
          <div className="col-span-1">排名</div>
          <div className="col-span-4">会员</div>
          <div className="col-span-2 text-center">
            {isHandicapTab ? '差点' : '进步'}
          </div>
          <div className="col-span-3 text-center">
            {isHandicapTab ? '平均杆' : '杆数/平均'}
          </div>
        </div>

        {currentRanking.map((r, idx) => (
          <Link
            key={r.member.id}
            to={`/member/${r.member.id}`}
            className="block sm:grid sm:grid-cols-12 sm:gap-2 sm:px-6 sm:py-4 px-4 py-3.5 transition-all duration-150 hover:bg-emerald-50/40 active:bg-emerald-50/60"
            style={{ borderBottom: idx < currentRanking.length - 1 ? '1px solid rgba(241,245,249,0.8)' : 'none' }}
          >
            {/* Mobile Layout */}
            <div className="sm:hidden flex items-center gap-2.5">
              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-lg text-[10px] font-bold flex-shrink-0 ${
                r.rank <= 3 ? 'text-white' : 'text-slate-500'
              }`} style={
                r.rank === 1 ? { background: 'linear-gradient(135deg, #FBBF24, #D97706)' } :
                r.rank === 2 ? { background: 'linear-gradient(135deg, #94A3B8, #64748B)' } :
                r.rank === 3 ? { background: 'linear-gradient(135deg, #F97316, #C2410C)' } :
                { background: '#F1F5F9' }
              }>{r.rank}</span>
              <img src={r.member.avatar} alt="" className="w-8 h-8 rounded-xl bg-slate-100 flex-shrink-0 object-cover" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate flex items-center gap-1" style={{ color: '#1e293b' }}>{r.member.name}{birdKingMap.has(r.member.id) && <BirdKingBadge rank={birdKingMap.get(r.member.id)!} />}</div>
                <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>{getMemberTee(r.member, r.gameCount)}</div>
              </div>
              <div className={`text-right text-xs font-bold px-2.5 py-1 rounded-lg ${isHandicapTab ? 'text-emerald-700' : r.latestProgress == null ? 'text-slate-400' : r.latestProgress > 0 ? 'text-emerald-700' : r.latestProgress < 0 ? 'text-rose-600' : 'text-slate-500'}`}
                style={{ background: isHandicapTab ? 'rgba(220,252,231,0.6)' : undefined }}>
                {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
              </div>
              <div className="text-right text-[11px] min-w-[50px]" style={{ color: '#475569' }}>
                {isHandicapTab ? (
                  <span>{r.avgScore}</span>
                ) : (
                  <span>{r.latestScore}/{r.avgScore}</span>
                )}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:contents">
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex w-7 h-7 items-center justify-center rounded-lg text-xs font-bold ${
                  r.rank <= 3 ? 'text-white' : 'text-slate-500'
                }`} style={
                  r.rank === 1 ? { background: 'linear-gradient(135deg, #FBBF24, #D97706)' } :
                  r.rank === 2 ? { background: 'linear-gradient(135deg, #94A3B8, #64748B)' } :
                  r.rank === 3 ? { background: 'linear-gradient(135deg, #F97316, #C2410C)' } :
                  { background: '#F1F5F9' }
                }>{r.rank}</span>
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <img src={r.member.avatar} alt="" className="w-10 h-10 rounded-xl bg-slate-100 object-cover" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} />
                <div>
                  <div className="text-sm font-semibold flex items-center gap-1" style={{ color: '#1e293b' }}>{r.member.name}{birdKingMap.has(r.member.id) && <BirdKingBadge rank={birdKingMap.get(r.member.id)!} />}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{getMemberTee(r.member, r.gameCount)}</div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className={`text-sm font-bold px-3 py-1 rounded-lg ${isHandicapTab ? 'text-emerald-700' : r.latestProgress == null ? 'text-slate-400' : r.latestProgress > 0 ? 'text-emerald-700' : r.latestProgress < 0 ? 'text-rose-600' : 'text-slate-500'}`}
                  style={{ background: isHandicapTab ? 'rgba(220,252,231,0.6)' : r.latestProgress != null && r.latestProgress > 0 ? 'rgba(220,252,231,0.6)' : r.latestProgress != null && r.latestProgress < 0 ? 'rgba(255,228,230,0.6)' : undefined }}>
                  {isHandicapTab ? r.handicapIndex : r.latestProgress == null ? '--' : `${r.latestProgress > 0 ? '↑' : r.latestProgress < 0 ? '↓' : ''}${Math.abs(r.latestProgress)}`}
                </span>
              </div>
              <div className="col-span-4 flex items-center justify-center">
                {isHandicapTab ? (
                  <span className="text-sm px-3 py-1 rounded-lg" style={{ color: '#475569', background: 'rgba(241,245,249,0.7)' }}>{r.avgScore}</span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm px-2.5 py-1 rounded-lg" style={{ color: '#475569', background: 'rgba(241,245,249,0.7)' }}>{r.latestScore}</span>
                    <span style={{ color: '#cbd5e1' }}>/</span>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{r.avgScore}</span>
                  </div>
                )}
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span className="text-sm px-3 py-1 rounded-lg" style={{ color: '#475569', background: 'rgba(241,245,249,0.5)' }}>{r.participationRate}%</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
