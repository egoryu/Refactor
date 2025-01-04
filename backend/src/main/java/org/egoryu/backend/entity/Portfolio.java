package org.egoryu.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "portfolio")
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false, referencedColumnName = "id")
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id", nullable = false, referencedColumnName = "id")
    private Currency currency;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "creation_date", nullable = false, updatable = false)
    private Timestamp creationDate;
}
