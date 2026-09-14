package org.example.eventhubbackend.entity.notification;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.user.User;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Builder.Default
    private Boolean isRead = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Le destinataire de la notification (user OU organizer)
    @ManyToOne
    @JoinColumn(name = "recipient_id")
    @JsonIgnoreProperties({"events", "reservations", "password"})
    private User recipient;

    // Référence optionnelle vers l'event concerné
    @ManyToOne
    @JoinColumn(name = "event_id")
    @JsonIgnoreProperties({"tickets", "reservations", "media", "organizer"})
    private Event event;

    // Référence optionnelle vers la reservation concernée
    @ManyToOne
    @JoinColumn(name = "reservation_id")
    @JsonIgnoreProperties({"items", "payment", "event", "user"})
    private Reservation reservation;
}