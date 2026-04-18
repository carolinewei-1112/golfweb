import { Icon } from '../components/Icons'

export default function RulesPage() {
  return (
    <div className="animate-fade-in space-y-5 sm:space-y-7">
      {/* 页面标题区 - 天蓝绿Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-7" style={{
        background: 'linear-gradient(180deg, #b8ccaa 0%, #8cb57a 40%, #4a7a38 80%, #4a7a38 100%)',
        boxShadow: '0 4px 24px rgba(46, 79, 36, 0.15)',
      }}>
        <div className="absolute top-3 left-[15%] animate-drift">
          <div className="w-14 h-4 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.3)' }} />
        </div>
        <div className="absolute top-6 right-[10%] animate-drift" style={{ animationDelay: '2s' }}>
          <div className="w-10 h-3 rounded-full" style={{ background: 'rgba(253, 246, 227, 0.25)' }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-10 overflow-hidden">
          <svg viewBox="0 0 800 40" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 25 Q200 5 400 20 Q600 35 800 15 L800 40 L0 40 Z" fill="rgba(61, 102, 48, 0.2)" />
          </svg>
        </div>
        <div className="relative">
          <h1 className="text-lg sm:text-2xl font-extrabold flex items-center gap-2 text-white drop-shadow-md">
            <span className="text-xl sm:text-2xl"><Icon name="scroll" className="w-6 h-6" /></span> 规则与奖励
          </h1>
          <p className="text-xs sm:text-sm mt-1.5 text-white/85 drop-shadow-sm">百鸟会高尔夫规则及奖励机制</p>
        </div>
      </div>

      {/* 月赛奖励机制 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(253, 246, 227, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(234, 179, 8, 0.12)' }}><Icon name="trophy" className="w-4 h-4" /></div>
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
              <span><Icon name="horse" className="w-4 h-4 inline-block" /></span> 进步之星（每月月赛进步系数 Top 3）
            </h3>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {[
                { medal: 'gold' as const, place: '第一名', amount: '¥600', gradient: 'from-yellow-400 to-amber-500' },
                { medal: 'silver' as const, place: '第二名', amount: '¥300', gradient: 'from-gray-300 to-gray-400' },
                { medal: 'bronze' as const, place: '第三名', amount: '¥100', gradient: 'from-amber-500 to-amber-700' },
              ].map(prize => (
                <div key={prize.place} className="rounded-xl sm:rounded-2xl p-2.5 sm:p-4 card-shadow flex flex-col items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                  <Icon name={prize.medal} className="w-8 h-8 sm:w-10 sm:h-10 mb-1.5 sm:mb-2" />
                  <div className="text-[10px] sm:text-xs text-gray-500">{prize.place}</div>
                  <div className="text-base sm:text-xl font-bold mt-1">
                    <span className="text-amber-600">{prize.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4 text-center py-1.5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
              由月赛后三名为前三名颁奖 <Icon name="gift" className="w-3.5 h-3.5 inline-block" />
            </p>
          </div>

          {/* 打鸟奖励 */}
          <div className="rounded-xl sm:rounded-2xl p-4 sm:p-5" style={{
            background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.35) 0%, rgba(184, 204, 170, 0.25) 100%)',
            border: '1px solid rgba(184, 204, 170, 0.3)',
          }}>
            <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <span><Icon name="bird" className="w-4 h-4 inline-block" /></span> 打鸟奖励
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              月赛中打出小鸟球（Birdie，即杆数低于标准杆1杆）的会员，可获得：
            </p>
            <div className="flex gap-3 sm:gap-5">
              <div className="flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 card-shadow flex flex-col items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <Icon name="golfball" className="w-8 h-8 sm:w-10 sm:h-10 mb-1.5 sm:mb-2" />
                <div className="text-xs sm:text-sm font-medium text-gray-700">一盒新球</div>
              </div>
              <div className="text-gray-300 self-center text-base font-light">或</div>
              <div className="flex-1 rounded-xl sm:rounded-2xl p-3 sm:p-4 card-shadow flex flex-col items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <Icon name="glove" className="w-8 h-8 sm:w-10 sm:h-10 mb-1.5 sm:mb-2" />
                <div className="text-xs sm:text-sm font-medium text-gray-700">一只手套</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 百鸟会算分规则 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="golf" className="w-4 h-4" /></div>
            算分规则
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 text-xs sm:text-sm text-gray-600">
          {/* 1. 差点系统 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 flex items-center gap-2.5">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)' }}>1</span>
              差点系统
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 pl-9 sm:pl-10">
              {['每场比赛差点 = 杆数 - 标准杆（72杆）', '会员平均差点 = 参与的所有比赛差点平均值', '平均差点保留一位小数，用于排行榜排序', '差点越低，表示水平越高'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-golf-400 mt-1.5 text-[8px]">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. 进步系数计算 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 flex items-center gap-2.5">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)' }}>2</span>
              进步系数计算
            </h3>

            <div className="pl-9 sm:pl-10 space-y-3">
              {/* 公式区 */}
              <div className="rounded-xl sm:rounded-2xl p-3.5 sm:p-4" style={{
                background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.3) 0%, rgba(253, 246, 227, 0.2) 100%)',
                border: '1px solid rgba(184, 204, 170, 0.3)',
              }}>
                {/* 最终公式 S */}
                <div className="flex items-center justify-center py-2.5 sm:py-3 px-3 rounded-xl mb-2.5" style={{ background: 'rgba(255, 255, 255, 0.7)' }}>
                  <div className="text-center">
                    <div className="text-sm sm:text-lg font-bold text-gray-800 font-mono tracking-wide">
                      S = (X - Y) × R
                    </div>
                    <div className="mt-1.5 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[10px] sm:text-xs text-gray-500">
                      <span><b className="text-gray-700">X</b> = 近6场平均杆数</span>
                      <span><b className="text-gray-700">Y</b> = 本场杆数</span>
                      <span><b className="text-gray-700">R</b> = 进步因子</span>
                    </div>
                  </div>
                </div>
                {/* 进步因子 R 公式 */}
                <div className="flex items-center justify-center py-2 px-3 rounded-lg mb-2.5" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-center">
                    <div className="text-[11px] sm:text-xs text-gray-500 mb-1">进步因子 R 的计算：</div>
                    <div className="text-xs sm:text-sm font-bold text-gray-700 font-mono">
                      R = (72/X)<sup className="text-[8px] sm:text-[10px]">3</sup> × (1 + (72/X)<sup className="text-[8px] sm:text-[10px]">10</sup>) × 10
                    </div>
                  </div>
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                  <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span>S {'>'} 0 表示<b className="text-golf-700">进步</b>，S {'<'} 0 表示<b className="text-red-500">退步</b></span></div>
                  <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span>杆数越低 R 值越大，低杆选手每进步1杆获得更高系数</span></div>
                </div>
              </div>

              {/* 进步因子 R 曲线图 */}
              <div className="rounded-xl p-2.5 sm:p-3" style={{ background: 'rgba(255, 255, 255, 0.7)', border: '1px solid rgba(184, 204, 170, 0.2)' }}>
                <div className="text-[10px] sm:text-xs font-bold text-gray-600 mb-1.5 text-center">进步因子 R 曲线</div>
                <div className="relative" style={{ paddingBottom: '50%' }}>
                  <svg viewBox="0 0 400 210" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <rect x="45" y="10" width="345" height="175" rx="4" fill="rgba(248, 250, 246, 0.8)" />
                    {/* Y轴 */}
                    {[0, 5, 10, 15, 20].map(v => {
                      const y = 185 - (v / 22) * 170
                      return (
                        <g key={v}>
                          <text x="42" y={y + 3} textAnchor="end" fill="#9ca3af" fontSize="8">{v}</text>
                          <line x1="45" y1={y} x2="390" y2={y} stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray={v === 0 ? '0' : '3,3'} />
                        </g>
                      )
                    })}
                    {/* X轴 */}
                    {[130, 115, 100, 90, 80, 72].map(v => {
                      const x = 55 + ((130 - v) / (130 - 72)) * 335
                      return <text key={v} x={x} y="200" textAnchor="middle" fill="#9ca3af" fontSize="8">{v}</text>
                    })}
                    <text x="215" y="210" textAnchor="middle" fill="#6b7280" fontSize="7.5" fontWeight="bold">平均杆数 (X)</text>
                    {/* 曲线 */}
                    <path d={(() => {
                      const pts: string[] = []
                      for (let x = 130; x >= 72; x -= 0.5) {
                        const ratio = 72 / x
                        const r = Math.pow(ratio, 3) * (1 + Math.pow(ratio, 10)) * 10
                        const px = 55 + ((130 - x) / (130 - 72)) * 335
                        const py = 185 - Math.min(r, 22) / 22 * 170
                        pts.push(`${pts.length === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`)
                      }
                      return pts.join(' ')
                    })()} fill="none" stroke="#4e7e3a" strokeWidth="2.5" strokeLinecap="round" />
                    <path d={(() => {
                      const pts: string[] = []
                      for (let x = 130; x >= 72; x -= 0.5) {
                        const ratio = 72 / x
                        const r = Math.pow(ratio, 3) * (1 + Math.pow(ratio, 10)) * 10
                        const px = 55 + ((130 - x) / (130 - 72)) * 335
                        const py = 185 - Math.min(r, 22) / 22 * 170
                        pts.push(`${pts.length === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`)
                      }
                      pts.push('L390,185 L55,185 Z')
                      return pts.join(' ')
                    })()} fill="url(#cGrad)" opacity="0.25" />
                    <defs>
                      <linearGradient id="cGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4e7e3a" />
                        <stop offset="100%" stopColor="#4e7e3a" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* 关键点 */}
                    {[
                      { x: 100, rVal: 3.87 },
                      { x: 90, rVal: 5.67 },
                      { x: 80, rVal: 9.83 },
                    ].map(pt => {
                      const px = 55 + ((130 - pt.x) / (130 - 72)) * 335
                      const py = 185 - Math.min(pt.rVal, 22) / 22 * 170
                      return (
                        <g key={pt.x}>
                          <circle cx={px} cy={py} r="3" fill="#4e7e3a" stroke="white" strokeWidth="1.5" />
                          <text x={px} y={py - 7} textAnchor="middle" fill="#4e7e3a" fontSize="7.5" fontWeight="bold">{pt.rVal}</text>
                          <text x={px} y={py + 12} textAnchor="middle" fill="#9ca3af" fontSize="6.5">{pt.x}杆</text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* 夺冠参考 */}
              <div className="text-[11px] sm:text-xs text-gray-500 rounded-lg px-3 py-2" style={{ background: 'rgba(221, 228, 213, 0.2)' }}>
                <span className="font-bold text-gray-700">夺冠参考：</span>按经验 S ≈ 30 可夺冠，如平均100杆需打到92杆，平均110杆需打到99杆
              </div>
            </div>
          </div>

          {/* 3. TEE台规则 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2.5 flex items-center gap-2.5">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)' }}>3</span>
              TEE台规则
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 pl-9 sm:pl-10">
              {['男士：前6场月赛打白TEE，第7场起打蓝TEE', '女士：始终打红TEE'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-golf-400 mt-1.5 text-[8px]">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 高尔夫规则详解 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.5) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(78, 126, 58, 0.1)' }}><Icon name="golf" className="w-4 h-4" /></div>
            高尔夫规则详解
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* ======= 发球台 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)' }}>发球台</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '开球前球杆意外触碰球（滑落）', penalty: '免罚', action: '重新架球即可', scope: '必须有意图打球才算一杆', note: '' },
                { situation: '在发球台标志前方明显位置开球', penalty: '+2杆', action: '在正确标志后补打，扣正确地点重新开球', scope: '需回到正确位置重新开球', note: '' },
                { situation: '球OB（出界）或遗失', penalty: '+1杆', action: '回到原发球台（使用第一杆的球座标记位）', scope: '从发球台补打第三杆；建议同时打暂定球节省时间', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(221, 228, 213, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(78, 126, 58, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">说明：</b>{rule.scope}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======= 普通击球 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #4a7a38 0%, #4a7a38 100%)' }}>普通击球</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '改善球位（移走自然物/踩草等）', penalty: '+2杆', action: '球放回原位', scope: '落叶/石子/杂草/虫类等自然物不能移走', note: '' },
                { situation: '球陷入地面（嵌入式球）', penalty: '免罚', action: '一杆范围', scope: '球位最近完全不受影响的点，范围：一杆长度', note: '不能比基准点更靠近球洞' },
                { situation: '球在临时积水中（Casual Water）', penalty: '免罚', action: '抛球（远离积水，在不妨碍的情况下一杆范围）', scope: '基准点：最近完全不受积水影响的位，范围：一杆长度', note: '不能比基准点更靠近球洞' },
                { situation: '遗失球（打到别人的球）', penalty: '+2杆', action: '对方球放回原位，自己重新打', scope: '打出别人的球，继续打自己球', note: '' },
                { situation: '遗失球（3分钟内找不到）', penalty: '+1杆', action: '回到上一杆位重打', scope: '2023新规：找球时间从5分钟缩短为3分钟', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(221, 228, 213, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(78, 126, 58, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">说明：</b>{rule.scope}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======= 果岭 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #4e7e3a 0%, #5a8e42 100%)' }}>果岭</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '球在果岭上被意外移动（风吹/球童/同组）', penalty: '免罚', action: '必须恢复到正确位置（恢复至打痕点）', scope: '若不知道原位则估计放回', note: '' },
                { situation: '球碰到旗杆后进洞', penalty: '免罚', action: '球碰到旗杆后进洞', scope: '2023新规：允许球碰旗杆后进洞，旧规则不允许', note: '' },
                { situation: '球悬在洞口边缘没出来', penalty: '免罚', action: '继续推，直到球全部低于洞口边缘水平线', scope: '只有球完全低于洞口边缘才算进洞', note: '' },
                { situation: '击球前用手/球杆触碰沙坑', penalty: '+1杆', action: '继续击球', scope: '不能测试沙的质地、休闲下场也应遵守', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(221, 228, 213, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(78, 126, 58, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-golf-500 mt-0.5">▸</span><span><b className="text-gray-700">说明：</b>{rule.scope}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======= 沙坑 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #a16207 0%, #ca8a04 100%)' }}>沙坑</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '打完沙坑不耙平翻砂', penalty: '无', action: '耙平后继续比赛', scope: '礼仪要求，休闲下场也应遵守', note: '' },
                { situation: '沙坑内宣布不打', penalty: '+1杆', action: '三种选择：①回上一杆位 ②一杆范围抛球 ③两杆范围抛球处（全部在沙坑内）', scope: '选2/3不能比球到旗杆距离更短/远重测', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(253, 246, 227, 0.2)' : 'rgba(253, 246, 227, 0.1)', border: '1px solid rgba(238, 220, 179, 0.25)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '无' ? 'text-gray-500' : 'text-yellow-700'
                    }`} style={{ background: rule.penalty === '无' ? 'rgba(200, 200, 200, 0.2)' : 'rgba(253, 246, 227, 0.5)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-amber-500 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-amber-500 mt-0.5">▸</span><span><b className="text-gray-700">说明：</b>{rule.scope}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======= 水障碍区 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #1e6cb5 0%, #2a9df4 100%)' }}>水障碍区</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '球进正面水障碍区（黄色标桩）', penalty: '+1杆', action: '方式A：回上一杆位重打；方式B：从入水后方抛球（2杆范围内）', scope: '球最后越过黄色标桩点为基准点', note: '选方式B从基准线往后方向，不限距离' },
                { situation: '球进侧面水障碍区（红色标桩）', penalty: '+1杆', action: '①回上一杆位；方式A：最近入水区域内抛球（2杆范围）；方式C：在水区域内照打', scope: '界限最后越过红色标桩点、方向无范围', note: '球最后越过水障线的点为基准' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(219, 234, 254, 0.25)' : 'rgba(219, 234, 254, 0.15)', border: '1px solid rgba(147, 197, 253, 0.25)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className="inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 text-yellow-700" style={{ background: 'rgba(253, 246, 227, 0.5)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    <div className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">▸</span><span><b className="text-gray-700">范围：</b>{rule.scope}</span></div>
                    {rule.note && <div className="flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">▸</span><span><b className="text-gray-700">补充：</b>{rule.note}</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======= 不可打之球 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)' }}>不可打之球</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl p-3 sm:p-4" style={{ background: 'rgba(245, 243, 255, 0.25)', border: '1px solid rgba(196, 181, 253, 0.25)' }}>
                <div className="flex flex-wrap items-start gap-2 mb-1.5">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">球员可在球场任何位置（不含水障碍区）宣布不可打</span>
                  <span className="inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 text-yellow-700" style={{ background: 'rgba(253, 246, 227, 0.5)' }}>+1杆</span>
                </div>
                <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                  <div className="flex items-start gap-1.5"><span className="text-purple-500 mt-0.5">▸</span><span><b className="text-gray-700">选项1：</b>回上一杆位重打（必须选择这个方案）</span></div>
                  <div className="flex items-start gap-1.5"><span className="text-purple-500 mt-0.5">▸</span><span><b className="text-gray-700">选项2：</b>一杆范围抛球（3杆后站球在区域内抛球，4球落去方向区域）（必须选择往远方向）</span></div>
                  <div className="flex items-start gap-1.5"><span className="text-purple-500 mt-0.5">▸</span><span><b className="text-gray-700">选项3：</b>2杆范围，在球后站在球和旗杆方向区域，不限距离</span></div>
                  <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg" style={{ background: 'rgba(245, 243, 255, 0.4)' }}><span className="text-purple-500 mt-0.5"><Icon name="bulb" className="w-4 h-4 inline-block" /></span><span><b className="text-gray-700">注意：</b>（2023新规）最常用选项2：在球后超出向旗杆区域外，不限距离</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ======= 其他规则 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' }}>其他规则</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '球碰到自身体/装备（意外）', penalty: '免罚', action: '抛球（一杆范围）', scope: '基准点：最近完全不受影响位置，范围：一杆长度', note: '' },
                { situation: '球碰到球车/人行道等标的物上', penalty: '免罚', action: '抛球（一杆范围）', scope: '基准点：最近完全不受影响位置，范围：一杆长度', note: '' },
                { situation: '球碰到/长草区宣布不打', penalty: '免罚', action: '球放到最近点', scope: '若球已开始移动到正常草皮可重新丢球', note: '' },
                { situation: '超过15支球杆，过程中10分钟内换球杆', penalty: '+2杆', action: '替换球杆', scope: '不能比基准点更靠近球洞', note: '' },
                { situation: '迟到10分钟以上', penalty: 'DQ', action: '取消比赛资格', scope: '', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(243, 244, 246, 0.3)' : 'rgba(243, 244, 246, 0.15)', border: '1px solid rgba(229, 231, 235, 0.3)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === 'DQ' ? 'text-red-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(78, 126, 58, 0.1)' : rule.penalty === 'DQ' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)' }}>
                      {rule.penalty}
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-600 space-y-1">
                    <div className="flex items-start gap-1.5"><span className="text-gray-400 mt-0.5">▸</span><span><b className="text-gray-700">处理：</b>{rule.action}</span></div>
                    {rule.scope && <div className="flex items-start gap-1.5"><span className="text-gray-400 mt-0.5">▸</span><span><b className="text-gray-700">说明：</b>{rule.scope}</span></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 罚杆速查图例 */}
          <div className="rounded-xl sm:rounded-2xl p-3.5 sm:p-4" style={{ background: 'linear-gradient(135deg, rgba(221, 228, 213, 0.3) 0%, rgba(253, 246, 227, 0.2) 100%)', border: '1px solid rgba(184, 204, 170, 0.25)' }}>
            <h4 className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-2.5"><Icon name="pushpin" className="w-3.5 h-3.5 inline-block" /> 罚杆速查图例</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 h-5 rounded-md text-[10px] font-bold text-green-700" style={{ background: 'rgba(78, 126, 58, 0.1)' }}>免罚</span>
                <span className="text-[10px] sm:text-xs text-gray-500">无需罚杆</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 h-5 rounded-md text-[10px] font-bold text-yellow-700" style={{ background: 'rgba(253, 246, 227, 0.5)' }}>+1杆</span>
                <span className="text-[10px] sm:text-xs text-gray-500">罚一杆</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 h-5 rounded-md text-[10px] font-bold text-red-700" style={{ background: 'rgba(239, 68, 68, 0.08)' }}>+2杆</span>
                <span className="text-[10px] sm:text-xs text-gray-500">罚两杆</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 h-5 rounded-md text-[10px] font-bold text-red-700" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>DQ</span>
                <span className="text-[10px] sm:text-xs text-gray-500">取消资格</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
