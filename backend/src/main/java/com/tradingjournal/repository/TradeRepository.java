package com.tradingjournal.repository;

import com.tradingjournal.model.Trade;
import com.tradingjournal.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAllByOrderByExitDateDesc();

    // @Query("SELECT COUNT(t) FROM Trade t WHERE t.outcome = 'WIN'")
    // long countWins();

    // @Query("SELECT COALESCE(SUM(t.pnl), 0) FROM Trade t WHERE t.outcome = 'WIN'")
    // double sumWinPnl();

    // @Query("SELECT COALESCE(SUM(ABS(t.pnl)), 0) FROM Trade t WHERE t.outcome =
    // 'LOSS'")
    // double sumLossPnl();

    // @Query("SELECT COALESCE(MAX(t.pnl), 0) FROM Trade t")
    // double maxPnl();

    // @Query("SELECT COALESCE(MIN(t.pnl), 0) FROM Trade t")
    // double minPnl();

    List<Trade> findAllByUserOrderByCreatedAtDesc(User user);
}
