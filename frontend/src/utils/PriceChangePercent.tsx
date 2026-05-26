
// const priceChange = ((trade.exitPrice - trade.entryPrice) / trade.entryPrice * 100).toFixed(2)

export default function PriceChangePercent({ entryPrice, exitPrice }: { entryPrice: number; exitPrice: number }) {
  const priceChange = ((exitPrice - entryPrice) / entryPrice * 100).toFixed(2)
//   const color = priceChange >= 0 ? '#22c55e' : '#ef4444'

  return (
    <span >
        
      {/* {priceChange >= 0 ? '+' : ''}{priceChange}% */}
      {priceChange}%
    </span>
  )
}