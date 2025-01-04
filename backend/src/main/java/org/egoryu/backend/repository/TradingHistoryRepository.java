package org.egoryu.backend.repository;

import org.egoryu.backend.entity.TradingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TradingHistoryRepository extends JpaRepository<TradingHistory, Long> {
    List<TradingHistory> findAllByStockId(Long stock_id);
}
