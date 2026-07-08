package org.example.eventhubbackend.dto.Event;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventMediaResponse {

    private Long id;
    private String url;
    private String type;
}