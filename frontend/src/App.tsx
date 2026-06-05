import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Trades from "@/pages/Trades";
import NewTrade from "@/pages/NewTrade";
import TradeDetail from "@/pages/TradeDetail";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getToken } from "./services/authService";
import IdeasAndNotes from "./pages/IdeasAndNotes";
import ProdLogin from "./pages/ProdLogin";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <SidebarProvider>
          <div
            className="flex min-h-screen w-full"
            style={{ backgroundColor: "#0a0a0f" }}
          >
            <AppSidebar />

            <main className="flex-1">
              <div
                className="flex flex-row items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "#1e1e2e", backgroundColor: "#111118" }}
              >
                <SidebarTrigger />
                <NavLink
                  to="/"
                  className="text-lg font-bold font-mono"
                  style={{ color: "#00d4aa" }}
                >
                  TradingJournal
                </NavLink>
              </div>
              {/* <div
                className="border-b px-4 py-3 flex items- justify-between gap-3"
                style={{ borderColor: "#1e1e2e", backgroundColor: "#111118" }}
              ></div> */}
              <div className="p-6">
                <Routes>
                  <Route path="/login" element={<ProdLogin />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trades"
                    element={
                      <ProtectedRoute>
                        <Trades />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trades/new"
                    element={
                      <ProtectedRoute>
                        <NewTrade />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trades/:id"
                    element={
                      <ProtectedRoute>
                        <TradeDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ideas"
                    element={
                      <ProtectedRoute>
                        <IdeasAndNotes />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
