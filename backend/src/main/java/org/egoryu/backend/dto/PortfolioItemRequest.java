package org.egoryu.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PortfolioItemRequest {
    private Integer amount;
    private Long category_id;
    private Integer price;
    private String category;
    private String name;
}
