package com.tradingjournal.controller;

import com.tradingjournal.dto.TradeStatsDto;
import com.tradingjournal.model.Trade;
import com.tradingjournal.service.TradeService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trades")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174",
        "https://t-journal.vercel.app" })
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

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Trade trade = service.findById(id);
        if (trade.getImageData() == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(trade.getImageType()))
                .body(trade.getImageData());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Trade> create(
            @RequestPart("trade") Trade trade,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        try {
            Trade trade1 = service.create(trade, image);
            return ResponseEntity.ok(service.create(trade1, image));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // @PostMapping
    // public ResponseEntity<Trade> create(
    // @RequestParam String ticker,
    // @RequestParam String direction,
    // @RequestParam Double entryPrice,
    // @RequestParam(required = false) Double exitPrice,
    // @RequestParam Integer shares,
    // @RequestParam String entryDate,
    // @RequestParam(required = false) String exitDate,
    // @RequestParam(required = false) String setupTag,
    // @RequestParam(required = false) String notes,
    // @RequestParam(required = false) String review,
    // @RequestParam(required = false) MultipartFile image) throws IOException {

    // Trade trade = Trade.builder()
    // .ticker(ticker.toUpperCase())
    // .direction(Trade.Direction.valueOf(direction))
    // .entryPrice(entryPrice)
    // .exitPrice(exitPrice)
    // .shares(shares)
    // .entryDate(LocalDate.parse(entryDate))
    // .exitDate(exitDate != null && !exitDate.isBlank() ? LocalDate.parse(exitDate)
    // : null)
    // .setupTag(setupTag)
    // .notes(notes)
    // .review(review)
    // .build();

    // return ResponseEntity.ok(service.create(trade, image));
    // }

    @PutMapping("/{id}")
    public ResponseEntity<Trade> update(
            @PathVariable Long id,
            @RequestParam String ticker,
            @RequestParam String direction,
            @RequestParam Double entryPrice,
            @RequestParam(required = false) Double exitPrice,
            @RequestParam Integer shares,
            @RequestParam String entryDate,
            @RequestParam(required = false) String exitDate,
            @RequestParam(required = false) String setupTag,
            @RequestParam(required = false) String notes,
            @RequestParam(required = false) String review,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        Trade trade = Trade.builder()
                .ticker(ticker.toUpperCase())
                .direction(Trade.Direction.valueOf(direction))
                .entryPrice(entryPrice)
                .exitPrice(exitPrice)
                .shares(shares)
                .entryDate(LocalDate.parse(entryDate))
                .exitDate(exitDate != null && !exitDate.isBlank() ? LocalDate.parse(exitDate) : null)
                .setupTag(setupTag)
                .notes(notes)
                .review(review)
                .build();
        return ResponseEntity.ok(service.update(id, trade, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
