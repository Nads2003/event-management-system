package org.example.eventhubbackend.entity.ticket;

import jakarta.persistence.*;
import lombok.*;
import org.example.eventhubbackend.entity.event.Event;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TicketType type ;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal price;

    // Nombre total de billets créés
    private Integer quantity;

    // Nombre déjà vendus
    @Builder.Default
    private Integer quantitySold = 0;

    // Nombre restant
    private Integer quantityAvailable;

    private LocalDateTime saleStartDate;

    private LocalDateTime saleEndDate;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}