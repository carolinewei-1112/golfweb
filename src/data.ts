// ============ COS 图片代理 ============
// 通过 Vite proxy / Nginx 代理将 COS 图片转为同源请求，解决截图跨域问题
// COS 源站: https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com

const COS_PROXY_PREFIX = '/cos-images';

/** 将 COS 绝对 URL 转为同源代理路径 */
export function cosUrl(path: string): string {
  return `${COS_PROXY_PREFIX}${path}`;
}

// ============ 类型定义 ============

export interface Member {
  id: string;
  name: string;
  realName?: string;
  nickname?: string;
  gender: '男' | '女';
  joinDate: string;
  initialHandicap: number;
  avatar: string;
  background?: string;
  tee?: string;
}

/** 获取会员的TEE类型
 * 前6场月赛：男士白TEE，女士红TEE
 * 第7场起：男士蓝TEE，女士红TEE
 */
export function getMemberTee(member: Member, gameCount: number = 0): string {
  if (member.gender === '男') {
    // 男士：前6场白TEE，之后蓝TEE
    return gameCount < 6 ? '白TEE' : '蓝TEE';
  } else {
    // 女士：始终红TEE
    return '红TEE';
  }
}

export interface Tournament {
  id: string;
  name: string;
  courseName: string;
  date: string;
  slope: number;
  rating: number;
  image?: string;
}

export interface ScoreEntry {
  memberId: string;
  grossScore: number;
  putts: number;
}

export interface Game {
  tournamentId: string;
  scores: ScoreEntry[];
  photos?: string[]; // 比赛照片URL列表
}

// 百鸟记录（打鸟记录）
export interface BirdieRecord {
  id: string;
  number: number; // 第几只鸟，从1到100
  memberId: string; // 打鸟人ID
  location: string; // 地点/球场
  date?: string; // 日期（可选）
  hole?: number; // 洞号（可选）
  note?: string; // 备注（可选）
  type?: 'simulator' | 'course'; // 类型：模拟器或球场
}

// 会费收入记录
export interface MembershipFee {
  id: string;
  memberId: string; // 会员ID
  amount: number; // 金额
  year: number; // 年份
  type: 'regular' | 'sponsor'; // 类型：常规会费或赞助
  note?: string; // 备注
  paymentDate?: string; // 缴费日期（收入时间）
  validityPeriod?: string; // 会费使用有效期
  createTime: string;
}

// 支出记录
export interface Expense {
  id: string;
  tournamentId?: string; // 关联的比赛ID（可选）
  category: 'meal' | 'prize' | 'other'; // 支出类别：吃饭、奖品、其他
  amount: number; // 金额
  date: string; // 日期
  note?: string; // 备注
  createTime: string;
}

// ============ 正式数据 ============

// 成员列表（带昵称）- id改为昵称，name改为昵称用于展示
export const members: Member[] = [
  { id: '新来的托', name: '新来的托', realName: '托米', nickname: '新来的托', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/xinlaidetuo.png'), background: cosUrl('/images/backgrounds/xinlaidetuo.jpg') },
  { id: '大面', name: '大面', realName: '凉面', nickname: '大面', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/damian.png'), background: cosUrl('/images/backgrounds/damian.jpg') },
  { id: 'Raachael', name: 'Raachael', realName: '丽洁', nickname: 'Raachael', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/lijie.png') },
  { id: 'lulu酱', name: 'lulu酱', realName: '璐璐', nickname: 'lulu酱', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/lulujiang.png'), background: cosUrl('/images/backgrounds/lulujiang.jpg') },
  { id: 'NiKi', name: 'NiKi', realName: '颖青', nickname: 'NiKi', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/niki.png'), background: cosUrl('/images/backgrounds/niki.jpg') },
  { id: '潇湉', name: '潇湉', realName: '潇湉', nickname: '潇湉', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/xiaotian.png') },
  { id: 'Archer', name: 'Archer', realName: '欣哲', nickname: 'Archer', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/archer.png') },
  { id: '纯情浩克', name: '纯情浩克', realName: '思能', nickname: '纯情浩克', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/sineng.png') },
  { id: '国弘', name: '国弘', realName: '国弘', nickname: '国弘', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/guohong.png'), background: cosUrl('/images/backgrounds/guohong.jpg') },
  { id: '康序', name: '康序', realName: '康序', nickname: '康序', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/kangxu.png') },
  { id: '颖琪', name: '颖琪', realName: '颖琪', nickname: '颖琪', gender: '女', joinDate: '2024-01-01', initialHandicap: 24, avatar: cosUrl('/images/avatars/yingqi.png') },
  { id: '小明', name: '小明', realName: '小明', nickname: '小明', gender: '男', joinDate: '2024-01-01', initialHandicap: 18, avatar: cosUrl('/images/avatars/xiaoming.png') },
];

/** 球场名称 → 图片文件名映射 */
export const courseImageMap: Record<string, string> = {
  '广州狮子湖': 'guangzhou-shizihu',
  '广州九龙湖': 'guangzhou-jiulonghu',
  '广州假日半岛': 'guangzhou-jiaribandao',
  '顺德均安': 'shunde-junan',
  '芽庄金兰湾': 'yazhuang-jinlanwan',
  '广州南沙': 'guangzhou-nansha',
};

/** 根据球场名称获取图片URL（通过同源代理） */
export function getCourseImage(courseName: string): string {
  const key = courseImageMap[courseName];
  return key ? cosUrl(`/images/courses/${key}.png`) : '';
}

// 比赛列表（2025-2026年）
export const tournaments: Tournament[] = [
  { id: 'T001', name: '7月月例赛', courseName: '广州狮子湖', date: '2025-07-13', slope: 130, rating: 71.5 },
  { id: 'T002', name: '8月月例赛', courseName: '广州九龙湖', date: '2025-08-16', slope: 128, rating: 71.0 },
  { id: 'T003', name: '9月月例赛', courseName: '广州狮子湖', date: '2025-09-20', slope: 130, rating: 71.5 },
  { id: 'T004', name: '10月月例赛', courseName: '广州假日半岛', date: '2025-10-18', slope: 132, rating: 72.0 },
  { id: 'T005', name: '11月月例赛', courseName: '顺德均安', date: '2025-11-29', slope: 126, rating: 70.5 },
  { id: 'T006', name: '12月月例赛', courseName: '广州假日半岛', date: '2025-12-07', slope: 132, rating: 72.0 },
  { id: 'T007', name: '1月月例赛', courseName: '芽庄金兰湾', date: '2026-01-24', slope: 125, rating: 70.0 },
  { id: 'T008', name: '3月月例赛', courseName: '广州南沙', date: '2026-03-22', slope: 129, rating: 71.2 },
];

// 比赛成绩数据
// 初始打鸟记录数据
export const initialBirdieRecords: BirdieRecord[] = [
  { id: 'B001', number: 1, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B002', number: 2, memberId: '新来的托', location: '球场', type: 'course' },
  { id: 'B003', number: 3, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B004', number: 4, memberId: 'Archer', location: '模拟器', type: 'simulator' },
  { id: 'B005', number: 5, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B006', number: 6, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B007', number: 7, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B008', number: 8, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B009', number: 9, memberId: 'Archer', location: '球场', type: 'course' },
  { id: 'B010', number: 10, memberId: '新来的托', location: '球场', type: 'course' },
  { id: 'B011', number: 11, memberId: '新来的托', location: '东莞银利', type: 'course', hole: 5, note: 'A5' },
  { id: 'B012', number: 12, memberId: '新来的托', location: '球场', type: 'course' },
  { id: 'B013', number: 13, memberId: '国弘', location: '球场', type: 'course' },
  { id: 'B014', number: 14, memberId: '新来的托', location: '球场', type: 'course' },
  { id: 'B015', number: 15, memberId: 'NiKi', location: '甄湖', type: 'course', hole: 5, note: 'A5' },
  { id: 'B016', number: 16, memberId: '纯情浩克', location: '南沙', type: 'course', hole: 6, note: 'D6' },
  { id: 'B017', number: 17, memberId: '国弘', location: '大浩湖', type: 'course', hole: 2, note: '2号洞' },
];

export const games: Game[] = [
  // 7月13日广州狮子湖
  {
    tournamentId: 'T001',
    scores: [
      { memberId: '新来的托', grossScore: 104, putts: 34 },
      { memberId: '大面', grossScore: 140, putts: 38 },
      { memberId: 'Raachael', grossScore: 137, putts: 37 },
      { memberId: 'lulu酱', grossScore: 133, putts: 36 },
      { memberId: 'NiKi', grossScore: 124, putts: 35 },
      { memberId: '潇湉', grossScore: 131, putts: 36 },
      { memberId: 'Archer', grossScore: 113, putts: 33 },
      { memberId: '国弘', grossScore: 95, putts: 31 },
    ]
  },
  // 8月16日广州九龙湖
  {
    tournamentId: 'T002',
    scores: [
      { memberId: '新来的托', grossScore: 114, putts: 35 },
      { memberId: '大面', grossScore: 128, putts: 37 },
      { memberId: 'lulu酱', grossScore: 124, putts: 36 },
      { memberId: 'NiKi', grossScore: 105, putts: 33 },
      { memberId: 'Archer', grossScore: 125, putts: 36 },
      { memberId: '国弘', grossScore: 105, putts: 33 },
    ]
  },
  // 9月20日广州狮子湖
  {
    tournamentId: 'T003',
    scores: [
      { memberId: '新来的托', grossScore: 107, putts: 34 },
      { memberId: '大面', grossScore: 135, putts: 37 },
      { memberId: 'Raachael', grossScore: 123, putts: 36 },
      { memberId: 'NiKi', grossScore: 119, putts: 35 },
      { memberId: '潇湉', grossScore: 135, putts: 37 },
      { memberId: 'Archer', grossScore: 118, putts: 35 },
      { memberId: '纯情浩克', grossScore: 128, putts: 36 },
      { memberId: '国弘', grossScore: 104, putts: 33 },
    ]
  },
  // 10月18日广州假日半岛
  {
    tournamentId: 'T004',
    scores: [
      { memberId: '新来的托', grossScore: 115, putts: 35 },
      { memberId: '大面', grossScore: 122, putts: 36 },
      { memberId: 'Raachael', grossScore: 123, putts: 36 },
      { memberId: 'NiKi', grossScore: 102, putts: 32 },
      { memberId: 'Archer', grossScore: 106, putts: 33 },
      { memberId: '国弘', grossScore: 94, putts: 30 },
    ]
  },
  // 11月29日顺德均安
  {
    tournamentId: 'T005',
    scores: [
      { memberId: '新来的托', grossScore: 113, putts: 34 },
      { memberId: '大面', grossScore: 134, putts: 37 },
      { memberId: 'Raachael', grossScore: 125, putts: 36 },
      { memberId: 'lulu酱', grossScore: 128, putts: 36 },
      { memberId: 'NiKi', grossScore: 103, putts: 33 },
      { memberId: 'Archer', grossScore: 115, putts: 34 },
      { memberId: '纯情浩克', grossScore: 139, putts: 38 },
      { memberId: '国弘', grossScore: 101, putts: 32 },
      { memberId: '康序', grossScore: 141, putts: 38 },
    ]
  },
  // 12月7日广州假日半岛
  {
    tournamentId: 'T006',
    scores: [
      { memberId: '新来的托', grossScore: 98, putts: 32 },
      { memberId: '大面', grossScore: 114, putts: 35 },
      { memberId: 'lulu酱', grossScore: 128, putts: 36 },
      { memberId: 'NiKi', grossScore: 103, putts: 33 },
      { memberId: 'Archer', grossScore: 115, putts: 34 },
      { memberId: '纯情浩克', grossScore: 118, putts: 35 },
    ]
  },
  // 1月24日芽庄金兰湾
  {
    tournamentId: 'T007',
    scores: [
      { memberId: '新来的托', grossScore: 104, putts: 34 },
      { memberId: '大面', grossScore: 115, putts: 35 },
      { memberId: 'Raachael', grossScore: 115, putts: 35 },
      { memberId: 'NiKi', grossScore: 98, putts: 32 },
      { memberId: 'Archer', grossScore: 107, putts: 33 },
      { memberId: '纯情浩克', grossScore: 130, putts: 37 },
    ]
  },
  // 3月22日广州南沙
  {
    tournamentId: 'T008',
    scores: [
      { memberId: '新来的托', grossScore: 96, putts: 32 },
      { memberId: '大面', grossScore: 106, putts: 34 },
      { memberId: 'Raachael', grossScore: 111, putts: 35 },
      { memberId: 'lulu酱', grossScore: 114, putts: 35 },
      { memberId: 'NiKi', grossScore: 96, putts: 32 },
      { memberId: '潇湉', grossScore: 115, putts: 35 },
      { memberId: 'Archer', grossScore: 98, putts: 32 },
      { memberId: '纯情浩克', grossScore: 109, putts: 34 },
      { memberId: '国弘', grossScore: 110, putts: 34 },
    ]
  },
];

// ============ 计算函数（支持动态数据） ============

/** 获取会员的所有比赛记录 */
export function getMemberGames(
  memberId: string,
  gameList: Game[],
  tournamentList: Tournament[]
) {
  return gameList.map(g => {
    const score = g.scores.find(s => s.memberId === memberId);
    const tournament = tournamentList.find(t => t.id === g.tournamentId);
    return score && tournament ? { tournament, score } : null;
  }).filter((x): x is { tournament: Tournament; score: ScoreEntry } => x !== null);
}

/** 获取会员在某场比赛的成绩 */
export function getMemberScore(memberId: string, tournamentId: string, gameList: Game[]): ScoreEntry | undefined {
  const game = gameList.find(g => g.tournamentId === tournamentId);
  return game?.scores.find(s => s.memberId === memberId);
}

/** 历史平均总杆数 - 四舍五入保留整数 */
export function getAvgScore(memberId: string, gameList: Game[], tournamentList: Tournament[]): number {
  const mg = getMemberGames(memberId, gameList, tournamentList);
  if (mg.length === 0) return 0;
  return Math.round(mg.reduce((sum, g) => sum + g.score.grossScore, 0) / mg.length);
}

/** 历史平均推杆数 - 四舍五入保留整数 */
export function getAvgPutts(memberId: string, gameList: Game[], tournamentList: Tournament[]): number {
  const mg = getMemberGames(memberId, gameList, tournamentList);
  if (mg.length === 0) return 0;
  return Math.round(mg.reduce((sum, g) => sum + g.score.putts, 0) / mg.length);
}

/** 获取会员的平均差点指数
 * 每场比赛差点 = 杆数 - 72
 * 平均差点 = 所有参与比赛的差点平均值
 */
export function getHandicapIndex(memberId: string, gameList: Game[], tournamentList: Tournament[]): number {
  const mg = getMemberGames(memberId, gameList, tournamentList);
  if (mg.length === 0) return 0;
  
  const handicaps = mg.map(g => g.score.grossScore - 72);
  const avgHandicap = handicaps.reduce((sum, h) => sum + h, 0) / handicaps.length;
  // 平均差点保留一位小数
  return Math.round(avgHandicap * 10) / 10;
}

/** 计算进步因子 R = (72/X)^3 * (1 + (72/X)^10) * 10
 * X 是过去六次月赛平均成绩
 */
function calculateProgressFactor(x: number): number {
  const ratio = 72 / x;
  const r = Math.pow(ratio, 3) * (1 + Math.pow(ratio, 10)) * 10;
  return r;
}

/** 进步系数 S = (X - Y) * R
 * Y: 本次成绩
 * X: 过去六次月赛平均成绩（最多取6场）
 * R: 进步因子
 * 结果为正表示进步，为负表示退步
 */
export function getProgressScore(
  memberId: string,
  tournamentId: string,
  gameList: Game[],
  tournamentList: Tournament[]
): number | null {
  const mg = getMemberGames(memberId, gameList, tournamentList);
  const currentGameIdx = mg.findIndex(g => g.tournament.id === tournamentId);
  if (currentGameIdx <= 0) return null;

  // 取最近最多6场历史比赛计算平均成绩 X
  const historyGames = mg.slice(Math.max(0, currentGameIdx - 6), currentGameIdx);
  const x = historyGames.reduce((sum, g) => sum + g.score.grossScore, 0) / historyGames.length;
  
  // 本次成绩 Y
  const y = mg[currentGameIdx].score.grossScore;
  
  // 计算进步因子 R
  const r = calculateProgressFactor(x);
  
  // 最终进步系数 S = (X - Y) * R （取反，使+表示进步，-表示退步）
  const s = (x - y) * r;
  
  // 保留两位小数
  return Math.round(s * 100) / 100;
}

/** 获取比赛的总杆数排名 */
export function getGrossRanking(tournamentId: string, gameList: Game[], tournamentList: Tournament[], memberList: Member[]) {
  const game = gameList.find(g => g.tournamentId === tournamentId);
  if (!game) return [];
  const tournament = tournamentList.find(t => t.id === tournamentId)!;

  return game.scores
    .map(s => {
      const member = memberList.find(m => m.id === s.memberId)!;
      return { ...s, member, tournament };
    })
    .sort((a, b) => a.grossScore - b.grossScore)
    .map((s, i) => ({ ...s, rank: i + 1 }));
}

/** 获取比赛的推杆数排名 */
export function getPuttRanking(tournamentId: string, gameList: Game[], tournamentList: Tournament[], memberList: Member[]) {
  const game = gameList.find(g => g.tournamentId === tournamentId);
  if (!game) return [];
  const tournament = tournamentList.find(t => t.id === tournamentId)!;

  return game.scores
    .map(s => {
      const member = memberList.find(m => m.id === s.memberId)!;
      return { ...s, member, tournament };
    })
    .sort((a, b) => a.putts - b.putts)
    .map((s, i) => ({ ...s, rank: i + 1 }));
}

/** 获取比赛的进步系数之星（进步系数最大者） */
export function getProgressStar(
  tournamentId: string,
  gameList: Game[],
  tournamentList: Tournament[],
  memberList: Member[]
) {
  const game = gameList.find(g => g.tournamentId === tournamentId);
  if (!game) return null;

  let best: { memberId: string; progress: number } | null = null;
  for (const s of game.scores) {
    const p = getProgressScore(s.memberId, tournamentId, gameList, tournamentList);
    // 现在找进步系数最大者（正数越大表示进步越大）
    if (p !== null && (best === null || p > best.progress)) {
      best = { memberId: s.memberId, progress: p };
    }
  }
  if (!best) return null;

  const member = memberList.find(m => m.id === best!.memberId)!;
  return { member, progress: best.progress };
}



/** 总排行榜（按平均差点升序，差点越低排名越高） */
export function getOverallRanking(gameList?: Game[], tournamentList?: Tournament[], memberList?: Member[]) {
  const gl = gameList ?? games;
  const tl = tournamentList ?? tournaments;
  const ml = memberList ?? members;
  const totalTournaments = tl.length;
  const participatedMembers = ml.filter(m => getMemberGames(m.id, gl, tl).length > 0);

  return participatedMembers
    .map(m => {
      const gameCount = getMemberGames(m.id, gl, tl).length;
      return {
        member: m,
        avgScore: getAvgScore(m.id, gl, tl),
        handicapIndex: getHandicapIndex(m.id, gl, tl),
        gameCount,
        totalGames: totalTournaments,
        participationRate: Math.round((gameCount / totalTournaments) * 100),
        bestScore: Math.min(...getMemberGames(m.id, gl, tl).map(g => g.score.grossScore)),
        worstScore: Math.max(...getMemberGames(m.id, gl, tl).map(g => g.score.grossScore)),
        avgPutts: getAvgPutts(m.id, gl, tl),
      };
    })
    .sort((a, b) => a.handicapIndex - b.handicapIndex)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

/** 进步排行榜（按最近一场月赛的进步系数降序，越大表示进步越大） */
export function getProgressRanking(gameList?: Game[], tournamentList?: Tournament[], memberList?: Member[]) {
  const gl = gameList ?? games;
  const tl = tournamentList ?? tournaments;
  const ml = memberList ?? members;
  const totalTournaments = tl.length;

  // 找到最近一场比赛
  const sortedTournaments = [...tl].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestTournament = sortedTournaments[0];
  if (!latestTournament) return [];

  const latestGame = gl.find(g => g.tournamentId === latestTournament.id);
  if (!latestGame) return [];

  return latestGame.scores
    .map(s => {
      const member = ml.find(m => m.id === s.memberId);
      if (!member) return null;

      const progress = getProgressScore(s.memberId, latestTournament.id, gl, tl);
      if (progress === null) return null;

      const gameCount = getMemberGames(s.memberId, gl, tl).length;

      return {
        member,
        avgScore: getAvgScore(s.memberId, gl, tl),
        handicapIndex: getHandicapIndex(s.memberId, gl, tl),
        latestProgress: progress,
        latestScore: s.grossScore,
        gameCount,
        totalGames: totalTournaments,
        participationRate: Math.round((gameCount / totalTournaments) * 100),
        bestScore: Math.min(...getMemberGames(s.memberId, gl, tl).map(g => g.score.grossScore)),
        worstScore: Math.max(...getMemberGames(s.memberId, gl, tl).map(g => g.score.grossScore)),
        avgPutts: getAvgPutts(s.memberId, gl, tl),
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.latestProgress - a.latestProgress)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}
