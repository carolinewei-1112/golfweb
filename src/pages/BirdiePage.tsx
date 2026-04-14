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

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 渐变Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(135deg, #145730 0%, #166e3a 30%, #1a8a47 60%, #22a85a 100%)',
        boxShadow: '0 4px 20px rgba(22, 110, 58, 0.2)',
      }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(75, 198, 135, 0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, transparent 70%)' }} />
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🐦</span> 百鸟记录
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1.5">记录百鸟会会员的每一次打鸟瞬间</p>
        </div>
      </div>

      {/* 进度条 - 毛玻璃卡片 */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{
        background: 'linear-gradient(135deg, rgba(240, 250, 244, 0.95) 0%, rgba(220, 245, 230, 0.95) 100%)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(22, 110, 58, 0.1)',
      }}>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: 'rgba(22, 168, 90, 0.12)' }}>🎯</div>
            <span className="text-sm sm:text-base font-semibold text-gray-700">百鸟进度</span>
          </div>
          <span className="text-lg sm:text-2xl font-bold text-golf-700">{progress} <span className="text-gray-400 font-normal text-sm sm:text-base">/ 100</span></span>
        </div>
        <div className="h-3.5 sm:h-4 bg-white rounded-full overflow-hidden border border-golf-200/50 shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #22a85a, #4bc687)',
              boxShadow: '0 0 12px rgba(75, 198, 135, 0.4)',
            }}
          />
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2.5">
          {progress >= 100 ? '🎉 恭喜！百鸟会已完成100只鸟的记录！' : `还差 ${100 - progress} 只鸟就完成百鸟记录啦！加油 💪`}
        </p>
      </div>

      {/* Tab 切换 - 精致胶囊 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'wall'
              ? 'text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
          }`}
          style={activeTab === 'wall' ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
        >
          <span className="mr-1.5">🏆</span>百鸟墙
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'members'
              ? 'text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 card-shadow'
          }`}
          style={activeTab === 'members' ? { background: 'linear-gradient(135deg, #166e3a 0%, #22a85a 100%)', boxShadow: '0 4px 12px rgba(22, 110, 58, 0.25)' } : undefined}
        >
          <span className="mr-1.5">👥</span>个人统计
        </button>
      </div>

      {/* 百鸟墙 */}
      {activeTab === 'wall' && (
        <>
          {sortedRecords.length === 0 ? (
            <div className="text-center py-16 rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
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
                      style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(4px)', border: '1px solid rgba(22, 110, 58, 0.12)' }}
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] sm:text-xs font-bold text-golf-600 px-2 sm:px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(22, 168, 90, 0.1)' }}>
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
                      </div>
                      {record.location && record.location !== '-' && (
                        <div className="text-[10px] sm:text-xs text-gray-500 truncate bg-gray-50 px-2 py-0.5 rounded-full">
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
                    className="rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 opacity-50"
                    style={{ background: 'rgba(249, 250, 251, 0.8)', border: '1px dashed rgba(209, 213, 219, 0.6)' }}
                  >
                    <div className="flex items-center justify-center h-full min-h-[60px] sm:min-h-[80px]">
                      <span className="text-xl sm:text-2xl text-gray-300">🥚</span>
                    </div>
                    <div className="text-center text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                      第{num}鸟
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* 个人统计 */}
      {activeTab === 'members' && (
        <>
          {memberStats.length === 0 ? (
            <div className="text-center py-16 rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
              <div className="text-5xl mb-3">🐦</div>
              <p className="text-sm text-gray-400">还没有打鸟记录，快来创造历史！</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {memberStats.map((stat, index) => (
                <div
                  key={stat.member.id}
                  className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 card-shadow transition-all duration-300 hover:-translate-y-0.5 hover:card-shadow-hover"
                  style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-sm' :
                      index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    <img
                      src={stat.member.avatar}
                      alt={stat.member.name}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gray-100 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm sm:text-base font-medium text-gray-800 truncate block">{stat.member.name}</span>
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
                            : 'text-golf-600 border border-golf-100'
                        }`}
                        style={birdie.type !== 'simulator' ? { background: 'rgba(22, 168, 90, 0.06)' } : undefined}
                      >
                        {birdie.type === 'simulator' && '🎯 '}
                        第{birdie.number}鸟
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
