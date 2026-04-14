import { Link } from 'react-router-dom'

export default function RulesPage() {
  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8dfe8 0%, #9ed4c4 40%, #3a9e5c 80%, #2a8c4e 100%)',
        boxShadow: '0 4px 24px rgba(19, 92, 51, 0.15)',
      }}>
        <div className="absolute top-3 left-[15%] animate-drift">
          <div className="w-14 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-6 right-[10%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.25)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(42, 140, 78, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2" style={{ color: '#0f4828' }}>
            <span className="text-xl sm:text-2xl">📜</span> 规则与奖励
          </h1>
          <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'rgba(15, 72, 40, 0.65)' }}>百鸟会高尔夫巡回赛规则及奖励机制</p>
        </div>
      </div>

      {/* 月赛奖励机制 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(253, 246, 227, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(234, 179, 8, 0.12)' }}>🏆</div>
            月赛奖励机制
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* 进步之星奖励 */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5" style={{
            background: 'linear-gradient(135deg, rgba(253, 246, 227, 0.35) 0%, rgba(245, 234, 208, 0.25) 100%)',
            border: '1px solid rgba(238, 220, 179, 0.3)',
          }}>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <span>🐎</span> 进步之星（每月月赛进步系数 Top 3）
            </h3>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {[
                { medal: '🥇', place: '第一名', amount: '¥600', gradient: 'from-yellow-400 to-amber-500' },
                { medal: '🥈', place: '第二名', amount: '¥300', gradient: 'from-gray-300 to-gray-400' },
                { medal: '🥉', place: '第三名', amount: '¥100', gradient: 'from-amber-500 to-amber-700' },
              ].map(prize => (
                <div key={prize.place} className="rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center card-shadow" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{prize.medal}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{prize.place}</div>
                  <div className="text-base sm:text-xl font-bold mt-1">
                    <span className="text-amber-600">{prize.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4 text-center py-1.5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
              由月赛后三名为前三名颁奖 🎁
            </p>
          </div>

          {/* 打鸟奖励 */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5" style={{
            background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.35) 0%, rgba(168, 226, 191, 0.25) 100%)',
            border: '1px solid rgba(168, 226, 191, 0.3)',
          }}>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <span>🐦</span> 打鸟奖励
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              月赛中打出小鸟球（Birdie，即杆数低于标准杆1杆）的会员，可获得：
            </p>
            <div className="flex gap-3 sm:gap-5">
              <div className="flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center card-shadow" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">🏌️</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">一盒新球</div>
              </div>
              <div className="text-gray-300 self-center text-base font-light">或</div>
              <div className="flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center card-shadow" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">🧤</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">一只手套</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 百鸟会算分规则 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>⛳</div>
            算分规则
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 text-xs sm:text-sm text-gray-600">
          {[
            {
              num: '1',
              title: '差点系统',
              items: [
                '每场比赛差点 = 杆数 - 标准杆（72杆）',
                '会员平均差点 = 参与的所有比赛差点平均值',
                '平均差点保留一位小数，用于排行榜排序',
                '差点越低，表示水平越高',
              ],
            },
            {
              num: '2',
              title: '进步系数计算',
              items: [
                <span key="formula">公式：<span className="px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-medium" style={{ background: 'rgba(212, 238, 232, 0.6)', color: '#135c33' }}>(历史6场平均成绩 - 本场成绩) × 进步因子</span></span>,
                '进步系数为正数表示进步，负数表示退步',
                '进步系数数值越大，表示进步越明显',
              ],
            },
            {
              num: '3',
              title: 'TEE台规则',
              items: [
                '男士：前6场月赛打白TEE，第7场起打蓝TEE',
                '女士：始终打红TEE',
              ],
            },
          ].map(section => (
            <div key={section.num}>
              <h3 className="font-semibold text-gray-800 mb-2.5 flex items-center gap-2.5">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)' }}>{section.num}</span>
                {section.title}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 pl-9 sm:pl-10">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-golf-400 mt-1.5 text-[8px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 违规与罚杆速查表 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(254, 242, 242, 0.5) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>⚠️</div>
            违规与罚杆速查表
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr style={{ background: 'rgba(212, 238, 232, 0.25)' }} className="text-gray-500">
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-medium border-b border-gray-100 w-[60px] sm:w-[100px]">类别</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-medium border-b border-gray-100 min-w-[120px]">常见情形</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-medium border-b border-gray-100 w-[60px] sm:w-[90px]">处罚</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-medium border-b border-gray-100 min-w-[100px]">核心动作</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {/* 罚 1 杆 - 补救/程序 */}
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3 align-top" rowSpan={6}>
                  <span className="inline-flex items-center justify-center px-2 sm:px-2.5 h-5 sm:h-6 rounded-lg text-[10px] sm:text-xs font-bold" style={{ background: 'rgba(253, 246, 227, 0.5)', color: '#a16207' }}>罚1杆</span>
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">界外球 (OB) / 丢球</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">返回原位重打</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">进入处罚区 (水/障碍)</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">在补救区抛球</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">宣布"不可打之球"</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">选择抛球补救</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">提起球前未标记</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">放回原位重新标记</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">触动自然物导致球移动</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">须放回原位</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-3 sm:px-4 py-2 sm:py-3">意外动球未放回</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-yellow-700 font-medium">罚 1 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">知情不报或未复位</td>
              </tr>
              {/* 罚 2 杆 - 一般处罚 */}
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3 align-top" rowSpan={4}>
                  <span className="inline-flex items-center justify-center px-2 sm:px-2.5 h-5 sm:h-6 rounded-lg text-[10px] sm:text-xs font-bold" style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#b91c1c' }}>罚2杆</span>
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">击错球</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">误打他人的球</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">果岭撞球</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">双方球均在果岭时相撞</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">在错误地点打球</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">抛球位置不规范</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-3 sm:px-4 py-2 sm:py-3">违规寻求/提供建议</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-red-700 font-medium">罚 2 杆</td>
                <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-500">询问非球童的建议</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 百鸟会入会会费 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.5) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(139, 92, 246, 0.08)' }}>👥</div>
            会费说明
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-xs sm:text-sm text-gray-600">
          <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4" style={{ background: 'linear-gradient(135deg, rgba(245, 243, 255, 0.3) 0%, rgba(237, 233, 254, 0.2) 100%)', border: '1px solid rgba(196, 181, 253, 0.2)' }}>
            <h4 className="font-medium text-gray-800 mb-1.5 flex items-center gap-1.5">
              <span className="text-purple-500">💡</span> 会费用途
            </h4>
            <p className="text-gray-600 text-xs sm:text-sm">
              用于安排每次月赛的聚餐🍚+奖品购置🎁，所有支出可在【会费管理】查看。
            </p>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100/80">
            <span className="text-gray-700 font-medium">年会费</span>
            <span className="text-lg sm:text-xl font-bold text-golf-700">¥1,800</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100/80">
            <span className="text-gray-700 font-medium">有效期</span>
            <span className="text-xs sm:text-sm text-gray-600 px-3 py-1 rounded-full" style={{ background: 'rgba(212, 238, 232, 0.4)' }}>12个月</span>
          </div>
          <div className="mt-2 sm:mt-3">
            <h4 className="font-medium text-gray-800 mb-2.5">注意</h4>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">!</span>
                <span>缴纳会费后不能退</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">!</span>
                <span>不参加月赛亦不退</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速导航 */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 card-shadow" style={{
        background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.5) 0%, rgba(238, 248, 242, 0.6) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(168, 226, 191, 0.3)',
      }}>
        <h3 className="font-bold text-gray-800 mb-3.5 flex items-center gap-2 text-sm sm:text-base">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>🔗</div>
          快速导航
        </h3>
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {[
            { to: '/ranking', label: '🏆 查看排行榜' },
            { to: '/history', label: '📋 历史比赛' },
            { to: '/', label: '🏠 返回首页' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-golf-700 font-medium card-shadow hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.85)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
