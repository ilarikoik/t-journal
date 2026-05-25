export type Direction = 'LONG' | 'SHORT'
export type Outcome = 'WIN' | 'LOSS' | 'BREAKEVEN'

export interface Trade {
  id: number
  ticker: string
  direction: Direction
  entryPrice: number
  exitPrice: number
  shares: number
  entryDate: string
  exitDate: string
  setupTag?: string
  notes?: string
  imageUrl?: string
  pnl: number
  pnlPercent: number
  outcome: Outcome
  createdAt: string
}

export interface TradeFormData {
  ticker: string
  direction: Direction
  entryPrice: number
  exitPrice: number
  shares: number
  entryDate: string
  exitDate: string
  setupTag?: string
  notes?: string
  image?: File
}

export interface TradeStats {
  totalTrades: number
  winRate: number
  totalPnl: number
  avgWin: number
  avgLoss: number
  profitFactor: number
  bestTrade: number
  worstTrade: number
}
