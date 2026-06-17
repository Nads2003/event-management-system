package org.example.eventhubbackend.dto.Event;
import lombok.Data;
import org.example.eventhubbackend.entity.event.EventCategory;
import org.example.eventhubbackend.entity.event.EventType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRequest {

    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private String address;
    private String city;
    private Integer capacity;
    private EventCategory category;
    private EventType eventType;
    private Long organizerId;

    private List<EventMediaRequest> media;
}
