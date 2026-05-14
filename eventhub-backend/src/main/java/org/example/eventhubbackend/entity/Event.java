package org.example.eventhubbackend.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
//getter et setter de variable
@Getter
@Setter
// constructeur
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private String address;
    private String city;
    private Integer capacity;
    @Enumerated(EnumType.STRING)
    private EventCategory category;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EventStatus status = EventStatus.DRAFT;
    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EventMedia>media;
    @JsonIgnoreProperties({"events", "reservations", "password"})
    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    @OneToMany(mappedBy = "event")
    private List<Reservation> reservations;
}
