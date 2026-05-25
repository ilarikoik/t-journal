package com.tradingjournal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TradeStatsDto {
    private long totalTrades;
    private double winRate;
    private double totalPnl;
    private double avgWin;
    private double avgLoss;
    private double profitFactor;
    private double bestTrade;
    private double worstTrade;
}
