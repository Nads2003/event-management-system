package org.example.eventhubbackend.dto;

import lombok.Data;
import org.example.eventhubbackend.entity.MediaType;

@Data
public class EventMediaRequest {
    private String url;
    private MediaType type;
}
