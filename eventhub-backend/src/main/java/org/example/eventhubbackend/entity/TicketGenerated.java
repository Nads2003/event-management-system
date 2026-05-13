package org.example.eventhubbackend.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets_generated")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketGenerated {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String qrCode;

    @Column(unique = true)
    private String ticketNumber;

    private Boolean isChecked = false;
    private LocalDateTime checkedAt;
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "reservation_item_id")
    private ReservationItem reservationItem;

    @ManyToOne
    @JoinColumn(name = "checked_by")
    private User checkedBy;
}
