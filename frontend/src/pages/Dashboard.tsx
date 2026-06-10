import { useEffect, useState } from "react";
import { tradeService } from "@/services/tradeService";
import type { TradeStats, Trade } from "@/types/trade";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
    >
      <p className="text-xs mb-1" style={{ color: "#64748b" }}>
        {label}
      </p>
      <p
        className="text-2xl font-bold font-mono"
        style={{ color: color ?? "#e2e8f0" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<TradeStats | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    tradeService
      .getStats()
      .then(setStats)
      .catch(() => {
        // Demo data when backend not running
        setStats({
          totalTrades: 0,
          winRate: 0,
          totalPnl: 0,
          avgWin: 0,
          avgLoss: 0,
          profitFactor: 0,
          bestTrade: 0,
          worstTrade: 0,
        });
      });
    tradeService
      .getAll()
      .then(setTrades)
      .catch(() => setTrades([]));
  }, []);

  console.log("Dashboard trades loaded", trades);
  console.log("stats trades loaded", stats);
  const pnlCurve = trades
    .filter((t) => t.exitDate && t.pnl != null && !isNaN(t.pnl))
    .sort(
      (a, b) => new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime(),
    )
    .reduce<{ date: string; pnl: number }[]>((acc, t) => {
      const prev = acc[acc.length - 1]?.pnl ?? 0;
      return [
        ...acc,
        {
          date: format(new Date(t.exitDate), "MMM d"),
          pnl: +(prev + t.pnl).toFixed(2),
        },
      ];
    }, []);

  const totalPnl =
    trades
      .filter((t) => t.exitDate != null && !isNaN(t.pnl))
      .reduce((sum, t) => sum + t.pnl, 0)
      .toFixed(2) + "$";

  const avgHoldingTime =
    trades.length > 0
      ? trades.reduce((sum, t) => {
          return (
            sum +
            (t.exitDate && t.entryDate
              ? new Date(t.exitDate).getTime() - new Date(t.entryDate).getTime()
              : 0)
          );
        }, 0) / trades.length
      : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold " style={{ color: "#e2e8f0" }}>
          Dashboard
        </h1>
        <p className="text-xs text-slate-400">* Counts only finished trades</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Trades"
          value={String(stats?.totalTrades ?? "—")}
        />
        <StatCard
          label="Win Rate"
          value={stats ? `${stats.winRate.toFixed(1)}%` : "—"}
          color={
            !stats
              ? "#ef4444"
              : stats.winRate >= 30
                ? "#10b981"
                : stats.winRate >= 20
                  ? "#f97316"
                  : "#ef4444"
          }
        />
        <StatCard
          label="Total P&L"
          value={totalPnl}
          // color={stats && stats.totalPnl >= 0 ? "#22c55e" : "#ef4444"}
          color={stats && stats.totalPnl >= 0 ? "#10b981" : "#ef4444"}
        />
        <StatCard
          label="Profit Factor"
          value={
            stats && stats.profitFactor != null && !isNaN(stats.profitFactor)
              ? stats.profitFactor.toFixed(2)
              : "—"
          }
          color={stats && stats.profitFactor >= 1 ? "#00d4aa" : "#ef4444"}
        />
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
      >
        <p className="text-sm mb-4" style={{ color: "#64748b" }}>
          Cumulative P&L
        </p>
        {pnlCurve.length > 1 ? (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={pnlCurve}>
              <defs>
                <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111118",
                  border: "1px solid #1e1e2e",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#64748b" }}
                itemStyle={{ color: "#00d4aa" }}
              />
              <Area
                type="monotone"
                dataKey="pnl"
                stroke="#00d4aa"
                fill="url(#pnlGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center py-12 text-sm" style={{ color: "#64748b" }}>
            Näkyvissä kun kaksi tai useampi treidi on suljettu.
          </p>
        )}
      </div>
      <div className="h-px" style={{ backgroundColor: "#1e1e2e" }} />
      <div
        className="p-4 rounded-xl *"
        style={{ backgroundColor: "#111118", borderColor: "#1e1e2e" }}
      >
        <h3 className="mb-3 font-bold">Average Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            label="Average Win"
            value={`${stats?.avgWin?.toFixed(1) ?? "—"}$`}
            color={stats && stats.avgWin >= 1 ? "#00d4aa" : "#ef4444"}
          />

          <StatCard
            label="Average Loss"
            value={`${stats?.avgLoss?.toFixed(1) ?? "—"}$`}
            color={stats && stats.avgLoss < 0 ? "#00d4aa" : "#ef4444"}
          />

          <StatCard
            label="Average Holding Time"
            value={`${(avgHoldingTime / (1000 * 60 * 60 * 24)).toFixed(1)} days`}
          />
        </div>
      </div>
    </div>
  );
}
