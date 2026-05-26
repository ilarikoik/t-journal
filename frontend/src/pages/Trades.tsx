import { useEffect, useState } from 'react'
import { tradeService } from '@/services/tradeService'
import type { Trade } from '@/types/trade'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function Trades() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tradeService.getAll()
      .then(setTrades)
      .catch(() => setTrades([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={{ color: '#64748b' }}>Ladataan...</p>

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: '#e2e8f0' }}>Trades</h1>
        <Link to="/trades/new" className="text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#00d4aa', color: '#0a0a0f' }}>
          + New Trade
        </Link>
      </div>

      {trades.length === 0 ? (
        <p className="text-center py-20 text-sm" style={{ color: '#64748b' }}>Ei treidejä vielä.</p>
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: '#1e1e2e' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ backgroundColor: '#111118', color: '#64748b' }}>
                {['Ticker', 'Dir', 'Entry', 'Exit', 'Shares', '%', 'Date', ''].map(h => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={t.id} className="border-t transition-colors hover:opacity-80"
                  style={{ borderColor: '#1e1e2e', backgroundColor: i % 2 === 0 ? '#0a0a0f' : '#111118' }}>
                  <td className="px-4 py-3 font-mono font-bold" style={{ color: '#e2e8f0' }}>{t.ticker}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ backgroundColor: t.direction === 'LONG' ? '#22c55e22' : '#ef444422',
                               color: t.direction === 'LONG' ? '#22c55e' : '#ef4444' }}>
                      {t.direction}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#e2e8f0' }}>${t.entryPrice}</td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#e2e8f0' }}>
                  {t.exitPrice && !isNaN(t.exitPrice) ? `$${t.exitPrice}` : '—'}
                </td>
                  <td className="px-4 py-3 font-mono" style={{ color: '#64748b' }}>{t.shares}</td>
                  <td className="px-4 py-3 font-mono font-bold"
                  style={{ color: t.exitPrice && t.pnlPercent != null && !isNaN(t.pnlPercent)
                    ? (t.pnl >= 0 ? '#22c55e' : '#ef4444')
                    : '#f59e0b' }}>
                  {t.exitPrice && t.pnlPercent != null && !isNaN(t.pnlPercent)
                    ? `${t.pnl >= 0 ? '+' : ''}${t.pnlPercent.toFixed(2)}%`
                    : '—'}
                </td>
                  <td className="px-4 py-3" style={{ color: '#64748b' }}>
                    {format(new Date(t.entryDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/trades/${t.id}`} style={{ color: '#00d4aa' }} className="hover:underline">→</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
