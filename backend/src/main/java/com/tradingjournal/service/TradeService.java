package com.tradingjournal.service;

import com.tradingjournal.dto.TradeStatsDto;
import com.tradingjournal.model.Trade;
import com.tradingjournal.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository repo;
    private static final String UPLOAD_DIR = "uploads/";

    public List<Trade> findAll() {
        return repo.findAllByOrderByExitDateDesc();
    }

    public Trade findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Trade not found: " + id));
    }

    public Trade create(Trade trade, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            trade.setImageUrl(saveImage(image));
        }
        return repo.save(trade);
    }

    public Trade update(Long id, Trade updated, MultipartFile image) throws IOException {
        Trade existing = findById(id);
        existing.setTicker(updated.getTicker());
        existing.setDirection(updated.getDirection());
        existing.setEntryPrice(updated.getEntryPrice());
        existing.setExitPrice(updated.getExitPrice());
        existing.setShares(updated.getShares());
        existing.setEntryDate(updated.getEntryDate());
        existing.setExitDate(updated.getExitDate());
        existing.setSetupTag(updated.getSetupTag());
        existing.setNotes(updated.getNotes());
        if (image != null && !image.isEmpty()) {
            existing.setImageUrl(saveImage(image));
        }
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public TradeStatsDto getStats() {
        long total = repo.count();
        if (total == 0) return TradeStatsDto.builder().build();

        long wins = repo.countWins();
        double winPnl = repo.sumWinPnl();
        double lossPnl = repo.sumLossPnl();
        double totalPnl = repo.findAll().stream().mapToDouble(Trade::getPnl).sum();

        return TradeStatsDto.builder()
                .totalTrades(total)
                .winRate(total > 0 ? (double) wins / total * 100 : 0)
                .totalPnl(totalPnl)
                .avgWin(wins > 0 ? winPnl / wins : 0)
                .avgLoss(total - wins > 0 ? lossPnl / (total - wins) : 0)
                .profitFactor(lossPnl > 0 ? winPnl / lossPnl : 0)
                .bestTrade(repo.maxPnl())
                .worstTrade(repo.minPnl())
                .build();
    }

    private String saveImage(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + filename);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/" + filename;
    }
}
