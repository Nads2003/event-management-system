package org.example.eventhubbackend.dto.ticket;

import lombok.Builder;
import lombok.Data;
import org.example.eventhubbackend.entity.ticket.TicketType;

import java.math.BigDecimal;

@Data
@Builder
public class TicketResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer quantity;

    private Integer quantityAvailable;

    private TicketType ticketType;
}