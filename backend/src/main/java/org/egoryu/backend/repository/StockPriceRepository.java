package org.egoryu.backend.repository;

import org.egoryu.backend.entity.StockPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice, Long> {
    List<StockPrice> findAllByStockId(Long stock_id);
    List<StockPrice> findAllByStockIdOrderByDate(Long stock_id);
}
