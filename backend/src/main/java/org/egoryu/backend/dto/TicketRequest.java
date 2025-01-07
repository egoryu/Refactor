package org.egoryu.backend.dto;

import lombok.Data;

@Data
public class TicketRequest {
    private String title;
    private String content;
}
