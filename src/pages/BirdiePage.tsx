import { useState } from 'react'
import { useStore } from '../store'

export default function BirdiePage() {
  const { birdieRecords, members, getMemberById } = useStore()
  const [activeTab, setActiveTab] = useState<'wall' | 'members'>('wall')

  // 按编号排序
  const sortedRecords = [...birdieRecords].sort((a, b) => a.number - b.number)

  // 计算完成进度
  const progress = Math.min(sortedRecords.length, 100)
  const progressPercent = progress

  // 按人聚合统计
  const memberStats = members.map(member => {
    const memberBirdies = sortedRecords.filter(r => r.memberId === member.id)
    return {
      member,
      count: memberBirdies.length,
      birdies: memberBirdies,
    }
  }).filter(stat => stat.count > 0).sort((a, b) => b.count - a.count)

  // 打鸟次数前3名的ID -> 排名映射（用于百鸟墙鸟王标签）
  const birdKingMap = new Map(memberStats.slice(0, 3).map((s, i) => [s.member.id, i]))

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8dfe8 0%, #9ed4c4 40%, #3a9e5c 80%, #2a8c4e 100%)',
        boxShadow: '0 4px 24px rgba(19, 92, 51, 0.15)',
      }}>
        <div className="absolute top-3 right-[15%] animate-drift">
          <div className="w-12 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-6 left-[8%] animate-drift" style={{ animationDelay: '3s' }}>
          <div className="w-10 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.2)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(42, 140, 78, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2" style={{ color: '#0f4828' }}>
            <span className="text-xl sm:text-2xl">🐦</span> 百鸟记录
          </h1>
          <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'rgba(15, 72, 40, 0.65)' }}>记录百鸟会会员的每一次打鸟瞬间</p>
        </div>
      </div>

      {/* 进度条 */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{
        background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.6) 0%, rgba(238, 248, 242, 0.8) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
      }}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>🎯</div>
            <span className="text-sm sm:text-base font-semibold text-gray-700">百鸟进度</span>
          </div>
          <span className="text-lg sm:text-2xl font-bold text-golf-700">{progress} <span className="text-gray-400 font-normal text-sm sm:text-base">/ 100</span></span>
        </div>
        <div className="h-3.5 sm:h-4 bg-white rounded-full overflow-hidden shadow-inner" style={{ border: '1px solid rgba(212, 238, 232, 0.8)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #1d8f4e, #3bb873)',
              boxShadow: '0 0 12px rgba(59, 184, 115, 0.4)',
            }}
          />
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2.5">
          {progress >= 100 ? '🎉 恭喜！百鸟会已完成100只鸟的记录！' : `还差 ${100 - progress} 只鸟就完成百鸟记录啦！加油 💪`}
        </p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'wall'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'wall' ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">🏆</span>百鸟墙
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'members'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'members' ? { background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)', boxShadow: '0 4px 12px rgba(19, 92, 51, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">👑</span>鸟王榜
        </button>
      </div>

      {/* 百鸟墙 */}
      {activeTab === 'wall' && (
        <>
          {sortedRecords.length === 0 ? (
            <div className="text-center py-16 rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)' }}>
              <div className="text-5xl mb-3">🐦</div>
              <p className="text-sm text-gray-400">还没有打鸟记录，快来创造历史！</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                const record = sortedRecords.find(r => r.number === num)
                const member = record ? getMemberById(record.memberId) : null

                if (record && member) {
                  return (
                    <div
                      key={num}
                      className="rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 transition-all duration-300 hover:-translate-y-0.5 card-shadow hover:card-shadow-hover"
                      style={{ background: 'rgba(255, 255, 255, 0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(212, 238, 232, 0.6)' }}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(29, 143, 78, 0.1)', color: '#135c33' }}>
                            第{num}鸟
                          </span>
                          {record.type === 'simulator' && (
                            <span className="text-[10px] sm:text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">🎯</span>
                          )}
                        </div>
                        {record.date && (
                          <span className="text-[10px] text-gray-400">{record.date}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gray-100 shadow-sm"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{member.name}</span>
                        {birdKingMap.has(member.id) && (() => {
                          const rank = birdKingMap.get(member.id)!;
                          const configs = [
                            { emoji: '🥇', label: '鸟王①', bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', text: '#92400e', border: '1px solid rgba(251, 191, 36, 0.4)', shadow: '0 1px 4px rgba(251,191,36,0.25)' },
                            { emoji: '🥈', label: '鸟王②', bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', text: '#475569', border: '1px solid rgba(148, 163, 184, 0.4)', shadow: '0 1px 4px rgba(148,163,184,0.2)' },
                            { emoji: '🥉', label: '鸟王③', bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)', text: '#9a3412', border: '1px solid rgba(249, 115, 22, 0.3)', shadow: '0 1px 4px rgba(249,115,22,0.2)' },
                          ];
                          const c = configs[rank];
                          return (
                            <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap" style={{ background: c.bg, color: c.text, border: c.border, boxShadow: c.shadow }}>
                              {c.emoji} {c.label}
                            </span>
                          );
                        })()}
                      </div>
                      {record.location && record.location !== '-' && (
                        <div className="text-[10px] sm:text-xs text-gray-500 truncate px-2 py-0.5 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.4)' }}>
                          📍 {record.location}
                        </div>
                      )}
                      {record.hole && (
                        <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                          第{record.hole}洞
                        </div>
                      )}
                    </div>
                  )
                }

                // 未解锁的鸟
                return (
                  <div
                    key={num}
                    className="rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 opacity-50 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]"
                    style={{ background: 'rgba(249, 250, 251, 0.6)', border: '1px dashed rgba(209, 213, 219, 0.5)' }}
                  >
                    <span className="text-xl sm:text-2xl text-gray-300">🥚</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 mt-1.5">
                      第{num}鸟
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* 鸟王榜 */}
      {activeTab === 'members' && (
        <>
          {memberStats.length === 0 ? (
            <div className="text-center py-16 rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)' }}>
              <div className="text-5xl mb-3">🐦</div>
              <p className="text-sm text-gray-400">还没有打鸟记录，快来创造历史！</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {memberStats.map((stat, index) => {
                const crownConfigs = [
                  { body: '#FBBF24', bodyStroke: '#D97706', jewel: '#DC2626', jewelStroke: '#B91C1C', band: '#F59E0B', bandStroke: '#B45309', numColor: '#78350F', glow: 'drop-shadow(0 1px 4px rgba(251,191,36,0.5))' },
                  { body: '#CBD5E1', bodyStroke: '#94A3B8', jewel: '#60A5FA', jewelStroke: '#3B82F6', band: '#94A3B8', bandStroke: '#64748B', numColor: '#334155', glow: 'drop-shadow(0 1px 3px rgba(148,163,184,0.45))' },
                  { body: '#F97316', bodyStroke: '#C2410C', jewel: '#FDE68A', jewelStroke: '#F59E0B', band: '#EA580C', bandStroke: '#9A3412', numColor: '#431407', glow: 'drop-shadow(0 1px 3px rgba(249,115,22,0.4))' },
                ];
                const isTop3 = index < 3;
                const crown = isTop3 ? crownConfigs[index] : null;
                const birdKingColors = [
                  { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', text: '#92400e', border: '1px solid rgba(251, 191, 36, 0.4)' },
                  { bg: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', text: '#475569', border: '1px solid rgba(148, 163, 184, 0.4)' },
                  { bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)', text: '#9a3412', border: '1px solid rgba(249, 115, 22, 0.3)' },
                ];

                return (
                <div
                  key={stat.member.id}
                  className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 card-shadow transition-all duration-300 hover:-translate-y-0.5 hover:card-shadow-hover"
                  style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      index === 0 ? 'text-white shadow-sm' :
                      index === 1 ? 'text-white shadow-sm' :
                      index === 2 ? 'text-white shadow-sm' :
                      'bg-gray-100 text-gray-500'
                    }`} style={
                      index === 0 ? { background: 'linear-gradient(135deg, #facc15, #eab308)' } :
                      index === 1 ? { background: 'linear-gradient(135deg, #9ca3af, #6b7280)' } :
                      index === 2 ? { background: 'linear-gradient(135deg, #d97706, #b45309)' } :
                      undefined
                    }>
                      {index + 1}
                    </span>
                    {/* 头像 + 前三名皇冠 */}
                    <div className={`relative flex-shrink-0 ${isTop3 ? 'mt-2' : ''}`}>
                      {isTop3 && crown && (
                        <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 z-10" style={{ filter: crown.glow }}>
                          <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-5 sm:w-8 sm:h-6">
                            <path d="M5 28L9 12L17 20L24 8L31 20L39 12L43 28H5Z" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1.5" strokeLinejoin="round"/>
                            <circle cx="9" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                            <circle cx="24" cy="6" r="3.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="1"/>
                            <circle cx="39" cy="11" r="3" fill={crown.body} stroke={crown.bodyStroke} strokeWidth="1"/>
                            <rect x="5" y="26" width="38" height="9" rx="2" fill={crown.band} stroke={crown.bandStroke} strokeWidth="1"/>
                            <text x="24" y="33.5" textAnchor="middle" fill={crown.numColor} fontSize="8.5" fontWeight="800" fontFamily="'SF Pro Display', system-ui, -apple-system, sans-serif">{index + 1}</text>
                            {index === 0 && <>
                              <circle cx="13" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                              <circle cx="35" cy="30.5" r="1.5" fill={crown.jewel} stroke={crown.jewelStroke} strokeWidth="0.6"/>
                            </>}
                          </svg>
                        </div>
                      )}
                      <img
                        src={stat.member.avatar}
                        alt={stat.member.name}
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gray-100 shadow-sm ${isTop3 ? 'ring-2 ring-offset-1 ' + (index === 0 ? 'ring-amber-300/80' : index === 1 ? 'ring-slate-300/70' : 'ring-orange-400/60') : ''}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-sm sm:text-base font-medium text-gray-800 truncate">{stat.member.name}</span>
                        {isTop3 && (() => {
                          const kingConfigs = [
                            { emoji: '🥇', label: '鸟王①', shadow: '0 1px 4px rgba(251,191,36,0.25)' },
                            { emoji: '🥈', label: '鸟王②', shadow: '0 1px 4px rgba(148,163,184,0.2)' },
                            { emoji: '🥉', label: '鸟王③', shadow: '0 1px 4px rgba(249,115,22,0.2)' },
                          ];
                          const k = kingConfigs[index];
                          return (
                            <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap" style={{ background: birdKingColors[index].bg, color: birdKingColors[index].text, border: birdKingColors[index].border, boxShadow: k.shadow }}>
                              {k.emoji} {k.label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold text-golf-600">{stat.count}</span>
                      <span className="text-xs sm:text-sm text-gray-400 ml-1">只鸟</span>
                    </div>
                  </div>
                  {/* 该会员的鸟号列表 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pl-9 sm:pl-12">
                    {stat.birdies.map(birdie => (
                      <span
                        key={birdie.number}
                        className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${
                          birdie.type === 'simulator'
                            ? 'bg-purple-50 text-purple-600 border border-purple-100'
                            : 'text-golf-600'
                        }`}
                        style={birdie.type !== 'simulator' ? { background: 'rgba(212, 238, 232, 0.5)', border: '1px solid rgba(168, 226, 191, 0.4)' } : undefined}
                      >
                        {birdie.type === 'simulator' && '🎯 '}
                        第{birdie.number}鸟
                      </span>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
