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
    <div className="animate-fade-in">
      <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-0.5 sm:mb-1">💰 会费管理</h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">查看会费和比赛支出</p>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-green-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-green-100">
          <div className="text-[10px] sm:text-xs text-green-600 mb-0.5 sm:mb-1">总收入</div>
          <div className="text-sm sm:text-lg font-bold text-green-700">¥{totalIncome.toLocaleString()}</div>
          {/* 收入构成 - 移动端简化 */}
          <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-green-200/50 text-[10px] sm:text-xs text-green-600 space-y-0.5 sm:space-y-1">
            <div className="flex justify-between">
              <span className="truncate">12位会员</span>
              <span>¥{1800 * 12}</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">托赞助</span>
              <span>¥3000</span>
            </div>
            <div className="flex justify-between">
              <span className="truncate">面赞助</span>
              <span>¥1500</span>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-red-100">
          <div className="text-[10px] sm:text-xs text-red-600 mb-0.5 sm:mb-1">总支出</div>
          <div className="text-sm sm:text-lg font-bold text-red-700">¥{totalExpense.toLocaleString()}</div>
        </div>
        <div className={`${balance >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'} rounded-lg sm:rounded-xl p-2 sm:p-3 border`}>
          <div className={`text-[10px] sm:text-xs mb-0.5 sm:mb-1 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>余额</div>
          <div className={`text-sm sm:text-lg font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>¥{balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('income')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'income'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          💵 收入记录
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'expense'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          💸 支出记录
        </button>
      </div>

      {activeTab === 'income' && (
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700">收入记录 ({membershipFees.length})</h3>
          {membershipFees.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-400 text-xs sm:text-sm">暂无收入记录</div>
          )}
          {[...membershipFees].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(fee => {
            const member = members.find(m => m.id === fee.memberId)
            return (
              <div key={fee.id} className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  {member && (
                    <img src={member.avatar} alt={member.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0" />
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
                <span className="text-xs sm:text-sm font-bold text-green-600 flex-shrink-0">+¥{fee.amount}</span>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'expense' && (
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-bold text-gray-700">支出记录 ({expenses.length})</h3>
          {expenses.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-400 text-xs sm:text-sm">暂无支出记录</div>
          )}
          {[...expenses].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(expense => {
            const tournament = tournaments.find(t => t.id === expense.tournamentId)
            const categoryLabels = { meal: '🍽️ 吃饭', prize: '🎁 奖品', other: '📦 其他' }
            return (
              <div key={expense.id} className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-2.5 sm:p-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-medium">{categoryLabels[expense.category]}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {expense.date}
                    {tournament && ` · ${tournament.name}`}
                    {expense.note && ` · ${expense.note}`}
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-red-600 flex-shrink-0">-¥{expense.amount}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
