package org.egoryu.backend.service;

import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.StockCategoryRequest;
import org.egoryu.backend.dto.StockFullRequest;
import org.egoryu.backend.dto.StockPriceRequest;
import org.egoryu.backend.dto.StockRequest;
import org.egoryu.backend.entity.*;
import org.egoryu.backend.repository.*;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;
    private final CategoryRepository categoryRepository;
    private final TradingHistoryRepository tradingHistoryRepository;
    private final StockPriceRepository stockPriceRepository;
    private final UserService userService;
    private final PortfolioRepository portfolioRepository;
    private final PortfolioItemRepository portfolioItemRepository;

    public List<StockRequest> getAllStocks() {
        List<Stock> stocks = stockRepository.findAll();
        return stocks.stream().map(stock -> new StockRequest(stock.getCategory().getId(), stock.getId(), stock.getName())).collect(Collectors.toList());
    }

    public List<StockCategoryRequest> getAllCategory() {
        List<StockCategory> categories = categoryRepository.findAll();
        return categories.stream().filter(category -> category.getParent() != null).map(category -> new StockCategoryRequest(category.getId(), category.getName())).collect(Collectors.toList());
    }

    public List<StockPriceRequest> getAllPrice(Long id) {
        List<StockPrice> histories = stockPriceRepository.findAllByStockId(id);
        return histories.stream().map(history -> new StockPriceRequest(history.getDate(), history.getPrice())).collect(Collectors.toList());
    }

    public StockFullRequest getStockInfo(Long id) {
        Optional<Stock> stockOptional = stockRepository.findById(id);

        if (stockOptional.isEmpty()) {
            throw new RuntimeException("Нет такой акции");
        }

        Stock stock = stockOptional.get();
        return new StockFullRequest(stock.getCategory().getId(), stock.getId(), stock.getName(), stock.getCurrency().getName(), stock.getDescription());
    }

    public String buyStock(Integer amount, Long id) {
        Users user = userService.getCurrentUser();

        Optional<Stock> stockOptional = stockRepository.findById(id);

        if (stockOptional.isEmpty()) {
            throw new RuntimeException("Нет такой акции");
        }

        List<StockPrice> histories = stockPriceRepository.findAllByStockIdOrderByDate(id);

        tradingHistoryRepository.save(TradingHistory.builder()
                .sellTime(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .amount(amount)
                .type((short) 0)
                .stock(stockOptional.get())
                .price(histories.get(histories.size() - 1).getPrice()).build());

        Optional<Portfolio> portfolioOptional = portfolioRepository.findByUser(user);

        Portfolio portfolio = portfolioOptional.orElseGet(() -> portfolioRepository.save(Portfolio.builder()
                .user(user)
                .creationDate(new Timestamp(System.currentTimeMillis()))
                .currency(stockOptional.get().getCurrency())
                .name(user.getName() + ' ' + user.getSurname()).build()));

        Optional<PortfolioItem> portfolioItemOptional = portfolioItemRepository.findByStockAndPortfolio(stockOptional.get(), portfolio);

        if (portfolioItemOptional.isEmpty()) {
            portfolioItemRepository.save(PortfolioItem.builder()
                    .portfolio(portfolio)
                    .amount(amount)
                    .stock(stockOptional.get()).build());
        } else {
            PortfolioItem portfolioItem = portfolioItemOptional.get();
            portfolioItem.setAmount(portfolioItem.getAmount() + amount);
            portfolioItemRepository.save(portfolioItem);
        }

        return "Куплено";
    }

    public String sellStock(Integer amount, Long id) {
        Users user = userService.getCurrentUser();

        Optional<Stock> stockOptional = stockRepository.findById(id);

        if (stockOptional.isEmpty()) {
            throw new RuntimeException("Нет такой акции");
        }

        List<StockPrice> histories = stockPriceRepository.findAllByStockIdOrderByDate(id);

        Portfolio portfolio = portfolioRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Нет портфеля"));

        PortfolioItem portfolioItem = portfolioItemRepository.findByStockAndPortfolio(stockOptional.get(), portfolio).orElseThrow(() -> new RuntimeException("Акция не куплена"));

        if (portfolioItem.getAmount() < amount) {
            throw new RuntimeException("Не хватает акций");
        }

        if (portfolioItem.getAmount() == amount) {
            portfolioItemRepository.delete(portfolioItem);
        } else {
            portfolioItem.setAmount(portfolioItem.getAmount() - amount);
            portfolioItemRepository.save(portfolioItem);
        }


        tradingHistoryRepository.save(TradingHistory.builder()
                .sellTime(new Timestamp(System.currentTimeMillis()))
                .user(user)
                .amount(amount)
                .type((short) 1)
                .stock(stockOptional.get())
                .price(histories.get(histories.size() - 1).getPrice()).build());

        return "Продано";
    }
}
