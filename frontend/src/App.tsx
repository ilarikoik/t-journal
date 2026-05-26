import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Trades from '@/pages/Trades'
import NewTrade from '@/pages/NewTrade'
import TradeDetail from '@/pages/TradeDetail'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'



function App() {
  return (
  <>
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full" style={{ backgroundColor: '#0a0a0f' }}>
          <AppSidebar />
          <main className="flex-1">
  <div className="border-b px-4 py-3 flex items- justify-between gap-3" style={{ borderColor: '#1e1e2e', backgroundColor: '#111118' }}>
    <SidebarTrigger />
    <NavLink to="/" className="text-lg font-bold font-mono" style={{ color: '#00d4aa' }}>
  TradeJournal
</NavLink>
  </div>
  <div className="p-6">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/trades" element={<Trades />} />
      <Route path="/trades/new" element={<NewTrade />} />
      <Route path="/trades/:id" element={<TradeDetail />} />
    </Routes>
  </div>
</main>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  </>
  )
}

export default App