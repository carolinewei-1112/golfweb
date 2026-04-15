
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
          <p className="text-xs sm:text-sm mt-1.5" style={{ color: 'rgba(15, 72, 40, 0.65)' }}>百鸟会高尔夫规则及奖励机制</p>
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

      {/* 高尔夫规则详解 */}
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden card-shadow" style={{ background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.5) 0%, rgba(255, 255, 255, 0.6) 100%)' }}>
          <h2 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>⛳</div>
            高尔夫规则详解
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* ======= 发球台 ======= */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #135c33 0%, #1d8f4e 100%)' }}>发球台</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '开球前球杆意外触碰球（滑落）', penalty: '免罚', action: '重新架球即可', scope: '必须有意图打球才算一杆', note: '' },
                { situation: '在发球台标志前方明显位置开球', penalty: '+2杆', action: '在正确标志后补打，扣正确地点重新开球', scope: '需回到正确位置重新开球', note: '' },
                { situation: '球OB（出界）或遗失', penalty: '+1杆', action: '回到原发球台（使用第一杆的球座标记位）', scope: '从发球台补打第三杆；建议同时打暂定球节省时间', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(212, 238, 232, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(29, 143, 78, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
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
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #2a8c4e 0%, #3a9e5c 100%)' }}>普通击球</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '改善球位（移走自然物/踩草等）', penalty: '+2杆', action: '球放回原位', scope: '落叶/石子/杂草/虫类等自然物不能移走', note: '' },
                { situation: '球陷入地面（嵌入式球）', penalty: '免罚', action: '一杆范围', scope: '球位最近完全不受影响的点，范围：一杆长度', note: '不能比基准点更靠近球洞' },
                { situation: '球在临时积水中（Casual Water）', penalty: '免罚', action: '抛球（远离积水，在不妨碍的情况下一杆范围）', scope: '基准点：最近完全不受积水影响的位，范围：一杆长度', note: '不能比基准点更靠近球洞' },
                { situation: '遗失球（打到别人的球）', penalty: '+2杆', action: '对方球放回原位，自己重新打', scope: '打出别人的球，继续打自己球', note: '' },
                { situation: '遗失球（3分钟内找不到）', penalty: '+1杆', action: '回到上一杆位重打', scope: '2023新规：找球时间从5分钟缩短为3分钟', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(212, 238, 232, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(29, 143, 78, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
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
              <span className="inline-flex items-center justify-center px-2.5 sm:px-3 h-6 sm:h-7 rounded-lg text-[10px] sm:text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #1d8f4e 0%, #22a85a 100%)' }}>果岭</span>
            </div>
            <div className="space-y-2">
              {[
                { situation: '球在果岭上被意外移动（风吹/球童/同组）', penalty: '免罚', action: '必须恢复到正确位置（恢复至打痕点）', scope: '若不知道原位则估计放回', note: '' },
                { situation: '球碰到旗杆后进洞', penalty: '免罚', action: '球碰到旗杆后进洞', scope: '2023新规：允许球碰旗杆后进洞，旧规则不允许', note: '' },
                { situation: '球悬在洞口边缘没出来', penalty: '免罚', action: '继续推，直到球全部低于洞口边缘水平线', scope: '只有球完全低于洞口边缘才算进洞', note: '' },
                { situation: '击球前用手/球杆触碰沙坑', penalty: '+1杆', action: '继续击球', scope: '不能测试沙的质地、休闲下场也应遵守', note: '' },
              ].map((rule, idx) => (
                <div key={idx} className="rounded-xl p-3 sm:p-4" style={{ background: idx % 2 === 0 ? 'rgba(212, 238, 232, 0.15)' : 'rgba(253, 246, 227, 0.15)', border: '1px solid rgba(200, 220, 210, 0.2)' }}>
                  <div className="flex flex-wrap items-start gap-2 mb-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 flex-1">{rule.situation}</span>
                    <span className={`inline-flex items-center px-2 h-5 sm:h-6 rounded-md text-[10px] sm:text-xs font-bold flex-shrink-0 ${
                      rule.penalty === '免罚' ? 'text-green-700' : rule.penalty === '+1杆' ? 'text-yellow-700' : 'text-red-700'
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(29, 143, 78, 0.1)' : rule.penalty === '+1杆' ? 'rgba(253, 246, 227, 0.5)' : 'rgba(239, 68, 68, 0.08)' }}>
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
                  <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg" style={{ background: 'rgba(245, 243, 255, 0.4)' }}><span className="text-purple-500 mt-0.5">💡</span><span><b className="text-gray-700">注意：</b>（2023新规）最常用选项2：在球后超出向旗杆区域外，不限距离</span></div>
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
                    }`} style={{ background: rule.penalty === '免罚' ? 'rgba(29, 143, 78, 0.1)' : rule.penalty === 'DQ' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)' }}>
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
          <div className="rounded-xl sm:rounded-2xl p-3.5 sm:p-4" style={{ background: 'linear-gradient(135deg, rgba(212, 238, 232, 0.3) 0%, rgba(253, 246, 227, 0.2) 100%)', border: '1px solid rgba(168, 226, 191, 0.25)' }}>
            <h4 className="text-[11px] sm:text-xs font-semibold text-gray-700 mb-2.5">📌 罚杆速查图例</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 h-5 rounded-md text-[10px] font-bold text-green-700" style={{ background: 'rgba(29, 143, 78, 0.1)' }}>免罚</span>
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
              用于安排每次月赛的聚餐🍚+奖品购置🎁，所有支出可在【会费记录】查看。
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

    </div>
  )
}
