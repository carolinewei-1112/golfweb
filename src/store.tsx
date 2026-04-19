import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import type { Member, Tournament, ScoreEntry, Game, BirdieRecord, MembershipFee, Expense } from './data'
import { members as initMembers, tournaments as initTournaments, games as initGames, initialBirdieRecords, initialMembershipFees } from './data'
import {
  getOverallRanking as calcOverallRanking,
  getProgressRanking as calcProgressRanking,
  getMemberGames as calcMemberGames,
  getAvgScore as calcAvgScore,
  getAvgPutts as calcAvgPutts,
  getHandicapIndex as calcHandicapIndex,
  getProgressScore as calcProgressScore,
  getGrossRanking as calcGrossRanking,
  getPuttRanking as calcPuttRanking,
  getProgressStar as calcProgressStar,
} from './data'

interface Announcement {
  id: string
  content: string
  createTime: string
}

interface StoreState {
  members: Member[]
  tournaments: Tournament[]
  games: Game[]
  announcements: Announcement[]
  birdieRecords: BirdieRecord[]
  membershipFees: MembershipFee[]
  expenses: Expense[]
  isAdmin: boolean
  toggleAdmin: () => void
  addMember: (m: Omit<Member, 'id'> & { id?: string }) => void
  updateMember: (id: string, m: Partial<Member>) => void
  addTournament: (t: Omit<Tournament, 'id'>) => void
  updateTournament: (id: string, updates: Partial<Tournament>) => void
  deleteTournament: (id: string) => void
  updateGameScores: (tournamentId: string, scores: ScoreEntry[]) => void
  updateGamePhotos: (tournamentId: string, photos: string[]) => void
  addAnnouncement: (content: string) => void
  deleteAnnouncement: (id: string) => void
  addBirdieRecord: (record: Omit<BirdieRecord, 'id'>) => void
  deleteBirdieRecord: (id: string) => void
  updateBirdieRecord: (id: string, updates: Partial<BirdieRecord>) => void
  addMembershipFee: (fee: Omit<MembershipFee, 'id' | 'createTime'>) => void
  deleteMembershipFee: (id: string) => void
  addExpense: (expense: Omit<Expense, 'id' | 'createTime'>) => void
  deleteExpense: (id: string) => void
  getMemberById: (id: string) => Member | undefined
  // 计算属性
  overallRanking: ReturnType<typeof calcOverallRanking>
  progressRanking: ReturnType<typeof calcProgressRanking>
  getHandicapIndex: (memberId: string) => number
  getMemberGames: (memberId: string) => { tournament: Tournament; score: ScoreEntry }[]
  getAvgScore: (memberId: string) => number
  getAvgPutts: (memberId: string) => number
  getProgressScore: (memberId: string, tournamentId: string) => number | null
  getGrossRanking: (tournamentId: string) => any[]
  getPuttRanking: (tournamentId: string) => any[]
  getProgressStar: (tournamentId: string) => { member: Member; progress: number } | null
}

const StoreContext = createContext<StoreState | null>(null)

const STORAGE_KEY = 'golfweb_store_v26'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return null
}

function saveStore(data: { members: Member[]; tournaments: Tournament[]; games: Game[]; announcements: Announcement[]; birdieRecords: BirdieRecord[]; membershipFees: MembershipFee[]; expenses: Expense[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState(loadStore())
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return localStorage.getItem('golfweb_admin') === '1' } catch { return false }
  })

  const members: Member[] = saved?.members ?? initMembers
  const tournaments: Tournament[] = saved?.tournaments ?? initTournaments
  const games: Game[] = saved?.games ?? initGames
  const announcements: Announcement[] = saved?.announcements ?? [
    { id: 'A002', content: '4月月赛已圆满完成。5月会安排一场夜场🌙 时间预计是（5月16日 或 17日）', createTime: '2026-04-18T22:00:00.000Z' },
    { id: 'A001', content: '4月月赛时间4月18日，请各位会员预留时间。', createTime: '2026-04-15T00:00:00.000Z' }
  ]
  const birdieRecords: BirdieRecord[] = saved?.birdieRecords ?? initialBirdieRecords
  const membershipFees: MembershipFee[] = saved?.membershipFees ?? initialMembershipFees
  const defaultExpenses: Expense[] = [
    { id: 'E001', tournamentId: 'T009', category: 'meal', amount: 586.6, date: '2026-04-18', note: '月赛聚餐 乐田饭庄', createTime: '2026-04-18T20:00:00.000Z' },
    { id: 'E002', tournamentId: 'T009', category: 'drink', amount: 274.8, date: '2026-04-18', note: '月赛饮料 星巴克', createTime: '2026-04-18T20:01:00.000Z' },
    { id: 'E003', tournamentId: 'T009', category: 'bonus', amount: 600, date: '2026-04-18', note: '月赛进步冠军 奖金 大面', createTime: '2026-04-18T20:02:00.000Z' },
    { id: 'E004', tournamentId: 'T009', category: 'bonus', amount: 300, date: '2026-04-18', note: '月赛进步季军 奖金 新来的托', createTime: '2026-04-18T20:03:00.000Z' },
    { id: 'E005', tournamentId: 'T009', category: 'prize', amount: 126.42, date: '2026-04-18', note: '打鸟奖品 手套 新来的托', createTime: '2026-04-18T20:04:00.000Z' },
  ]
  const expenses: Expense[] = (saved?.expenses && saved.expenses.length > 0) ? saved.expenses : defaultExpenses

  const persist = useCallback((m: Member[], t: Tournament[], g: Game[], a: Announcement[], b: BirdieRecord[], f: MembershipFee[] = membershipFees, e: Expense[] = expenses) => {
    const data = { members: m, tournaments: t, games: g, announcements: a, birdieRecords: b, membershipFees: f, expenses: e }
    saveStore(data)
    setSaved({ ...data })
  }, [membershipFees, expenses])

  useEffect(() => {
    localStorage.setItem('golfweb_admin', isAdmin ? '1' : '0')
  }, [isAdmin])

  const addMember = useCallback((m: Omit<Member, 'id'>) => {
    const maxId = members.reduce((max, mm) => {
      const num = parseInt(mm.id.slice(1))
      return num > max ? num : max
    }, 0)
    const id = `M${String(maxId + 1).padStart(3, '0')}`
    // 如果没有提供头像，使用默认生成的头像
    const avatar = m.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(m.name + id)}&backgroundColor=16a34a`
    const newMember: Member = {
      ...m, id, avatar,
    }
    persist([...members, newMember], tournaments, games, announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const updateMember = useCallback((id: string, updates: Partial<Member>) => {
    persist(members.map(m => m.id === id ? { ...m, ...updates } : m), tournaments, games, announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const addTournament = useCallback((t: Omit<Tournament, 'id'>) => {
    const maxId = tournaments.reduce((max, tt) => {
      const num = parseInt(tt.id.slice(1))
      return num > max ? num : max
    }, 0)
    const id = `T${String(maxId + 1).padStart(3, '0')}`
    persist(members, [...tournaments, { ...t, id }], [...games, { tournamentId: id, scores: [], photos: [] }], announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const updateTournament = useCallback((id: string, updates: Partial<Tournament>) => {
    persist(members, tournaments.map(t => t.id === id ? { ...t, ...updates } : t), games, announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const deleteTournament = useCallback((id: string) => {
    persist(members, tournaments.filter(t => t.id !== id), games.filter(g => g.tournamentId !== id), announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const updateGameScores = useCallback((tournamentId: string, scores: ScoreEntry[]) => {
    let newGames = games.map(g => g.tournamentId === tournamentId ? { ...g, scores } : g)
    if (!newGames.some(g => g.tournamentId === tournamentId)) {
      newGames = [...newGames, { tournamentId, scores, photos: [] }]
    }
    persist(members, tournaments, newGames, announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const updateGamePhotos = useCallback((tournamentId: string, photos: string[]) => {
    let newGames = games.map(g => g.tournamentId === tournamentId ? { ...g, photos } : g)
    if (!newGames.some(g => g.tournamentId === tournamentId)) {
      newGames = [...newGames, { tournamentId, scores: [], photos }]
    }
    persist(members, tournaments, newGames, announcements, birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const getMemberById = useCallback((id: string) => members.find(m => m.id === id), [members])

  // 计算属性（自动响应数据变化）
  const overallRanking = useMemo(
    () => calcOverallRanking(games, tournaments, members),
    [games, tournaments, members]
  )

  const progressRanking = useMemo(
    () => calcProgressRanking(games, tournaments, members),
    [games, tournaments, members]
  )

  const getMemberGames = useCallback((memberId: string) =>
    calcMemberGames(memberId, games, tournaments),
    [games, tournaments]
  )

  const getAvgScore = useCallback((memberId: string) =>
    calcAvgScore(memberId, games, tournaments),
    [games, tournaments]
  )

  const getAvgPutts = useCallback((memberId: string) =>
    calcAvgPutts(memberId, games, tournaments),
    [games, tournaments]
  )

  const getHandicapIndex = useCallback((memberId: string) =>
    calcHandicapIndex(memberId, games, tournaments),
    [games, tournaments]
  )

  const getProgressScore = useCallback((memberId: string, tournamentId: string) =>
    calcProgressScore(memberId, tournamentId, games, tournaments),
    [games, tournaments]
  )

  const getGrossRanking = useCallback((tournamentId: string) =>
    calcGrossRanking(tournamentId, games, tournaments, members),
    [games, tournaments, members]
  )

  const getPuttRanking = useCallback((tournamentId: string) =>
    calcPuttRanking(tournamentId, games, tournaments, members),
    [games, tournaments, members]
  )

  const getProgressStar = useCallback((tournamentId: string) =>
    calcProgressStar(tournamentId, games, tournaments, members),
    [games, tournaments, members]
  )

  const addAnnouncement = useCallback((content: string) => {
    const newAnnouncement: Announcement = {
      id: `A${Date.now()}`,
      content,
      createTime: new Date().toISOString(),
    }
    persist(members, tournaments, games, [newAnnouncement, ...announcements], birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const deleteAnnouncement = useCallback((id: string) => {
    persist(members, tournaments, games, announcements.filter(a => a.id !== id), birdieRecords)
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const addBirdieRecord = useCallback((record: Omit<BirdieRecord, 'id'>) => {
    const newRecord: BirdieRecord = {
      ...record,
      id: `B${Date.now()}`,
    }
    persist(members, tournaments, games, announcements, [...birdieRecords, newRecord])
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const deleteBirdieRecord = useCallback((id: string) => {
    persist(members, tournaments, games, announcements, birdieRecords.filter(b => b.id !== id))
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const updateBirdieRecord = useCallback((id: string, updates: Partial<BirdieRecord>) => {
    persist(members, tournaments, games, announcements, birdieRecords.map(b => b.id === id ? { ...b, ...updates } : b))
  }, [members, tournaments, games, announcements, birdieRecords, persist])

  const addMembershipFee = useCallback((fee: Omit<MembershipFee, 'id' | 'createTime'>) => {
    const newFee: MembershipFee = {
      ...fee,
      id: `F${Date.now()}`,
      createTime: new Date().toISOString(),
    }
    persist(members, tournaments, games, announcements, birdieRecords, [...membershipFees, newFee], expenses)
  }, [members, tournaments, games, announcements, birdieRecords, membershipFees, expenses, persist])

  const deleteMembershipFee = useCallback((id: string) => {
    persist(members, tournaments, games, announcements, birdieRecords, membershipFees.filter(f => f.id !== id), expenses)
  }, [members, tournaments, games, announcements, birdieRecords, membershipFees, expenses, persist])

  const addExpense = useCallback((expense: Omit<Expense, 'id' | 'createTime'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `E${Date.now()}`,
      createTime: new Date().toISOString(),
    }
    persist(members, tournaments, games, announcements, birdieRecords, membershipFees, [...expenses, newExpense])
  }, [members, tournaments, games, announcements, birdieRecords, membershipFees, expenses, persist])

  const deleteExpense = useCallback((id: string) => {
    persist(members, tournaments, games, announcements, birdieRecords, membershipFees, expenses.filter(e => e.id !== id))
  }, [members, tournaments, games, announcements, birdieRecords, membershipFees, expenses, persist])

  return (
    <StoreContext.Provider value={{
      members, tournaments, games, announcements, birdieRecords, membershipFees, expenses, isAdmin,
      toggleAdmin: () => setIsAdmin(a => !a),
      addMember, updateMember, addTournament, updateTournament, deleteTournament, updateGameScores, updateGamePhotos, addAnnouncement, deleteAnnouncement,
      addBirdieRecord, deleteBirdieRecord, updateBirdieRecord, getMemberById,
      addMembershipFee, deleteMembershipFee, addExpense, deleteExpense,
      overallRanking, progressRanking, getMemberGames, getAvgScore, getAvgPutts, getHandicapIndex,
      getProgressScore,
      getGrossRanking, getPuttRanking, getProgressStar,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
