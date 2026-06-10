package com.tradingjournal.service;

import com.tradingjournal.dto.TradeStatsDto;
import com.tradingjournal.model.Trade;
import com.tradingjournal.model.User;
import com.tradingjournal.repository.TradeRepository;
import com.tradingjournal.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository repo;
    private final UserRepository userRepository;
    private static final String UPLOAD_DIR = "uploads/";

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Käyttäjää ei löydy"));
    }

    public List<Trade> findAll() {
        return repo.findAllByUserOrderByCreatedAtDesc(getCurrentUser());
    }

    private String saveImage(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + filename);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/" + filename;
    }

    public Trade create(Trade trade, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            trade.setImageUrl(saveImage(image));
        }
        trade.setUser(getCurrentUser());
        return repo.save(trade);
    }

    public Trade findById(Long id) {
        return repo.findById(id)
                .filter(t -> t.getUser().getId().equals(getCurrentUser().getId()))
                .orElseThrow(() -> new RuntimeException("Trade not found: " + id));
    }

    public void delete(Long id) {
        findById(id); // tarkistaa että treidi kuuluu käyttäjälle
        repo.deleteById(id);
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
        existing.setReview(updated.getReview());
        if (image != null && !image.isEmpty()) {
            existing.setImageUrl(saveImage(image));
        }
        return repo.save(existing);
    }

    public TradeStatsDto getStats() {
        User user = getCurrentUser();
        List<Trade> trades = repo.findAllByUserOrderByCreatedAtDesc(user);
        long total = trades.size();
        if (total == 0)
            return TradeStatsDto.builder().build();

        long wins = trades.stream().filter(t -> t.getOutcome() == Trade.Outcome.WIN).count();
        double winPnl = trades.stream().filter(t -> t.getOutcome() == Trade.Outcome.WIN)
                .mapToDouble(Trade::getPnl).sum();
        double lossPnl = trades.stream().filter(t -> t.getOutcome() == Trade.Outcome.LOSS)
                .mapToDouble(t -> Math.abs(t.getPnl())).sum();

        double totalPnl = trades.stream()
                .filter(t -> t.getPnl() != null && !Double.isNaN(t.getPnl()))
                .mapToDouble(Trade::getPnl).sum();

        return TradeStatsDto.builder()
                .totalTrades(total)
                .winRate(total > 0 ? (double) wins / total * 100 : 0)
                .totalPnl(totalPnl)
                .avgWin(wins > 0 ? winPnl / wins : 0)
                .avgLoss(total - wins > 0 ? lossPnl / (total - wins) : 0)
                .profitFactor(lossPnl > 0 ? winPnl / lossPnl : 0)
                .bestTrade(trades.stream().mapToDouble(t -> t.getPnl() != null ? t.getPnl() : 0).max().orElse(0))
                .worstTrade(trades.stream().mapToDouble(t -> t.getPnl() != null ? t.getPnl() : 0).min().orElse(0))
                .build();
    }
}
