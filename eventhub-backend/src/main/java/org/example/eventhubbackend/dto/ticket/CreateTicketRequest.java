package org.example.eventhubbackend.dto.ticket;

import lombok.Data;
import org.example.eventhubbackend.entity.ticket.TicketType;

import java.math.BigDecimal;

@Data
public class CreateTicketRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Integer quantity;

    private TicketType ticketType;
}
