import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store'
import type { ScoreEntry } from '../data'
import { getMemberTee, getCourseImage } from '../data'
import type { Course } from '../courses'
import { Icon } from '../components/Icons'
import { searchCourses } from '../courses'
import { Link } from 'react-router-dom'

type AdminTab = 'members' | 'tournament' | 'scores' | 'announcement' | 'birdie' | 'finance'

// ============ 会员管理 ============
function MemberManager() {
  const { members, addMember, updateMember, getMemberById, getMemberGames } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    realName: '',
    nickname: '',
    gender: '男' as '男' | '女',
    joinDate: '',
    avatar: '',
  })

  const resetForm = () => {
    setForm({ name: '', realName: '', nickname: '', gender: '男', joinDate: new Date().toISOString().slice(0, 10), avatar: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // name 使用 nickname（昵称）作为展示名，如果没有 nickname 则使用 realName
    const displayName = form.nickname || form.realName || form.name
    const memberData = {
      ...form,
      name: displayName,
      // id 也使用 displayName（因为现在的 id 就是昵称）
    }
    if (editingId) {
      updateMember(editingId, memberData)
    } else {
      addMember({ ...memberData, id: displayName } as any)
    }
    resetForm()
  }

  const startEdit = (id: string) => {
    const m = getMemberById(id)
    if (m) {
      setForm({
        name: m.name,
        realName: m.realName || '',
        nickname: m.nickname || '',
        gender: m.gender,
        joinDate: m.joinDate,
        avatar: m.avatar || '',
      })
      setEditingId(id)
      setShowForm(true)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800"><Icon name="people" className="w-5 h-5 inline-block align-[-0.15em]" /> 会员管理（{members.length} 人）</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm) }}
          className="px-4 py-1.5 bg-golf-700 text-white rounded-lg text-sm hover:bg-golf-800 transition-colors"
        >
          {showForm ? '取消' : '+ 添加会员'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-golf-50 rounded-xl p-4 mb-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-700">{editingId ? '编辑会员' : '添加新会员'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">真实姓名</label>
              <input
                type="text"
                required
                value={form.realName}
                onChange={e => setForm({ ...form, realName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                placeholder="输入真实姓名"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">昵称（用于展示）</label>
              <input
                type="text"
                required
                value={form.nickname}
                onChange={e => setForm({ ...form, nickname: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                placeholder="输入昵称"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">性别</label>
              <select
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value as '男' | '女' })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">入会日期</label>
              <input
                type="date"
                required
                value={form.joinDate}
                onChange={e => setForm({ ...form, joinDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">TEE类型（自动计算）</label>
              <div className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700">
                {getMemberTee({ gender: form.gender, joinDate: form.joinDate } as any, 0)}
                <span className="text-xs text-gray-400 ml-2">
                  {form.gender === '男' ? '（前6场白TEE，第7场起蓝TEE）' : '（始终红TEE）'}
                </span>
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">头像图片URL</label>
              <input
                type="text"
                value={form.avatar}
                onChange={e => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                placeholder="如：https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/avatars/name.png（可选，留空自动生成）"
              />
              <p className="text-xs text-gray-400 mt-1">头像图片存放在腾讯云COS images/avatars/ 目录下，也支持其他网络图片URL</p>
            </div>
          </div>
          <button type="submit" className="px-4 py-1.5 bg-golf-700 text-white rounded-lg text-sm hover:bg-golf-800">
            {editingId ? '保存修改' : '确认添加'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
        {members.map(m => (
          <div key={m.id} className="flex items-center gap-3 px-4 py-2.5">
            <img src={m.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-800">{m.name}</div>
              <div className="text-xs text-gray-400">{m.realName || ''} · {m.gender} · {getMemberTee(m, getMemberGames(m.id).length)}</div>
            </div>
            <Link to={`/member/${m.id}`} className="text-xs text-golf-600 mr-2">查看</Link>
            <button
              onClick={() => startEdit(m.id)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              编辑
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ 球场搜索组件 ============
function CourseSearchInput({
  value,
  onChange,
  onSelect,
  required = true,
}: {
  value: string
  onChange: (v: string) => void
  onSelect: (course: Course) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const [results, setResults] = useState<Course[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (v: string) => {
    onChange(v)
    if (v.trim().length >= 1) {
      setResults(searchCourses(v))
      setFocused(true)
    } else {
      setResults([])
      setFocused(false)
    }
  }

  const handleSelect = (course: Course) => {
    onSelect(course)
    onChange(course.name)
    setResults([])
    setFocused(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        required={required}
        value={value}
        onChange={e => handleInput(e.target.value)}
        onFocus={() => { if (value.trim().length >= 1) { setResults(searchCourses(value)); setFocused(true) } }}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
        placeholder="输入球场名称或城市搜索..."
      />
      {focused && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {results.map((c, i) => (
            <button
              key={`${c.name}-${i}`}
              type="button"
              onClick={() => handleSelect(c)}
              className="w-full px-3 py-2.5 text-left hover:bg-golf-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-800 truncate">{c.name}</div>
                <div className="text-xs text-gray-400">{c.city}，{c.region}</div>
              </div>
              <div className="flex-shrink-0 ml-3 text-right">
                <span className="inline-block px-2 py-0.5 bg-golf-50 text-golf-700 text-xs rounded-md font-medium">
                  S {c.slope} / R {c.rating}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ 创建比赛 ============
function TournamentCreator() {
  const { addTournament, updateTournament, deleteTournament, tournaments } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    courseName: '',
    date: new Date().toISOString().slice(0, 10),
    slope: 125,
    rating: 71.0,
    image: '',
  })
  const [courseMatched, setCourseMatched] = useState(false)

  const handleCourseSelect = (course: Course) => {
    setForm(f => ({ ...f, courseName: course.name, slope: course.slope, rating: course.rating, image: getCourseImage(course.name) }))
    setCourseMatched(true)
  }

  const handleCourseNameChange = (v: string) => {
    setForm(f => ({ ...f, courseName: v }))
    setCourseMatched(false)
  }

  const resetForm = () => {
    setForm({ name: '', courseName: '', date: new Date().toISOString().slice(0, 10), slope: 125, rating: 71.0, image: '' })
    setCourseMatched(false)
    setEditingId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      updateTournament(editingId, form)
      alert('比赛修改成功！')
    } else {
      addTournament(form)
      alert('比赛发布成功！')
    }
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (tournament: typeof tournaments[0]) => {
    setForm({
      name: tournament.name,
      courseName: tournament.courseName,
      date: tournament.date,
      slope: tournament.slope,
      rating: tournament.rating,
      image: tournament.image || '',
    })
    setEditingId(tournament.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id: string, name: string) => {
    if (confirm(`确定要删除比赛「${name}」吗？此操作不可恢复，相关成绩数据也会被删除。`)) {
      deleteTournament(id)
      alert('比赛已删除')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    resetForm()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-800"><Icon name="stadium" className="w-5 h-5 inline-block align-[-0.15em]" /> 发布比赛（共 {tournaments.length} 场）</h2>
        <button
          onClick={() => editingId ? handleCancel() : setShowForm(!showForm)}
          className="px-4 py-1.5 bg-golf-700 text-white rounded-lg text-sm hover:bg-golf-800 transition-colors"
        >
          {showForm ? '取消' : '+ 创建比赛'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-golf-50 rounded-xl p-4 mb-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-700">{editingId ? '修改比赛' : '创建新比赛'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">比赛名称</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                placeholder="例如 7月"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">球场名称</label>
              <CourseSearchInput
                value={form.courseName}
                onChange={handleCourseNameChange}
                onSelect={handleCourseSelect}
              />
              {courseMatched && (
                <div className="mt-1 text-xs text-golf-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  已匹配球场，Slope、Rating 和图片已自动填入
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">球场图片</label>
              <input
                type="text"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                placeholder="如：https://birdie-club-1259332535.cos.ap-guangzhou.myqcloud.com/images/courses/name.png 或图片URL（可选）"
              />
              <p className="text-xs text-gray-400 mt-1">球场图片存放在腾讯云COS images/courses/ 目录下，也支持其他网络图片URL</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">比赛日期</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Slope（难度值）</label>
                <input
                  type="number"
                  min="55" max="155"
                  required
                  value={form.slope}
                  onChange={e => setForm({ ...form, slope: parseInt(e.target.value) || 125 })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-golf-500 ${
                    courseMatched ? 'border-golf-400 bg-golf-50/50' : 'border-gray-200'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Rating（球场评分）</label>
                <input
                  type="number"
                  step="0.1" min="60" max="80"
                  required
                  value={form.rating}
                  onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) || 71.0 })}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-golf-500 ${
                    courseMatched ? 'border-golf-400 bg-golf-50/50' : 'border-gray-200'
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-1.5 bg-golf-700 text-white rounded-lg text-sm hover:bg-golf-800">
              {editingId ? '保存修改' : '确认发布'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
              >
                取消编辑
              </button>
            )}
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50 max-h-[300px] overflow-y-auto">
        {tournaments.map(t => (
          <div key={t.id} className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-3">
              {t.image && (
                <img 
                  src={t.image} 
                  alt={t.courseName}
                  className="w-10 h-8 rounded object-cover bg-gray-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              )}
              <div>
                <div className="text-sm font-medium text-gray-800">{t.name.replace('月例赛', '')}</div>
                <div className="text-xs text-gray-400">{t.courseName} · {t.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400">S {t.slope} / R {t.rating}</div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(t)}
                  className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.name)}
                  className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 判断是否记录推杆数（2026年4月及以后的比赛才记录推杆，3月及以前不记录）
function hasPuttData(date: string): boolean {
  return date >= '2026-04-01'
}

// 判断比赛是否需要显示推杆数输入（成绩录入时所有比赛都显示推杆数输入框）
function showPuttInputForScoreEntry(_date: string): boolean {
  return true // 所有比赛都显示推杆数输入框
}

// ============ 成绩录入 ============
// 打鸟记录条目
interface BirdieEntry {
  memberId: string
  hole: number
}

function ScoreInput() {
  const { members, tournaments, games, updateGameScores, updateGamePhotos, getMemberById, getMemberGames, addBirdieRecord, birdieRecords } = useStore()
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0]?.id ?? '')
  const [entries, setEntries] = useState<ScoreEntry[]>([])
  const [photos, setPhotos] = useState<string[]>([])
  // 打鸟记录（非必填）
  const [birdieEntries, setBirdieEntries] = useState<BirdieEntry[]>([])
  
  // 获取当前选中的比赛
  const selectedTournamentData = tournaments.find(t => t.id === selectedTournament)
  const showPuttInput = selectedTournamentData ? showPuttInputForScoreEntry(selectedTournamentData.date) : true

  // 选择比赛时加载已有成绩和照片
  const handleSelectTournament = (tid: string) => {
    setSelectedTournament(tid)
    const game = games.find(g => g.tournamentId === tid)
    setEntries(game ? [...game.scores] : [])
    setPhotos(game?.photos ? [...game.photos] : [])
    // 加载该比赛的打鸟记录（如果有）
    const tournament = tournaments.find(t => t.id === tid)
    if (tournament) {
      const existingBirdies = birdieRecords.filter(b => 
        b.date === tournament.date && 
        entries.some(e => e.memberId === b.memberId)
      )
      setBirdieEntries(existingBirdies.map(b => ({
        memberId: b.memberId,
        hole: b.hole || 1
      })))
    }
  }

  // 添加参赛球员
  const addPlayer = (memberId: string) => {
    if (entries.some(e => e.memberId === memberId)) return
    setEntries([...entries, { memberId, grossScore: 0, putts: 0 }])
  }

  // 添加打鸟记录
  const addBirdie = (memberId: string, hole: number) => {
    if (!hole || hole < 1 || hole > 18) return
    setBirdieEntries([...birdieEntries, { memberId, hole }])
  }

  // 移除打鸟记录
  const removeBirdie = (index: number) => {
    setBirdieEntries(birdieEntries.filter((_, i) => i !== index))
  }

  // 移除球员
  const removePlayer = (memberId: string) => {
    setEntries(entries.filter(e => e.memberId !== memberId))
  }

  // 更新成绩
  const updateScore = (memberId: string, field: 'grossScore' | 'putts', value: number) => {
    setEntries(entries.map(e =>
      e.memberId === memberId ? { ...e, [field]: value } : e
    ))
  }

  // 保存成绩
  const handleSave = () => {
    if (!selectedTournament || entries.length === 0) return
    // 检查总杆数是否填写
    const invalidEntries = entries.filter(e => !e.grossScore || e.grossScore <= 0)
    if (invalidEntries.length > 0) {
      const memberNames = invalidEntries.map(e => getMemberById(e.memberId)?.name || '未知').join('、')
      alert(`请填写以下球员的总杆数：${memberNames}`)
      return
    }
    updateGameScores(selectedTournament, entries)
    updateGamePhotos(selectedTournament, photos)

    // 同步保存打鸟记录到百鸟记录
    const tournament = tournaments.find(t => t.id === selectedTournament)
    if (tournament && birdieEntries.length > 0) {
      // 获取当前最大鸟号
      const maxNumber = birdieRecords.length > 0
        ? Math.max(...birdieRecords.map(b => b.number))
        : 0

      birdieEntries.forEach((birdie, index) => {
        // 检查是否已存在该打鸟记录（避免重复添加）
        const exists = birdieRecords.some(b =>
          b.memberId === birdie.memberId &&
          b.date === tournament.date &&
          b.hole === birdie.hole
        )
        if (!exists) {
          addBirdieRecord({
            number: maxNumber + index + 1,
            memberId: birdie.memberId,
            location: tournament.courseName,
            date: tournament.date,
            hole: birdie.hole,
            type: 'course'
          })
        }
      })
    }

    alert('成绩保存成功！')
  }

  // 处理照片上传
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          setPhotos(prev => [...prev, result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // 删除照片
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  // 未被选中的会员
  const availableMembers = members.filter(m => !entries.some(e => e.memberId === m.id))
  const [memberSearch, setMemberSearch] = useState('')

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4"><Icon name="pencil" className="w-5 h-5 inline-block align-[-0.15em]" /> 成绩录入</h2>

      {/* 选择比赛 */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-1 block">选择比赛</label>
        <select
          value={selectedTournament}
          onChange={e => handleSelectTournament(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
        >
          {tournaments.map(t => (
            <option key={t.id} value={t.id}>{t.name.replace('月例赛', '')}（{t.date}）</option>
          ))}
        </select>
      </div>

      {/* 添加会员 */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-1 block">添加参赛会员</label>
        <div className="relative">
          <input
            type="text"
            value={memberSearch}
            onChange={e => setMemberSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500 pr-16"
            placeholder="搜索会员姓名..."
          />
          <div className="absolute right-1 top-0.5 bottom-0.5 flex items-center gap-1">
            <select
              value=""
              onChange={e => { if (e.target.value) { addPlayer(e.target.value); setMemberSearch('') } }}
              className="px-2 py-1 bg-golf-700 text-white rounded text-xs cursor-pointer"
            >
              <option value="">选择</option>
              {availableMembers
                .filter(m => !memberSearch || m.name.includes(memberSearch))
                .slice(0, 10)
                .map(m => (
                  <option key={m.id} value={m.id}>{m.name}（{m.id}）</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>

      {/* 成绩列表 */}
      {entries.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
          {/* 表头 */}
          <div className={`grid gap-2 px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 ${showPuttInput ? 'grid-cols-12' : 'grid-cols-10'}`}>
            <div className="col-span-4">球员</div>
            <div className={`text-center ${showPuttInput ? 'col-span-3' : 'col-span-3'}`}>总杆数</div>
            {showPuttInput && <div className="col-span-3 text-center">推杆数</div>}
            <div className={`text-center ${showPuttInput ? 'col-span-2' : 'col-span-3'}`}>操作</div>
          </div>
          {entries.map(entry => {
            const member = getMemberById(entry.memberId)
            if (!member) return null
            return (
              <div key={entry.memberId} className={`grid gap-2 px-4 py-2.5 border-t border-gray-50 items-center ${showPuttInput ? 'grid-cols-12' : 'grid-cols-10'}`}>
                <div className="col-span-4 flex items-center gap-2">
                  <img src={member.avatar} alt="" className="w-6 h-6 rounded-full bg-gray-100" />
                  <div className="min-w-0">
                    <div className="text-sm text-gray-800 truncate">{member.name}</div>
                    <div className="text-xs text-gray-400">{getMemberTee(member, getMemberGames(member.id).length)}</div>
                  </div>
                </div>
                <div className={showPuttInput ? 'col-span-3' : 'col-span-3'}>
                  <input
                    type="number"
                    min="50" max="200"
                    required
                    value={entry.grossScore || ''}
                    onChange={e => updateScore(entry.memberId, 'grossScore', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-golf-500"
                    placeholder="必填"
                  />
                </div>
                {showPuttInput && (
                  <div className="col-span-3">
                    <input
                      type="number"
                      min="18" max="60"
                      value={entry.putts || ''}
                      onChange={e => updateScore(entry.memberId, 'putts', parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-golf-500 bg-gray-50"
                      placeholder="可选"
                    />
                  </div>
                )}
                <div className={`text-center ${showPuttInput ? 'col-span-2' : 'col-span-3'}`}>
                  <button
                    onClick={() => removePlayer(entry.memberId)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    移除
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 打鸟录入 */}
      {entries.length > 0 && (
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-2 block"><Icon name="bird" className="w-3.5 h-3.5 inline-block align-[-0.1em]" /> 打鸟录入（非必填）</label>

          {/* 已录入的打鸟记录 */}
          {birdieEntries.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {birdieEntries.map((birdie, index) => {
                const member = getMemberById(birdie.memberId)
                return (
                  <div key={index} className="flex items-center gap-1.5 bg-golf-50 px-2 py-1 rounded-lg border border-golf-200">
                    <span className="text-xs text-gray-600">{member?.name}</span>
                    <span className="text-xs text-golf-700 font-medium">第{birdie.hole}洞</span>
                    <button
                      onClick={() => removeBirdie(index)}
                      className="text-xs text-red-400 hover:text-red-600 ml-1"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* 添加打鸟 */}
          <div className="flex gap-2 items-center">
            <select
              value=""
              onChange={e => {
                const memberId = e.target.value
                if (memberId) {
                  const holeInput = document.getElementById('birdie-hole-input') as HTMLInputElement
                  const hole = parseInt(holeInput?.value || '1')
                  if (hole >= 1 && hole <= 18) {
                    addBirdie(memberId, hole)
                    e.target.value = ''
                    if (holeInput) holeInput.value = '1'
                  }
                }
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500 flex-1"
            >
              <option value="">选择球员...</option>
              {entries.map(entry => {
                const member = getMemberById(entry.memberId)
                return (
                  <option key={entry.memberId} value={entry.memberId}>
                    {member?.name}
                  </option>
                )
              })}
            </select>
            <span className="text-xs text-gray-400">第</span>
            <input
              id="birdie-hole-input"
              type="number"
              min="1"
              max="18"
              defaultValue="1"
              className="w-16 px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-golf-500"
            />
            <span className="text-xs text-gray-400">洞</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">选择球员并输入洞号，自动添加到百鸟记录</p>
        </div>
      )}

      {/* 比赛照片录入 */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-1 block">比赛照片</label>
        
        {/* 已上传照片预览 */}
        {photos.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mb-3">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={photo} alt={`比赛照片${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* 上传按钮 */}
        <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-golf-500 hover:bg-golf-50 transition-colors">
          <div className="text-center">
            <div className="text-2xl mb-1"><Icon name="camera" className="w-7 h-7 mx-auto" /></div>
            <div className="text-xs text-gray-500">点击上传比赛照片</div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 保存按钮 */}
      <button
        onClick={handleSave}
        disabled={!selectedTournament || entries.length === 0 || entries.some(e => !e.grossScore || e.grossScore <= 0)}
        className="w-full py-2.5 bg-golf-700 text-white rounded-xl text-sm font-medium hover:bg-golf-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        保存成绩（{entries.length} 人）
      </button>
    </div>
  )
}

// ============ 密码验证组件 ============
function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(() => {
    // 检查 sessionStorage 中是否有验证状态
    return sessionStorage.getItem('adminVerified') === 'true'
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '666666') {
      setIsVerified(true)
      sessionStorage.setItem('adminVerified', 'true')
      setError('')
    } else {
      setError('密码错误，请重试')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsVerified(false)
    sessionStorage.removeItem('adminVerified')
    setPassword('')
  }

  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Icon name="lock" className="w-16 h-16 mb-4 block" />
        <h2 className="text-lg font-bold text-gray-800 mb-2">管理后台</h2>
        <p className="text-gray-500 mb-6">请输入密码以进入管理页面</p>
        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="请输入密码"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-golf-500 text-center"
            autoFocus
          />
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-golf-700 text-white rounded-xl text-sm font-medium hover:bg-golf-800 transition-colors"
          >
            进入管理页面
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          <Icon name="unlock" className="w-4 h-4 inline-block align-[-0.1em]" /> 退出管理
        </button>
      </div>
      {children}
    </>
  )
}

// ============ 管理员主页 ============
export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('tournament')

  const tabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'tournament', label: '发布比赛', icon: 'stadium' },
    { key: 'scores', label: '成绩录入', icon: 'pencil' },
    { key: 'members', label: '会员管理', icon: 'people' },
    { key: 'announcement', label: '公告管理', icon: 'megaphone' },
    { key: 'birdie', label: '百鸟记录', icon: 'bird' },
    { key: 'finance', label: '会费记录', icon: 'moneybag' },
  ]

  return (
    <PasswordGate>
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-gray-900 mb-1"><Icon name="wrench" className="w-5 h-5 inline-block align-[-0.15em]" /> 管理后台</h1>
        <p className="text-sm text-gray-500 mb-6">录入成绩、维护会员名单、发布比赛</p>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                tab === t.key
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white/80 border border-white/50'
              }`}
              style={tab === t.key ? { background: 'linear-gradient(135deg, #2e4f24 0%, #4e7e3a 100%)' } : { background: 'rgba(255, 255, 255, 0.8)' }}
            >
              <Icon name={t.icon} className="w-4 h-4 inline-block align-[-0.15em]" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'members' && <MemberManager />}
        {tab === 'tournament' && <TournamentCreator />}
        {tab === 'scores' && <ScoreInput />}
        {tab === 'announcement' && <AnnouncementManager />}
        {tab === 'birdie' && <BirdieRecordManager />}
        {tab === 'finance' && <FinanceManager />}
      </div>
    </PasswordGate>
  )
}

// ============ 百鸟记录管理 ============
function BirdieRecordManager() {
  const { birdieRecords, members, addBirdieRecord, deleteBirdieRecord, updateBirdieRecord, tournaments } = useStore()
  const [form, setForm] = useState({
    memberId: '',
    location: '',
    date: '',
    hole: '',
    note: '',
    type: 'course' as 'simulator' | 'course',
  })

  // 获取下一个可用的鸟号
  const getNextNumber = () => {
    const usedNumbers = birdieRecords.map(r => r.number)
    for (let i = 1; i <= 100; i++) {
      if (!usedNumbers.includes(i)) return i
    }
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextNum = getNextNumber()
    if (!nextNum) {
      alert('百鸟记录已满！')
      return
    }
    if (!form.memberId) {
      alert('请选择打鸟人')
      return
    }

    addBirdieRecord({
      number: nextNum,
      memberId: form.memberId,
      location: form.location.trim() || '-',
      date: form.date || '',
      hole: form.hole ? parseInt(form.hole) : undefined,
      note: form.note.trim() || undefined,
      type: form.type,
    })

    // 重置表单，保留类型
    setForm({
      memberId: '',
      location: '',
      date: '',
      hole: '',
      note: '',
      type: form.type,
    })
    alert(`第${nextNum}鸟记录添加成功！`)
  }

  const nextNumber = getNextNumber()
  const sortedRecords = [...birdieRecords].sort((a, b) => a.number - b.number)

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4"><Icon name="bird" className="w-5 h-5 inline-block align-[-0.15em]" /> 百鸟记录管理</h2>

      {/* 进度 */}
      <div className="bg-golf-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">百鸟进度</span>
          <span className="text-lg font-bold text-golf-700">{birdieRecords.length} / 100</span>
        </div>
        {nextNumber && (
          <div className="text-xs text-gray-500 mt-1">
            建议下一个鸟号：{nextNumber}
          </div>
        )}
      </div>

      {/* 添加表单 */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-700">添加打鸟记录</h3>
          <span className="text-xs text-golf-600 bg-golf-50 px-2 py-1 rounded-full">
            第 {nextNumber || '—'} 鸟
          </span>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">打鸟人 *</label>
          <select
            required
            value={form.memberId}
            onChange={e => setForm({ ...form, memberId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
          >
            <option value="">选择会员</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">类型</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as 'simulator' | 'course' })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
            >
              <option value="course">球场</option>
              <option value="simulator">模拟器</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">日期 (可选)</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
            />
          </div>
        </div>
        {form.type === 'course' ? (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">球场 (可选)</label>
            <CourseSearchInput
              value={form.location}
              onChange={(v) => setForm({ ...form, location: v })}
              onSelect={(course) => setForm({ ...form, location: course.name })}
              required={false}
            />
          </div>
        ) : (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">模拟器地点 (可选)</label>
            <input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              placeholder="输入模拟器地点"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">洞号 (可选)</label>
            <input
              type="number"
              min="1"
              max="18"
              value={form.hole}
              onChange={e => setForm({ ...form, hole: e.target.value })}
              placeholder="1-18"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">备注 (可选)</label>
            <input
              type="text"
              value={form.note}
              onChange={e => setForm({ ...form, note: e.target.value })}
              placeholder="可选"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-golf-700 text-white rounded-lg text-sm font-medium hover:bg-golf-800 transition-colors"
        >
          添加打鸟记录
        </button>
      </form>

      {/* 记录列表 */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-700">已有记录 ({birdieRecords.length})</h3>
        {sortedRecords.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">暂无打鸟记录</div>
        )}
        {sortedRecords.map(record => {
          const member = members.find(m => m.id === record.memberId)
          return (
            <div key={record.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-golf-100 text-golf-700 flex items-center justify-center text-xs font-bold">
                  {record.number}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-5 h-5 rounded-full" />
                    )}
                    <span className="text-sm font-medium">{member?.name || '未知'}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {record.type === 'simulator' && <span className="mr-1">模拟器</span>}
                    {record.location && record.location !== '-' && <><Icon name="pin" className="w-3 h-3 inline-block" /> {record.location}</>}
                    {record.date && ((record.location && record.location !== '-') ? ` · ${record.date}` : record.date)}
                    {record.hole && ` · 第${record.hole}洞`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (record.date) {
                      updateBirdieRecord(record.id, { date: undefined })
                    }
                  }}
                  className="text-xs text-blue-400 hover:text-blue-600 px-2 py-1"
                  title={record.date ? "清除日期" : "日期已为空"}
                >
                  {record.date ? "清日期" : "—"}
                </button>
                <button
                  onClick={() => deleteBirdieRecord(record.id)}
                  className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                >
                  删除
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============ 公告管理 ============
function AnnouncementManager() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useStore()
  const [content, setContent] = useState('')

  const handleAdd = () => {
    if (!content.trim()) return
    addAnnouncement(content.trim())
    setContent('')
  }

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4"><Icon name="megaphone" className="w-5 h-5 inline-block align-[-0.15em]" /> 公告管理</h2>

      {/* 添加公告 */}
      <div className="bg-golf-50 rounded-xl p-4 mb-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">添加新公告</h3>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500 resize-none"
          rows={3}
          placeholder="输入公告内容..."
        />
        <button
          onClick={handleAdd}
          disabled={!content.trim()}
          className="mt-2 px-4 py-2 bg-golf-700 text-white rounded-lg text-sm hover:bg-golf-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          发布公告
        </button>
      </div>

      {/* 公告列表 */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-700">现有公告（{announcements.length}）</h3>
        {announcements.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">暂无公告</div>
        )}
        {announcements.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-sm text-gray-700 mb-2">{a.content}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{new Date(a.createTime).toLocaleString('zh-CN')}</span>
              <button
                onClick={() => deleteAnnouncement(a.id)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ 会费记录 ============
function FinanceManager() {
  const { members, tournaments, membershipFees, expenses, addMembershipFee, deleteMembershipFee, addExpense, deleteExpense } = useStore()
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income')

  // 2026年会费收入表单
  const [feeForm, setFeeForm] = useState({
    memberId: '',
    amount: 1800,
    year: 2026,
    type: 'regular' as 'regular' | 'sponsor',
    note: '',
    paymentDate: new Date().toISOString().slice(0, 10),
    validityPeriod: '2026年4月 - 2027年4月',
  })

  // 支出表单
  const [expenseForm, setExpenseForm] = useState({
    tournamentId: '',
    category: 'meal' as 'meal' | 'prize' | 'other',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  })

  // 统计
  const totalIncome = membershipFees.reduce((sum, f) => sum + f.amount, 0)
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  // 2026年数据筛选
  const year2026Fees = membershipFees.filter(f => f.year === 2026)
  const year2026Expenses = expenses.filter(e => e.date.startsWith('2026'))

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feeForm.memberId) {
      alert('请选择会员')
      return
    }
    addMembershipFee({
      memberId: feeForm.memberId,
      amount: feeForm.amount,
      year: feeForm.year,
      type: feeForm.type,
      note: feeForm.note,
      paymentDate: feeForm.paymentDate,
      validityPeriod: feeForm.validityPeriod,
    })
    setFeeForm({ memberId: '', amount: 1800, year: 2026, type: 'regular', note: '', paymentDate: new Date().toISOString().slice(0, 10), validityPeriod: '2026年4月 - 2027年4月' })
    alert('会费记录添加成功！')
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(expenseForm.amount)
    if (!amount || amount <= 0) {
      alert('请输入有效的金额')
      return
    }
    addExpense({
      tournamentId: expenseForm.tournamentId || undefined,
      category: expenseForm.category,
      amount,
      date: expenseForm.date,
      note: expenseForm.note,
    })
    setExpenseForm({ tournamentId: '', category: 'meal', amount: '', date: new Date().toISOString().slice(0, 10), note: '' })
    alert('支出记录添加成功！')
  }

  // 批量添加2026年会费
  const handleBatchAdd2026 = () => {
    const regularMembers = members.filter(m => m.id !== '新来的托' && m.id !== '大面' && m.id !== '国弘')
    let added = 0
    regularMembers.forEach(member => {
      if (!year2026Fees.some(f => f.memberId === member.id && f.type === 'regular')) {
        addMembershipFee({
          memberId: member.id,
          amount: 1800,
          year: 2026,
          type: 'regular',
          note: '2026年会费',
          paymentDate: new Date().toISOString().slice(0, 10),
          validityPeriod: '2026年4月 - 2027年4月',
        })
        added++
      }
    })
    // 新来的托和大面也交1800会费
    if (!year2026Fees.some(f => f.memberId === '新来的托' && f.type === 'regular')) {
      addMembershipFee({
        memberId: '新来的托',
        amount: 1800,
        year: 2026,
        type: 'regular',
        note: '2026年会费',
        paymentDate: new Date().toISOString().slice(0, 10),
        validityPeriod: '2026年4月 - 2027年4月',
      })
      added++
    }
    if (!year2026Fees.some(f => f.memberId === '大面' && f.type === 'regular')) {
      addMembershipFee({
        memberId: '大面',
        amount: 1800,
        year: 2026,
        type: 'regular',
        note: '2026年会费',
        paymentDate: new Date().toISOString().slice(0, 10),
        validityPeriod: '2026年4月 - 2027年4月',
      })
      added++
    }
    // 赞助
    if (!year2026Fees.some(f => f.memberId === '新来的托' && f.type === 'sponsor')) {
      addMembershipFee({
        memberId: '新来的托',
        amount: 3000,
        year: 2026,
        type: 'sponsor',
        note: '创始人托赞助',
        paymentDate: new Date().toISOString().slice(0, 10),
        validityPeriod: '2026年4月 - 2027年4月',
      })
      added++
    }
    if (!year2026Fees.some(f => f.memberId === '大面' && f.type === 'sponsor')) {
      addMembershipFee({
        memberId: '大面',
        amount: 1500,
        year: 2026,
        type: 'sponsor',
        note: '宣传委员面赞助',
        paymentDate: new Date().toISOString().slice(0, 10),
        validityPeriod: '2026年4月 - 2027年4月',
      })
      added++
    }
    if (!year2026Fees.some(f => f.memberId === '国弘' && f.type === 'sponsor')) {
      addMembershipFee({
        memberId: '国弘',
        amount: 500,
        year: 2026,
        type: 'sponsor',
        note: '国弘赞助',
        paymentDate: new Date().toISOString().slice(0, 10),
        validityPeriod: '2026年4月 - 2027年4月',
      })
      added++
    }
    alert(`成功添加 ${added} 条会费记录！`)
  }

  return (
    <div>
      <h2 className="text-base font-bold text-gray-800 mb-4"><Icon name="moneybag" className="w-5 h-5 inline-block align-[-0.15em]" /> 会费管理</h2>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-green-50 rounded-xl p-3 border border-green-100">
          <div className="text-xs text-green-600 mb-1">总收入</div>
          <div className="text-lg font-bold text-green-700">¥{totalIncome.toLocaleString()}</div>
        </div>
        <div className="bg-red-50 rounded-xl p-3 border border-red-100">
          <div className="text-xs text-red-600 mb-1">总支出</div>
          <div className="text-lg font-bold text-red-700">¥{totalExpense.toLocaleString()}</div>
        </div>
        <div className={`${balance >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'} rounded-xl p-3 border`}>
          <div className={`text-xs mb-1 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>余额</div>
          <div className={`text-lg font-bold ${balance >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>¥{balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'income'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Icon name="income" className="w-4 h-4 inline-block align-[-0.1em]" /> 收入记录
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'expense'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Icon name="expense" className="w-4 h-4 inline-block align-[-0.1em]" /> 支出记录
        </button>
      </div>

      {activeTab === 'income' && (
        <>
          {/* 批量添加2026年会费 */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
            <h3 className="text-sm font-bold text-gray-700 mb-2">2026年会费批量录入</h3>
            <p className="text-xs text-gray-500 mb-3">
              11位会员人均1800元 + 创始人托赞助3000元 + 宣传委员面赞助1500元 + 国弘赞助500元
            </p>
            <button
              onClick={handleBatchAdd2026}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              一键添加2026年会费
            </button>
          </div>

          {/* 添加单条收入 */}
          <form onSubmit={handleAddFee} className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-700">添加收入记录</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">会员</label>
                <select
                  value={feeForm.memberId}
                  onChange={e => setFeeForm({ ...feeForm, memberId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                >
                  <option value="">选择会员</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">金额</label>
                <input
                  type="number"
                  value={feeForm.amount}
                  onChange={e => setFeeForm({ ...feeForm, amount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">年份</label>
                <input
                  type="number"
                  value={feeForm.year}
                  onChange={e => setFeeForm({ ...feeForm, year: parseInt(e.target.value) || 2026 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">类型</label>
                <select
                  value={feeForm.type}
                  onChange={e => setFeeForm({ ...feeForm, type: e.target.value as 'regular' | 'sponsor' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                >
                  <option value="regular">常规会费</option>
                  <option value="sponsor">赞助</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">缴费日期</label>
                <input
                  type="date"
                  value={feeForm.paymentDate}
                  onChange={e => setFeeForm({ ...feeForm, paymentDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">有效期</label>
                <input
                  type="text"
                  value={feeForm.validityPeriod}
                  onChange={e => setFeeForm({ ...feeForm, validityPeriod: e.target.value })}
                  placeholder="如：2026年4月 - 2027年4月"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">备注</label>
              <input
                type="text"
                value={feeForm.note}
                onChange={e => setFeeForm({ ...feeForm, note: e.target.value })}
                placeholder="可选"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              添加收入
            </button>
          </form>

          {/* 收入列表 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-700">收入记录 ({membershipFees.length})</h3>
            {membershipFees.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">暂无收入记录</div>
            )}
            {[...membershipFees].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(fee => {
              const member = members.find(m => m.id === fee.memberId)
              return (
                <div key={fee.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {member && (
                      <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                    )}
                    <div>
                      <div className="text-sm font-medium">{member?.name || '未知'}</div>
                      <div className="text-xs text-gray-400">
                        {fee.year}年 · {fee.type === 'sponsor' ? '赞助' : '会费'}
                        {fee.paymentDate && ` · 缴费:${fee.paymentDate}`}
                        {fee.validityPeriod && ` · 有效期:${fee.validityPeriod}`}
                        {fee.note && ` · ${fee.note}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-green-600">+¥{fee.amount}</span>
                    <button
                      onClick={() => deleteMembershipFee(fee.id)}
                      className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'expense' && (
        <>
          {/* 添加支出 */}
          <form onSubmit={handleAddExpense} className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
            <h3 className="text-sm font-bold text-gray-700">添加支出记录</h3>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">关联比赛（可选）</label>
              <select
                value={expenseForm.tournamentId}
                onChange={e => setExpenseForm({ ...expenseForm, tournamentId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              >
                <option value="">不关联比赛</option>
                {tournaments.map(t => (
                  <option key={t.id} value={t.id}>{t.name} - {t.courseName}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">类别</label>
                <select
                  value={expenseForm.category}
                  onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value as 'meal' | 'prize' | 'bonus' | 'drink' | 'other' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                >
                  <option value="meal">聚餐</option>
                  <option value="drink">饮料</option>
                  <option value="prize">奖品</option>
                  <option value="bonus">奖金</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">金额</label>
                <input
                  type="number"
                  value={expenseForm.amount}
                  onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">日期</label>
              <input
                type="date"
                value={expenseForm.date}
                onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">备注</label>
              <input
                type="text"
                value={expenseForm.note}
                onChange={e => setExpenseForm({ ...expenseForm, note: e.target.value })}
                placeholder="可选"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-golf-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              添加支出
            </button>
          </form>

          {/* 支出列表 */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-700">支出记录 ({expenses.length})</h3>
            {expenses.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">暂无支出记录</div>
            )}
            {[...expenses].sort((a, b) => b.createTime.localeCompare(a.createTime)).map(expense => {
              const tournament = tournaments.find(t => t.id === expense.tournamentId)
              const categoryLabels = { meal: '聚餐', prize: '奖品', bonus: '奖金', drink: '饮料', other: '其他' }
              return (
                <div key={expense.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{categoryLabels[expense.category]}</div>
                    <div className="text-xs text-gray-400">
                      {expense.date}
                      {tournament && ` · ${tournament.name}`}
                      {expense.note && ` · ${expense.note}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-red-600">-¥{expense.amount}</span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-xs text-red-400 hover:text-red-600 px-2 py-1"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function AdminLoginHint() {
  const { isAdmin, toggleAdmin } = useStore()
  return (
    <div className="text-sm text-gray-400">
      {isAdmin ? (
        <button onClick={toggleAdmin} className="text-golf-600 hover:underline">退出管理员模式</button>
      ) : (
        <button onClick={toggleAdmin} className="text-golf-600 hover:underline">切换为管理员模式</button>
      )}
    </div>
  )
}

export { AdminLoginHint }
