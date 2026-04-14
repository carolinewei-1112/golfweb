import { Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import RankingPage from './pages/RankingPage'
import MemberDetailPage from './pages/MemberDetailPage'
import HistoryPage from './pages/HistoryPage'
import GameDetailPage from './pages/GameDetailPage'
import AdminPage from './pages/AdminPage'
import RulesPage from './pages/RulesPage'
import BirdiePage from './pages/BirdiePage'
import FinancePage from './pages/FinancePage'

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/member/:id" element={<MemberDetailPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/birdie" element={<BirdiePage />} />
          <Route path="/finance" element={<FinancePage />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}

export default App
