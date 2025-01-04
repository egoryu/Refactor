package org.egoryu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.egoryu.backend.dto.*;
import org.egoryu.backend.service.StockService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stocks")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;
    private final ModelMapper modelMapper;

    @GetMapping("/")
    public List<StockRequest> getStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/categories")
    public List<StockCategoryRequest> getCategories() {
        return stockService.getAllCategory();
    }

    @GetMapping("/{id}/price")
    public List<StockPriceRequest> getStockPrice(@PathVariable Long id) {
        return stockService.getAllPrice(id);
    }

    @GetMapping("/{id}")
    public StockFullRequest getStock(@PathVariable Long id) {
        return stockService.getStockInfo(id);
    }

    @PostMapping("/buy")
    public String buyStock(@RequestBody BuyRequest request) {
        return stockService.buyStock(request.getAmount(), request.getStock_id());
    }

    @PostMapping("/sell")
    public String sellStock(@RequestBody BuyRequest request) {
        return stockService.sellStock(request.getAmount(), request.getStock_id());
    }
}
