import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tradeService } from '@/services/tradeService'
import type { Trade } from '@/types/trade'
import { format } from 'date-fns'

export default function TradeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trade, setTrade] = useState<Trade | null>(null)

  useEffect(() => {
    if (id) tradeService.getById(Number(id)).then(setTrade).catch(() => navigate('/trades'))
  }, [id])

  if (!trade) return <p style={{ color: '#64748b' }}>Ladataan...</p>

  const pnlColor = trade.pnl >= 0 ? '#22c55e' : '#ef4444'

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <button onClick={() => navigate('/trades')} className="text-sm hover:underline" style={{ color: '#64748b' }}>← Takaisin</button>

      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: '#111118', borderColor: '#1e1e2e' }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-mono" style={{ color: '#e2e8f0' }}>{trade.ticker}</h1>
            <span className="text-xs px-2 py-0.5 rounded font-bold"
              style={{ backgroundColor: trade.direction === 'LONG' ? '#22c55e22' : '#ef444422',
                       color: trade.direction === 'LONG' ? '#22c55e' : '#ef4444' }}>
              {trade.direction}
            </span>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-mono" style={{ color: pnlColor }}>
              {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
            </p>
            <p className="text-sm" style={{ color: pnlColor }}>{trade.pnlPercent.toFixed(2)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ['Entry', `$${trade.entryPrice}`],
            ['Exit', `$${trade.exitPrice}`],
            ['Shares', trade.shares],
            ['Setup', trade.setupTag || '—'],
            ['Entry Date', format(new Date(trade.entryDate), 'MMM d, yyyy HH:mm')],
            ['Exit Date', format(new Date(trade.exitDate), 'MMM d, yyyy HH:mm')],
            // tänne sitten treidi tunteet treidin jälkeen
            // miten treidissä kävi ja miksi?
            // mitä vois parantaa?
          ].map(([label, value]) => (
            <div key={label as string}>
              <p className="text-xs" style={{ color: '#64748b' }}>{label}</p>
              <p className="font-mono mt-0.5" style={{ color: '#e2e8f0' }}>{value}</p>
            </div>
          ))}
        </div>

        {trade.notes && (
          <div className="rounded-lg p-4" style={{ backgroundColor: '#0a0a0f', border: '1px solid #1e1e2e' }}>
            <p className="text-xs mb-2" style={{ color: '#64748b' }}>Notes</p>
            <p className="text-sm" style={{ color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>{trade.notes}</p>
          </div>
        )}

        {trade.imageUrl && (
          <div>
            <p className="text-xs mb-2" style={{ color: '#64748b' }}>Chart</p>
            <p>haloooo</p>
            <img src={trade.imageUrl} className="rounded-lg w-full object-contain max-h-96"
              style={{ border: '1px solid #1e1e2e' }} />
          </div>
        )}

        <button onClick={async () => {
          if (confirm('Poistetaanko treidi?')) {
            await tradeService.delete(trade.id)
            navigate('/trades')
          }
        }} className="text-sm hover:underline" style={{ color: '#ef4444' }}>
          Poista treidi
        </button>
      </div>
    </div>
  )
}
