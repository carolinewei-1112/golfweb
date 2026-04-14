import { Link } from 'react-router-dom'

export default function RulesPage() {
  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6">
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">📜 规则与奖励</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">百鸟会高尔夫巡回赛规则及奖励机制</p>
      </div>

      {/* 月赛奖励机制 */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-white">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🏆</span> 月赛奖励机制
          </h2>
        </div>
        <div className="p-4 sm:p-5 space-y-4">
          {/* 进步之星奖励 */}
          <div className="bg-gradient-to-r from-gold-50 via-yellow-50 to-gold-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-200">
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <span>🐎</span> 进步之星（每月月赛进步系数 Top 3）
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-sm">
                <div className="text-xl sm:text-2xl mb-1">🥇</div>
                <div className="text-[10px] sm:text-xs text-gray-500">第一名</div>
                <div className="text-base sm:text-lg font-bold text-amber-600">¥600</div>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-sm">
                <div className="text-xl sm:text-2xl mb-1">🥈</div>
                <div className="text-[10px] sm:text-xs text-gray-500">第二名</div>
                <div className="text-base sm:text-lg font-bold text-gray-600">¥300</div>
              </div>
              <div className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-sm">
                <div className="text-xl sm:text-2xl mb-1">🥉</div>
                <div className="text-[10px] sm:text-xs text-gray-500">第三名</div>
                <div className="text-base sm:text-lg font-bold text-amber-700">¥100</div>
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3 text-center">
              由月赛后三名为前三名颁奖 🎁
            </p>
          </div>

          {/* 打鸟奖励 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200">
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              <span>🐦</span> 打鸟奖励
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              月赛中打出小鸟球（Birdie，即杆数低于标准杆1杆）的会员，可获得：
            </p>
            <div className="flex gap-2 sm:gap-4">
              <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏌️</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">一盒新球</div>
              </div>
              <div className="text-gray-400 self-center text-sm">或</div>
              <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🧤</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">一只手套</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 百鸟会算分规则 */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-golf-50 to-white">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <span>⛳</span> 算分规则
          </h2>
        </div>
        <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 text-xs sm:text-sm text-gray-600">
          <div>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-[10px] sm:text-xs">1</span>
              差点系统
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 list-disc list-inside pl-2">
              <li>每场比赛差点 = 杆数 - 标准杆（72杆）</li>
              <li>会员平均差点 = 参与的所有比赛差点平均值</li>
              <li>平均差点保留一位小数，用于排行榜排序</li>
              <li>差点越低，表示水平越高</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-[10px] sm:text-xs">2</span>
              进步系数计算
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 list-disc list-inside pl-2">
              <li>公式：<span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] sm:text-xs">(历史6场平均成绩 - 本场成绩) × 进步因子</span></li>
              <li>进步系数为正数表示进步，负数表示退步</li>
              <li>进步系数数值越大，表示进步越明显</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-[10px] sm:text-xs">3</span>
              TEE台规则
            </h3>
            <ul className="space-y-1 sm:space-y-1.5 list-disc list-inside pl-2">
              <li>男士：前6场月赛打白TEE，第7场起打蓝TEE</li>
              <li>女士：始终打红TEE</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 违规与罚杆速查表 */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <span>⚠️</span> 违规与罚杆速查表
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium border-b border-gray-100 w-[60px] sm:w-[100px]">类别</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium border-b border-gray-100 min-w-[120px]">常见情形</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium border-b border-gray-100 w-[60px] sm:w-[90px]">处罚</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium border-b border-gray-100 min-w-[100px]">核心动作</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {/* 罚 1 杆 - 补救/程序 */}
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3 align-top" rowSpan={6}>
                  <span className="inline-flex items-center justify-center w-8 sm:w-10 h-5 sm:h-6 rounded bg-yellow-100 text-yellow-700 text-[10px] sm:text-xs font-bold">罚1杆</span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">界外球 (OB) / 丢球</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">返回原位重打</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">进入处罚区 (水/障碍)</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">在补救区抛球</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">宣布"不可打之球"</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">选择抛球补救</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">提起球前未标记</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">放回原位重新标记</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">触动自然物导致球移动</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">须放回原位</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-2 sm:px-4 py-2 sm:py-3">意外动球未放回</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">知情不报或未复位</td>
              </tr>
              {/* 罚 2 杆 - 一般处罚 */}
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3 align-top" rowSpan={4}>
                  <span className="inline-flex items-center justify-center w-8 sm:w-10 h-5 sm:h-6 rounded bg-red-100 text-red-700 text-[10px] sm:text-xs font-bold">罚2杆</span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">击错球</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">误打他人的球</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">果岭撞球</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">双方球均在果岭时相撞</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">在错误地点打球</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">抛球位置不规范</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">违规寻求/提供建议</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">询问非球童的建议</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>



      {/* 百鸟会入会会费 */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2">
            <span>👥</span> 会费说明
          </h2>
        </div>
        <div className="p-4 sm:p-5 space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-600">
          <div className="bg-purple-50 rounded-lg p-2 sm:p-3">
            <h4 className="font-medium text-gray-800 mb-1">会费用途</h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              用于安排每次月赛的聚餐🍚+奖品购置🎁，所有支出可在【会费管理】查看。
            </p>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-700">年会费</span>
            <span className="text-base sm:text-lg font-bold text-golf-700">¥1,800</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-700">有效期</span>
            <span className="text-xs sm:text-sm text-gray-600">12个月</span>
          </div>
          <div className="mt-2 sm:mt-3">
            <h4 className="font-medium text-gray-800 mb-2">注意</h4>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>缴纳会费后不能退</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span>不参加月赛亦不退</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速导航 */}
      <div className="bg-gradient-to-r from-golf-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-golf-200 p-4 sm:p-5">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm sm:text-base">
          <span>🔗</span> 快速导航
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Link to="/ranking" className="px-3 sm:px-4 py-2 bg-white rounded-lg text-xs sm:text-sm text-golf-700 shadow-sm hover:shadow transition-shadow">
            🏆 查看排行榜
          </Link>
          <Link to="/history" className="px-3 sm:px-4 py-2 bg-white rounded-lg text-xs sm:text-sm text-golf-700 shadow-sm hover:shadow transition-shadow">
            📋 历史比赛
          </Link>
          <Link to="/" className="px-3 sm:px-4 py-2 bg-white rounded-lg text-xs sm:text-sm text-golf-700 shadow-sm hover:shadow transition-shadow">
            🏠 返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
