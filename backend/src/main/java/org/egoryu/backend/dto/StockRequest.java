package org.egoryu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockRequest {
    private Long category_id;
    private Long id;
    private String name;
}
