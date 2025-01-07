package org.egoryu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class TradingHistoryRequest {
    private Date date;
    private double price;
}
