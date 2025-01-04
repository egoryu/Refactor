package org.egoryu.backend.service;

import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.PortfolioItemRequest;
import org.egoryu.backend.entity.Portfolio;
import org.egoryu.backend.entity.StockPrice;
import org.egoryu.backend.entity.Ticket;
import org.egoryu.backend.entity.Users;
import org.egoryu.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final PortfolioRepository portfolioRepository;
    private final UserService userService;
    private final StockPriceRepository stockPriceRepository;
    private final PortfolioItemRepository portfolioItemRepository;
    private final TicketRepository ticketRepository;

    public List<PortfolioItemRequest> getPortfolio() {
        Users user = userService.getCurrentUser();

        Portfolio portfolio = portfolioRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Ничего не куплено"));

        return portfolioItemRepository.findAllByPortfolio(portfolio).stream().map(item -> {
            List<StockPrice> histories = stockPriceRepository.findAllByStockIdOrderByDate(item.getStock().getId());

            return PortfolioItemRequest.builder()
                    .amount((int) item.getAmount())
                    .category(item.getStock().getCategory().getName())
                    .category_id(item.getStock().getCategory().getId())
                    .name(item.getStock().getName())
                    .price((int) histories.get(histories.size() - 1).getPrice())
                    .build();
        }).collect(Collectors.toList());
    }

    public String createTicket(String title, String content) {
        ticketRepository.save(Ticket.builder().content(content).title(title).user(userService.getCurrentUser()).build());
        return "Создано";
    }
}
