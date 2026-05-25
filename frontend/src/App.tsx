import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Trades from '@/pages/Trades'
import NewTrade from '@/pages/NewTrade'
import TradeDetail from '@/pages/TradeDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0f' }}>
        <nav className="border-b px-6 py-4 flex items-center gap-8" style={{ borderColor: '#1e1e2e', backgroundColor: '#111118' }}>
          <span className="text-lg font-bold tracking-tight" style={{ color: '#00d4aa', fontFamily: 'monospace' }}>
            TradeJournal
          </span>
          <div className="flex gap-6 text-sm">
            {[
              { to: '/', label: 'Dashboard' },
              { to: '/trades', label: 'Trades' },
              { to: '/trades/new', label: '+ New Trade' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'font-semibold' : 'hover:opacity-80'}`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#00d4aa' : '#64748b',
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/trades/new" element={<NewTrade />} />
            <Route path="/trades/:id" element={<TradeDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
