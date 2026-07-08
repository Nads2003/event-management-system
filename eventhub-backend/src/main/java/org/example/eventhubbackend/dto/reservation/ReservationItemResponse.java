package org.example.eventhubbackend.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.eventhubbackend.dto.ticket.TicketGeneratedResponse;
import org.example.eventhubbackend.dto.ticket.TicketResponse;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationItemResponse {

    private Long id;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal subtotal;

    private TicketResponse ticket;

    private List<TicketGeneratedResponse> generatedTickets;
}