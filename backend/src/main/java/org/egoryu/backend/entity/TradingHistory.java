package org.egoryu.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "trading_history")
public class TradingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @Column(name = "sell_time", nullable = false)
    private Timestamp sellTime;

    @Column(name = "amount", nullable = false)
    @Min(value = 1, message = "Amount must be greater than zero")
    private int amount;

    @Column(name = "price", nullable = false)
    @Min(value = 1, message = "Price must be greater than zero")
    private double price;

    @Column(name = "type", nullable = false)
    private short type;
}
