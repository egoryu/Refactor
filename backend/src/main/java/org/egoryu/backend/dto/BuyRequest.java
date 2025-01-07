package org.egoryu.backend.dto;

import lombok.Data;

@Data
public class BuyRequest {
    private Integer amount;
    private Long stock_id;
}
