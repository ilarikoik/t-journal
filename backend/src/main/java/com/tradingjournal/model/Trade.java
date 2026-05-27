package com.tradingjournal.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "trades")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String ticker;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Direction direction;

    @Column(nullable = false)
    private Double entryPrice;

    @Column(nullable = true)
    private Double exitPrice;

    @Column(nullable = false)
    private Integer shares;

    @Column(nullable = false)
    private LocalDate entryDate;

    @Column(nullable = true)
    private LocalDate exitDate;

    private String setupTag;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String review;

    private String imageUrl;

    private Double pnl;
    private Double pnlPercent;

    @Enumerated(EnumType.STRING)
    private Outcome outcome;

    @Column(nullable = false)
    private LocalDate createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDate.now();
        calculatePnl();
    }

    @PreUpdate
    public void preUpdate() {
        calculatePnl();
    }

    private void calculatePnl() {
        if (exitPrice == null) {
            this.pnl = null;
            this.pnlPercent = null;
            this.outcome = null;
            return;
        }
        // if (exitDate.getYear() < 2020) {
        // this.pnl = null;
        // this.pnlPercent = null;
        // this.outcome = null;
        // return;
        // }
        double multiplier = direction == Direction.SHORT ? -1.0 : 1.0;
        this.pnl = (exitPrice - entryPrice) * shares * multiplier;
        this.pnlPercent = ((exitPrice - entryPrice) / entryPrice) * 100 * multiplier;
        this.outcome = pnl > 0 ? Outcome.WIN : pnl < 0 ? Outcome.LOSS : Outcome.BREAKEVEN;
    }

    public enum Direction {
        LONG, SHORT
    }

    public enum Outcome {
        WIN, LOSS, BREAKEVEN
    }
}
