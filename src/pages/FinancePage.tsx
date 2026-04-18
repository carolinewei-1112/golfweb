import { useState } from 'react'
import { useStore } from '../store'
import { Icon, BirdKingBadge } from '../components/Icons'

export default function FinancePage() {
  const { members, tournaments, membershipFees, expenses, birdieRecords } = useStore()
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('expense')

  // 鸟王映射：打鸟次数前3名
  const birdKingMap = (() => {
    const countMap = new Map<string, number>()
    birdieRecords.forEach(r => countMap.set(r.memberId, (countMap.get(r.memberId) || 0) + 1))
    return new Map([...countMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id], i) => [id, i]))
  })()

  // 统计
  const totalIncome = membershipFees.reduce((sum, f) => sum + f.amount, 0)
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8ccaa 0%, #8cb57a 40%, #4a7a38 80%, #3d6630 100%)',
        boxShadow: '0 4px 24px rgba(46, 79, 36, 0.15)',
      }}>
        <div className="absolute top-4 left-[10%] animate-drift">
          <div className="w-12 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-6 right-[12%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.2)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(61, 102, 48, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2 text-white drop-shadow-md">
            <span className="text-xl sm:text-2xl"><Icon name="income" className="w-6 h-6" /></span> 会费管理
          </h1>
          <p className="text-xs sm:text-sm mt-1.5 text-white/85 drop-shadow-sm">查看会费和比赛支出</p>
        </div>
      </div>

      {/* 会费说明 - 紧凑版 */}
      <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(139, 92, 246, 0.08)' }}><Icon name="people" className="w-3.5 h-3.5" /></div>
            会费说明
          </h2>
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-gray-400">
            <span className="flex items-center gap-0.5"><span className="w-3 h-3 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-[7px] flex-shrink-0">!</span>缴纳后不退</span>
            <span className="flex items-center gap-0.5"><span className="w-3 h-3 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-[7px] flex-shrink-0">!</span>缺赛不退</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(240, 243, 236, 0.6)', border: '1px solid rgba(184, 204, 170, 0.25)' }}>
            <div className="text-[9px] sm:text-[10px] text-gray-400">年会费</div>
            <div className="text-sm sm:text-base font-bold text-golf-700">¥1,800</div>
          </div>
          <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(240, 243, 236, 0.6)', border: '1px solid rgba(184, 204, 170, 0.25)' }}>
            <div className="text-[9px] sm:text-[10px] text-gray-400">有效期</div>
            <div className="text-sm sm:text-base font-bold text-gray-700">1年</div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 -mt-0.5">2026年4月 - 2027年4月</div>
          </div>
        </div>
        <div className="mt-2 text-[9px] sm:text-[10px] text-gray-400/70 text-center">
          用于月赛聚餐及奖励
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 card-shadow" style={{
          background: 'linear-gradient(135deg, rgba(240, 243, 236, 0.95) 0%, rgba(221, 228, 213, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(184, 204, 170, 0.3)',
        }}>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="income" className="w-4 h-4 sm:w-5 sm:h-5" /></div>
            <span className="text-xs sm:text-sm text-golf-600 font-medium">总收入</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-golf-700">¥{totalIncome.toLocaleString()}</div>
          {/* 收入构成 */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t text-golf-600 space-y-2.5 sm:space-y-3" style={{ borderColor: 'rgba(184, 204, 170, 0.4)' }}>
            {/* 会费 */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-golf-500 font-bold tracking-wide">会费</span>
                <span className="text-xs sm:text-sm font-bold text-golf-700">¥{(1800 * 11).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[11px] text-golf-500">
                <span className="truncate">会员 × ¥1,800</span>
                <span className="font-medium">11人</span>
              </div>
            </div>
            {/* 赞助费 */}
            <div className="space-y-1 pt-2 sm:pt-2.5 border-t" style={{ borderColor: 'rgba(184, 204, 170, 0.25)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-golf-500 font-bold tracking-wide">赞助费</span>
                <span className="text-xs sm:text-sm font-bold text-golf-700">¥{(3000 + 1500 + 500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[11px] text-golf-500">
                <span className="truncate">创始人-托</span>
                <span className="font-medium">¥3,000</span>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[11px] text-golf-500">
                <span className="truncate">宣传委员-面</span>
                <span className="font-medium">¥1,500</span>
              </div>
              <div className="flex justify-between text-[9px] sm:text-[11px] text-golf-500">
                <span className="truncate">会长-白</span>
                <span className="font-medium">¥500</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 card-shadow" style={{
          background: 'linear-gradient(135deg, rgba(254, 242, 242, 0.95) 0%, rgba(254, 226, 226, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(254, 202, 202, 0.3)',
        }}>
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)' }}><Icon name="expense" className="w-4 h-4" /></div>
            <span className="text-[10px] sm:text-xs text-red-600 font-medium">总支出</span>
          </div>
          <div className="text-sm sm:text-xl font-bold text-red-700">¥{totalExpense.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 card-shadow" style={{
          background: balance >= 0
            ? 'linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 247, 237, 0.95) 0%, rgba(254, 215, 170, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: balance >= 0 ? '1px solid rgba(147, 197, 253, 0.3)' : '1px solid rgba(253, 186, 116, 0.3)',
        }}>
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm" style={{ background: balance >= 0 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(234, 88, 12, 0.08)' }}><Icon name="chart" className="w-4 h-4" /></div>
            <span className={`text-[10px] sm:text-xs font-medium ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>余额</span>
          </div>
          <div className={`text-sm sm:text-xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>¥{balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('income')}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'income'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'income' ? { background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <Icon name="income" className="w-4 h-4" />
          <span>收入记录</span>
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'expense'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'expense' ? { background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <Icon name="expense" className="w-4 h-4" />
          <span>支出记录</span>
        </button>
      </div>

      {activeTab === 'income' && (
        <div className="space-y-2.5 sm:space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs" style={{ background: 'rgba(221, 228, 213, 0.6)', color: '#2e4f24' }}>{membershipFees.length} 条</span>
          </h3>
          {membershipFees.length === 0 && (
            <div className="text-center py-10 sm:py-12 text-gray-400 text-xs sm:text-sm rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)' }}>暂无收入记录</div>
          )}
          {(() => {
            // 按 createTime 升序排列，逐条累加余额
            const sorted = [...membershipFees].sort((a, b) => a.createTime.localeCompare(b.createTime))
            const totalExp = expenses.reduce((s, e) => s + e.amount, 0)
            const balanceMap = new Map<string, number>()
            let runningIncome = 0
            sorted.forEach(fee => {
              runningIncome += fee.amount
              balanceMap.set(fee.id, runningIncome - totalExp)
            })
            // 按 createTime 降序显示
            return sorted.reverse().map(fee => {
              const member = members.find(m => m.id === fee.memberId)
              const isSponsor = fee.type === 'sponsor'
              const curBalance = balanceMap.get(fee.id) ?? 0
              return (
                <div key={fee.id} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 card-shadow hover:card-shadow-hover" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 shadow-sm object-cover" />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate flex items-center gap-1.5">
                        {member?.name || '未知'}
                        {member && birdKingMap.has(member.id) && <BirdKingBadge rank={birdKingMap.get(member.id)!} />}
                        <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isSponsor ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                          {isSponsor ? '赞助费' : '会费'}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                        {fee.paymentDate || '—'}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                    <span className={`text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full ${isSponsor ? 'text-amber-600' : 'text-golf-600'}`} style={{ background: isSponsor ? 'rgba(251, 191, 36, 0.1)' : 'rgba(221, 228, 213, 0.5)' }}>+¥{fee.amount.toLocaleString()}</span>
                    <span className={`text-[9px] sm:text-[10px] font-medium pr-2.5 ${curBalance >= 0 ? 'text-blue-500' : 'text-orange-500'}`}>余额 ¥{curBalance.toLocaleString()}</span>
                  </div>
                </div>
              )
            })
          })()}
        </div>
      )}

      {activeTab === 'expense' && (
        <div className="space-y-2.5 sm:space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
            <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs">{expenses.length} 条</span>
          </h3>
          {expenses.length === 0 && (
            <div className="text-center py-10 sm:py-12 text-gray-400 text-xs sm:text-sm rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)' }}>暂无支出记录</div>
          )}
          {(() => {
            const totalIncome = membershipFees.reduce((s, f) => s + f.amount, 0)
            // 按 createTime 升序排列，逐条累减余额
            const sortedExp = [...expenses].sort((a, b) => a.createTime.localeCompare(b.createTime))
            const expBalanceMap = new Map<string, number>()
            let runningExpense = 0
            sortedExp.forEach(exp => {
              runningExpense += exp.amount
              expBalanceMap.set(exp.id, totalIncome - runningExpense)
            })
            return (<>{sortedExp.reverse().map(expense => {
            const tournament = tournaments.find(t => t.id === expense.tournamentId)
            const curBalance = expBalanceMap.get(expense.id) ?? 0
            const categoryLabels: Record<string, string> = { meal: '聚餐', prize: '奖品', bonus: '奖金', drink: '饮料', other: '其他' }
            const ac = '#c5e84d'
            const sw = '1.8'
            const categoryIconsSvg: Record<string, { svg: React.ReactNode; bg: string }> = {
              meal: {
                bg: 'rgba(251, 146, 60, 0.12)',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    <circle cx="12" cy="12" r="4" fill={ac}/>
                    <path d="M3 11h18M3 13h18" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <path d="M6 7c0-2.5 1.5-4 3-4s2 1 2 2.5V11" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <path d="M14 7V3M16 7V3M18 7c0-2 0-4-2-4" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <path d="M16 13v5.5a2 2 0 01-2 2h-4a2 2 0 01-2-2V13" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              drink: {
                bg: 'rgba(59, 130, 246, 0.12)',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    <rect x="9" y="12" width="6" height="5" rx="1" fill={ac}/>
                    <path d="M7 4h10l-1.5 16H8.5L7 4z" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
                    <path d="M7 9h10" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                ),
              },
              prize: {
                bg: 'rgba(168, 85, 247, 0.12)',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    <rect x="8" y="10" width="8" height="8" rx="1.5" fill={ac}/>
                    <rect x="5" y="8" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
                    <path d="M12 4v16M8 8h8" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <path d="M9 4h6" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                  </svg>
                ),
              },
              bonus: {
                bg: 'rgba(234, 179, 8, 0.12)',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    <circle cx="12" cy="12" r="4.5" fill={ac}/>
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={sw}/>
                    <path d="M12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                    <text x="12" y="15.5" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">¥</text>
                  </svg>
                ),
              },
              other: {
                bg: 'rgba(107, 114, 128, 0.12)',
                svg: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    <rect x="9" y="10" width="6" height="6" rx="1" fill={ac}/>
                    <rect x="5" y="4" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth={sw} strokeLinejoin="round"/>
                    <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth={sw} strokeLinecap="round"/>
                  </svg>
                ),
              },
            }
            const iconData = categoryIconsSvg[expense.category] || categoryIconsSvg.other
            return (
              <div key={expense.id} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 justify-between transition-all duration-200 hover:-translate-y-0.5 card-shadow hover:card-shadow-hover" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconData.bg }}>
                    {iconData.svg}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium">{categoryLabels[expense.category]}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 truncate">
                      {expense.date}
                      {tournament && ` · ${tournament.name}`}
                      {expense.note && ` · ${expense.note}`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
                    <span className="text-xs sm:text-sm font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">-¥{expense.amount}</span>
                    <span className={`text-[9px] sm:text-[10px] font-medium pr-2.5 ${curBalance >= 0 ? 'text-blue-500' : 'text-orange-500'}`}>余额 ¥{curBalance.toLocaleString()}</span>
                </div>
              </div>
            )
          })}</>)})}
        </div>
      )}
    </div>
  )
}
