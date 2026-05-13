package org.example.eventhubbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private  String url;
    @Enumerated(EnumType.STRING)
    private  MediaType type;
    @ManyToOne
    @JoinColumn(name = "event_id")
    private  Event event;
}
