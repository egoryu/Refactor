package org.egoryu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockCategoryRequest {
    private Long id;
    private String name;
}
