import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authService,
  setToken,
  setUsernameStorage,
} from "@/services/authService";
import TextField from "@/components/TextField";

export default function LandingPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Enter username and password");
      return;
    }
    try {
      setLoading(true);
      const res = isRegister
        ? await authService.register(username, password)
        : await authService.login(username, password);

      setToken(res.token);
      setUsernameStorage(username);

      navigate("/");
    } catch {
      setError(
        isRegister ? "Registration failed" : "Invalid username or password",
      );
    } finally {
      setLoading(false);
    }
  };

  const loginWithTestAccount = async () => {
    try {
      setLoading(true);
      const res = await authService.login("testi", "testi");
      setToken(res.token);
      setUsernameStorage("testi");
      navigate("/");
    } catch (error) {
      setError("Failed to login with test account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg,#0a0a0f 0%,#111118 50%,#0f172a 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="flex items-center justify-between mb-20">
          <div
            className="text-2xl font-bold font-mono"
            style={{ color: "#00d4aa" }}
          >
            Swing Trading Journal
          </div>

          {/* <div className="text-sm text-slate-400">Track. Analyze. Improve.</div> */}
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* <div
              className="inline-flex px-4 py-2 rounded-full mb-6 text-sm"
              style={{
                background: "rgba(0,212,170,.12)",
                color: "#00d4aa",
              }}
            >
              Swing Trading Journal
            </div> */}

            <h1 className="text-5xl lg:text-4xl font-bold leading-tight text-white">
              Improve your trading with data driven insights
              {/* <span style={{ color: "#00d4aa" }}> swing-treidaajaksi</span> */}
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              Save every trade, track your winrate, analyze P&L and build your
              own personal trading journal to learn from your successes and
              mistakes.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "#111118",
                  borderColor: "#1e293b",
                }}
              >
                <p className="text-slate-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-green-400">68%</p>
              </div>

              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "#111118",
                  borderColor: "#1e293b",
                }}
              >
                <p className="text-slate-400 text-sm">Trades</p>
                <p className="text-2xl font-bold text-white">247</p>
              </div>

              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "#111118",
                  borderColor: "#1e293b",
                }}
              >
                <p className="text-slate-400 text-sm">P&L</p>
                <p className="text-2xl font-bold text-green-400">+12 840$</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-12">
              <TextField
                title="📊 Win Rate Tracking"
                text="Follow your performance."
              />

              <TextField
                title="💰 P&L Analytics"
                text="See your profits, losses, averages and best trades."
              />

              <TextField
                title="📝 Trade Notes"
                text="Record your thoughts, mistakes and lessons from each trade."
              />

              <TextField
                title="🎯 Setup Journal"
                text="Save your best setups with images and comments. (coming soon)"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="rounded-3xl border p-8"
            style={{
              backgroundColor: "#111118",
              borderColor: "#1e1e2e",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {isRegister ? "Create Account" : "Log In"}
            </h2>

            <p className="text-slate-400 mb-8">
              Start tracking your trades today for free.
            </p>

            <div className="space-y-4">
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border bg-[#0a0a0f] text-white"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border bg-[#0a0a0f] text-white"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
    w-full mt-6 py-3 rounded-xl font-semibold
    transition-all duration-200
    hover:cursor-pointer
    hover:brightness-110
    hover:scale-[1.02]
    active:scale-[0.98]
  "
              style={{
                backgroundColor: "#00d4aa",
                color: "#0a0a0f",
              }}
            >
              {loading ? "..." : isRegister ? "Register" : "Log In"}
            </button>

            <button
              onClick={loginWithTestAccount}
              disabled={loading}
              className="
    w-full mt-6 py-2 rounded-xl font-semibold
    transition-all duration-200
    hover:cursor-pointer
    hover:brightness-125
    hover:scale-[1.02]
    active:scale-[0.98]
  "
              style={{
                background: "linear-gradient(135deg, #1e293b, #5b21b6)",
                color: "#ffffff",
              }}
            >
              Log In With Test Account
            </button>

            <button
              onClick={() => setIsRegister(!isRegister)}
              className="
    w-full mt-4 text-sm text-slate-400
    transition-colors duration-200
    hover:text-violet-300
    hover:cursor-pointer
  "
            >
              {isRegister
                ? "Already have an account? Log In"
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
