package org.example.eventhubbackend.services.ticket;
import org.example.eventhubbackend.dto.ticket.CreateTicketRequest;
import org.example.eventhubbackend.dto.ticket.TicketResponse;

import java.util.List;

public interface TicketService {

    TicketResponse createTicket(
            Long eventId,
            CreateTicketRequest request
    );

    List<TicketResponse> getTicketsByEvent(Long eventId);

}
