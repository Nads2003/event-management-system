package org.example.eventhubbackend.dto.Event;

import lombok.Data;
import org.example.eventhubbackend.entity.event.EventCategory;

import java.time.LocalDateTime;

@Data
public class EventUpdateRequest {
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String location;
    private String address;
    private String city;
    private Integer capacity;
    private EventCategory category;

}
