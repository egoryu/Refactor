package org.egoryu.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stock_price")
public class StockPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false, referencedColumnName = "id")
    private Stock stock;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "price", nullable = false)
    private double price;
}
