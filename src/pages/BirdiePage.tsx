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
    <div className="animate-fade-in">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">🐦 百鸟记录</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">记录百鸟会会员的每一次打鸟瞬间</p>
      </div>

      {/* 进度条 */}
      <div className="bg-gradient-to-r from-golf-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 border border-golf-100">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium text-gray-700">百鸟进度</span>
          <span className="text-base sm:text-lg font-bold text-golf-700">{progress} / 100</span>
        </div>
        <div className="h-3 sm:h-4 bg-white rounded-full overflow-hidden border border-golf-200">
          <div
            className="h-full bg-gradient-to-r from-golf-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
          {progress >= 100 ? '🎉 恭喜！百鸟会已完成100只鸟的记录！' : `还差 ${100 - progress} 只鸟就完成百鸟记录啦！`}
        </p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'wall'
              ? 'bg-golf-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🏆 百鸟墙
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'members'
              ? 'bg-golf-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          👥 个人统计
        </button>
      </div>

      {/* 百鸟墙 */}
      {activeTab === 'wall' && (
        <>
          {sortedRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">🐦</div>
              <p className="text-sm">还没有打鸟记录，快来创造历史！</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                const record = sortedRecords.find(r => r.number === num)
                const member = record ? getMemberById(record.memberId) : null

                if (record && member) {
                  return (
                    <div
                      key={num}
                      className="bg-white rounded-lg sm:rounded-xl border border-golf-200 p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] sm:text-xs font-bold text-golf-600 bg-golf-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                            第{num}鸟
                          </span>
                          {record.type === 'simulator' && (
                            <span className="text-[10px] sm:text-xs bg-purple-100 text-purple-600 px-1 py-0.5 rounded-full">🎯</span>
                          )}
                        </div>
                        {record.date && (
                          <span className="text-[10px] text-gray-400">{record.date}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{member.name}</span>
                      </div>
                      {record.location && record.location !== '-' && (
                        <div className="text-[10px] sm:text-xs text-gray-500 truncate">
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
                    className="bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100 p-2 sm:p-3 opacity-60"
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
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-2">🐦</div>
              <p className="text-sm">还没有打鸟记录，快来创造历史！</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {memberStats.map((stat, index) => (
                <div
                  key={stat.member.id}
                  className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    <img
                      src={stat.member.avatar}
                      alt={stat.member.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm sm:text-base font-medium text-gray-800 truncate">{stat.member.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold text-golf-600">{stat.count}</span>
                      <span className="text-xs sm:text-sm text-gray-400 ml-1">只鸟</span>
                    </div>
                  </div>
                  {/* 该会员的鸟号列表 */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pl-8 sm:pl-10">
                    {stat.birdies.map(birdie => (
                      <span
                        key={birdie.number}
                        className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                          birdie.type === 'simulator'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-golf-50 text-golf-600'
                        }`}
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
