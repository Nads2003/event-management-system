package org.example.eventhubbackend.dto;

import lombok.Data;
import org.example.eventhubbackend.entity.EventCategory;

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
