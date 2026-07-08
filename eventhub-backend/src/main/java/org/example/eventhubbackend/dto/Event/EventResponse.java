package org.example.eventhubbackend.dto.Event;

import lombok.Builder;
import lombok.Data;
import org.example.eventhubbackend.dto.ticket.TicketResponse;
import org.example.eventhubbackend.dto.user.OrganizerResponse;
import org.example.eventhubbackend.entity.event.EventCategory;
import org.example.eventhubbackend.entity.event.EventStatus;
import org.example.eventhubbackend.entity.event.EventType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String city;
    private String address;

    private Integer capacity;

    private EventCategory category;
    private EventType type;

    private BigDecimal price;

    private EventStatus status;

    private List<EventMediaResponse> media;

    private OrganizerResponse organizer;

    private List<TicketResponse> tickets;
}
