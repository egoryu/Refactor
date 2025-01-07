package org.egoryu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StockPriceRequest {
    private LocalDateTime date;
    private double price;
}
