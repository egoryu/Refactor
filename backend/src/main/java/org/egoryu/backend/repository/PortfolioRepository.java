package org.egoryu.backend.repository;

import org.egoryu.backend.entity.Portfolio;
import org.egoryu.backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByUser(Users users);
}
