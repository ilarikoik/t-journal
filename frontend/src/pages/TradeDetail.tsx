import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tradeService } from '@/services/tradeService'
import type { Trade } from '@/types/trade'
import { format } from 'date-fns'

export default function TradeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trade, setTrade] = useState<Trade | null>(null)
  const [form, setForm] = useState<Partial<Trade>>({})

  useEffect(() => {
    if (id) tradeService.getById(Number(id)).then(t => {
      setTrade(t)
      setForm(t) // alustetaan form vasta kun data on saatu
    }).catch(() => navigate('/trades'))
  }, [id])

  if (!trade) return <p style={{ color: '#64748b' }}>Ladataan...</p>

  const pnlColor = trade.pnl >= 0 ? '#22c55e' : '#ef4444'

  const handleSave = async () => {
    await tradeService.update(trade.id, form)
  }

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
            {trade.pnlPercent.toFixed(2)}%
            </p>
            <p className="text-sm" style={{ color: pnlColor }}>
            {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}</p>
            <p className="text-xs" style={{ color: '#64748b' }}>
  *osittaisilla myynneillä ei tarkka $
</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {([
            ['Entry', 'entryPrice'],
            ['Exit', 'exitPrice'],
            ['Shares', 'shares'],
            ['Setup', 'setupTag'],
               // tänne sitten treidi tunteet treidin jälkeen
            // miten treidissä kävi ja miksi?
            // mitä vois parantaa?
          ] as [string, keyof Trade][]).map(([label, key]) => (
            <div key={key}>
              <p className="text-xs" style={{ color: '#64748b' }}>{label}</p>
              <input
                value={String(form[key] ?? '')}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                onBlur={handleSave}
                className="font-mono bg-transparent border-b outline-none w-full"
                style={{ color: '#e2e8f0', borderColor: '#1e1e2e' }}
              />
            </div>
          ))}
          <div>
            <p className="text-xs" style={{ color: '#64748b' }}>Entry Date</p>
            <p className="font-mono" style={{ color: '#e2e8f0' }}>{format(new Date(trade.entryDate), 'MMM d, yyyy HH:mm')}</p>
          </div>
          <div>
            <p className="text-xs" style={{ color: '#64748b' }}>Exit Date</p>
            <p className="font-mono" style={{ color: '#e2e8f0' }}>{format(new Date(trade.exitDate), 'MMM d, yyyy HH:mm')}</p>
          </div>
          
        </div>
        {/* <p className="text-xs" style={{ color: '#64748b' }}>Ositainen myynti osakkeet yhteensä</p>
        <textarea placeholder='Miinusta nää osakkeet alkuperäisestä määrästä joten nään paljon '></textarea> */}
       
        <div>
      <p className="text-xs" style={{ color: '#64748b' }}>Notes</p>
      <textarea
        value={form.notes ?? ''}
        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        onBlur={handleSave}
        rows={3}
        className="font-mono bg-transparent border-b outline-none w-full resize-none"
        style={{ backgroundColor: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '0.375rem', padding: '0.5rem', color: '#e2e8f0' }}
      />
            <p className="text-xs" style={{ color: '#64748b' }}>Miten treidissä kävi</p>
      <textarea
        // value={form.notes ?? ''}
        placeholder='Oliko onnistunut treidi? Ottaisitko uudelleen, miksi?'
        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        onBlur={handleSave}
        rows={3}
        className="font-mono bg-transparent border-b outline-none w-full resize-none text-xs"
        style={{ backgroundColor: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '0.375rem', padding: '0.5rem', color: '#e2e8f0' }}
      />
            <p className="text-xs" style={{ color: '#64748b' }}>Treidin jälkeen</p>
      <textarea
        // value={form.notes ?? ''}
        placeholder='Mitä mieltä treidistä? Mitkä tunteet jäi?'
        onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
        onBlur={handleSave}
        rows={3}
        className="font-mono bg-transparent border-b outline-none w-full resize-none text-xs"
        style={{ backgroundColor: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '0.375rem', padding: '0.5rem', color: '#e2e8f0' }}
      />
    </div>
   
      </div>
    </div>  
  )
}