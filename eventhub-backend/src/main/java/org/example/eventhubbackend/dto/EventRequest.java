package org.example.eventhubbackend.dto;
import lombok.Data;
import org.example.eventhubbackend.entity.EventCategory;
import org.example.eventhubbackend.entity.EventType;

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
    private BigDecimal price;
    private Long organizerId;

    private List<EventMediaRequest> media;
}
