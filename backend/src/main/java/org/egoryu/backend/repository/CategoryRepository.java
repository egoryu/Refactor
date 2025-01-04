package org.egoryu.backend.repository;

import org.egoryu.backend.entity.StockCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<StockCategory, Long> {

}
