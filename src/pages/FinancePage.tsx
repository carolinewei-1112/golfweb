import { useState } from 'react'
import { useStore } from '../store'

export default function FinancePage() {
  const { members, tournaments, membershipFees, expenses } = useStore()
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income')

  // 统计
  const totalIncome = membershipFees.reduce((sum, f) => sum + f.amount, 0)
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8dfe8 0%, #9ed4c4 40%, #3a9e5c 80%, #2a8c4e 100%)',
        boxShadow: '0 4px 24px rgba(19, 92, 51, 0.15)',
      }}>
        <div className="absolute top-4 left-[10%] animate-drift">
          <div className="w-12 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-6 right-[12%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.2)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(42, 140, 78, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2" style={{ color: '#0f4828' }}>
            <span className="text-xl sm:text-2xl">💰</span> 会费管理
          </h1>
          <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'rgba(15, 72, 40, 0.65)' }}>查看会费和比赛支出</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 card-shadow" style={{
          background: 'linear-gradient(135deg, rgba(238, 248, 242, 0.95) 0%, rgba(212, 240, 223, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 226, 191, 0.3)',
        }}>
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>💵</div>
            <span className="text-[10px] sm:text-xs text-golf-600 font-medium">总收入</span>
          </div>
          <div className="text-sm sm:text-xl font-bold text-golf-700">¥{totalIncome.toLocaleString()}</div>
          {/* 收入构成 */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t text-[10px] sm:text-xs text-golf-600 space-y-0.5 sm:space-y-1" style={{ borderColor: 'rgba(168, 226, 191, 0.4)' }}>
            <div className="flex justify-between">
              <span className="truncate">12位会员</span>
              <span className="font-medium">¥{1800 * 12}</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">托赞助</span>
              <span className="font-medium">¥3000</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">面赞助</span>
              <span className="font-medium">¥1500</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-5 card-shadow" style={{
          background: 'linear-gradient(135deg, rgba(254, 242, 242, 0.95) 0%, rgba(254, 226, 226, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(254, 202, 202, 0.3)',
        }}>
          <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>💸</div>
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
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs sm:text-sm" style={{ background: balance >= 0 ? 'rgba(59, 130, 246, 0.08)' : 'rgba(234, 88, 12, 0.08)' }}>📊</div>
            <span className={`text-[10px] sm:text-xs font-medium ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>余额</span>
          </div>
          <div className={`text-sm sm:text-xl font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>¥{balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'income'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'income' ? { background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">💵</span>收入记录
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'expense'
              ? 'text-white shadow-md'
              : 'text-gray-600 hover:bg-white/80 card-shadow'
          }`}
          style={activeTab === 'expense' ? { background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
        >
          <span className="mr-1.5">💸</span>支出记录
        </button>
      </div>

      {activeTab === 'income' && (
        <div className="space-y-2.5 sm:space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs" style={{ background: 'rgba(212, 238, 232, 0.6)', color: '#135c33' }}>{membershipFees.length} 条</span>
          </h3>
          {membershipFees.length === 0 && (
            <div className="text-center py-10 sm:py-12 text-gray-400 text-xs sm:text-sm rounded-2xl card-shadow" style={{ background: 'rgba(255, 255, 255, 0.82)' }}>暂无收入记录</div>
          )}
          {[...membershipFees].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(fee => {
            const member = members.find(m => m.id === fee.memberId)
            return (
              <div key={fee.id} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 card-shadow hover:card-shadow-hover" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {member && (
                    <img src={member.avatar} alt={member.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex-shrink-0 shadow-sm" />
                  )}
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-medium truncate">{member?.name || '未知'}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 truncate">
                      {fee.year}年 · {fee.type === 'sponsor' ? '赞助' : '会费'}
                      {fee.paymentDate && ` · 缴费:${fee.paymentDate}`}
                      {fee.validityPeriod && ` · 有效期:${fee.validityPeriod}`}
                      {fee.note && ` · ${fee.note}`}
                    </div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-golf-600 flex-shrink-0 px-2.5 py-1 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.5)' }}>+¥{fee.amount}</span>
              </div>
            )
          })}
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
          {[...expenses].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(expense => {
            const tournament = tournaments.find(t => t.id === expense.tournamentId)
            const categoryLabels = { meal: '🍽️ 吃饭', prize: '🎁 奖品', other: '📦 其他' }
            return (
              <div key={expense.id} className="rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between transition-all duration-200 hover:-translate-y-0.5 card-shadow hover:card-shadow-hover" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-medium">{categoryLabels[expense.category]}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {expense.date}
                    {tournament && ` · ${tournament.name}`}
                    {expense.note && ` · ${expense.note}`}
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-red-600 flex-shrink-0 bg-red-50 px-2.5 py-1 rounded-full">-¥{expense.amount}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
