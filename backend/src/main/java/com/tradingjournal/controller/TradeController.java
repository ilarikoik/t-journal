package com.tradingjournal.controller;

import com.tradingjournal.dto.TradeStatsDto;
import com.tradingjournal.model.Trade;
import com.tradingjournal.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService service;

    @GetMapping
    public List<Trade> getAll() {
        return service.findAll();
    }

    @GetMapping("/stats")
    public TradeStatsDto getStats() {
        return service.getStats();
    }

    @GetMapping("/{id}")
    public Trade getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Trade> create(
            @RequestParam String ticker,
            @RequestParam String direction,
            @RequestParam Double entryPrice,
            @RequestParam Double exitPrice,
            @RequestParam Integer shares,
            @RequestParam String entryDate,
            @RequestParam String exitDate,
            @RequestParam(required = false) String setupTag,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        Trade trade = Trade.builder()
                .ticker(ticker.toUpperCase())
                .direction(Trade.Direction.valueOf(direction))
                .entryPrice(entryPrice)
                .exitPrice(exitPrice)
                .shares(shares)
                .entryDate(LocalDateTime.parse(entryDate))
                .exitDate(LocalDateTime.parse(exitDate))
                .setupTag(setupTag)
                .notes(notes)
                .build();

        return ResponseEntity.ok(service.create(trade, image));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trade> update(
            @PathVariable Long id,
            @RequestParam String ticker,
            @RequestParam String direction,
            @RequestParam Double entryPrice,
            @RequestParam Double exitPrice,
            @RequestParam Integer shares,
            @RequestParam String entryDate,
            @RequestParam String exitDate,
            @RequestParam(required = false) String setupTag,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) MultipartFile image) throws IOException {

        Trade trade = Trade.builder()
                .ticker(ticker.toUpperCase())
                .direction(Trade.Direction.valueOf(direction))
                .entryPrice(entryPrice)
                .exitPrice(exitPrice)
                .shares(shares)
                .entryDate(LocalDateTime.parse(entryDate))
                .exitDate(LocalDateTime.parse(exitDate))
                .setupTag(setupTag)
                .notes(notes)
                .build();

        return ResponseEntity.ok(service.update(id, trade, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
