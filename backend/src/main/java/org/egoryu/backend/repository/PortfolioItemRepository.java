package org.egoryu.backend.repository;

import org.egoryu.backend.entity.Portfolio;
import org.egoryu.backend.entity.PortfolioItem;
import org.egoryu.backend.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {
    List<PortfolioItem> findAllByPortfolio(Portfolio portfolio);
    Optional<PortfolioItem> findByStock(Stock stock);
}
