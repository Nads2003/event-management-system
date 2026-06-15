package org.example.eventhubbackend.dto.Event;

import lombok.Data;
import org.example.eventhubbackend.entity.event.MediaType;

@Data
public class EventMediaRequest {
    private String url;
    private MediaType type;
}
