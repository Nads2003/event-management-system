package org.example.eventhubbackend.dto;

import lombok.Data;

@Data
public class ReservationRequest {
    private Long eventId;
    private Long ticketId;
    private Integer quantity;
}
