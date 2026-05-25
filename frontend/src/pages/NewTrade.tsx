import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tradeService } from '@/services/tradeService'
import type { TradeFormData } from '@/types/trade'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium" style={{ color: '#64748b' }}>{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-[#00d4aa] transition-colors font-mono"
const inputStyle = { backgroundColor: '#0a0a0f', borderColor: '#1e1e2e', color: '#e2e8f0' }

export default function NewTrade() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<TradeFormData>({
    ticker: '', direction: 'LONG', entryPrice: 0, exitPrice: 0,
    shares: 0, entryDate: '', exitDate: '', setupTag: '', notes: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const set = (k: keyof TradeFormData, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!form.ticker || !form.entryDate || !form.exitDate) {
      setError('Täytä vähintään ticker, entry date ja exit date.')
      return
    }
    setLoading(true)
    try {
      await tradeService.create({ ...form, image: image ?? undefined })
      navigate('/trades')
    } catch {
      setError('Virhe tallennuksessa. Onko backend käynnissä?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold" style={{ color: '#e2e8f0' }}>New Trade</h1>

      <div className="rounded-xl border p-6 space-y-4" style={{ backgroundColor: '#111118', borderColor: '#1e1e2e' }}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Ticker">
            <input className={inputCls} style={inputStyle} placeholder="AAPL"
              value={form.ticker} onChange={e => set('ticker', e.target.value.toUpperCase())} />
          </Field>
          <Field label="Direction">
            <select className={inputCls} style={inputStyle}
              value={form.direction} onChange={e => set('direction', e.target.value)}>
              <option value="LONG">LONG</option>
              <option value="SHORT">SHORT</option>
            </select>
          </Field>
          <Field label="Entry Price">
            <input type="number" className={inputCls} style={inputStyle} placeholder="0.00"
              value={form.entryPrice || ''} onChange={e => set('entryPrice', parseFloat(e.target.value))} />
          </Field>
          <Field label="Exit Price">
            <input type="number" className={inputCls} style={inputStyle} placeholder="0.00"
              value={form.exitPrice || ''} onChange={e => set('exitPrice', parseFloat(e.target.value))} />
          </Field>
          <Field label="Shares">
            <input type="number" className={inputCls} style={inputStyle} placeholder="100"
              value={form.shares || ''} onChange={e => set('shares', parseInt(e.target.value))} />
          </Field>
          <Field label="Setup Tag">
            <input className={inputCls} style={inputStyle} placeholder="VWAP, Breakout..."
              value={form.setupTag} onChange={e => set('setupTag', e.target.value)} />
          </Field>
          <Field label="Entry Date">
            <input type="datetime-local" className={inputCls} style={inputStyle}
              value={form.entryDate} onChange={e => set('entryDate', e.target.value)} />
          </Field>
          <Field label="Exit Date">
            <input type="datetime-local" className={inputCls} style={inputStyle}
              value={form.exitDate} onChange={e => set('exitDate', e.target.value)} />
          </Field>
        </div>

        <Field label="Notes">
          <textarea className={inputCls} style={inputStyle} rows={3} placeholder="Mitä tapahtui, mitä oppit..."
            value={form.notes} onChange={e => set('notes', e.target.value)} />
        </Field>

        <Field label="Chart Screenshot">
          <input type="file" accept="image/*" onChange={handleImage}
            className="text-sm" style={{ color: '#64748b' }} />
          {preview && <img src={preview} className="mt-2 rounded-lg max-h-48 object-contain" style={{ border: '1px solid #1e1e2e' }} />}
        </Field>

        {/* Live P&L preview */}
        {form.entryPrice > 0 && form.exitPrice > 0 && form.shares > 0 && (
          <div className="rounded-lg px-4 py-3 text-sm font-mono" style={{ backgroundColor: '#0a0a0f', border: '1px solid #1e1e2e' }}>
            {(() => {
              const pnl = (form.exitPrice - form.entryPrice) * form.shares * (form.direction === 'SHORT' ? -1 : 1)
              return (
                <span>P&L preview: <strong style={{ color: pnl >= 0 ? '#22c55e' : '#ef4444' }}>
                  {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                </strong></span>
              )
            })()}
          </div>
        )}

        {error && <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-80 disabled:opacity-40"
          style={{ backgroundColor: '#00d4aa', color: '#0a0a0f' }}>
          {loading ? 'Tallennetaan...' : 'Save Trade'}
        </button>
      </div>
    </div>
  )
}
