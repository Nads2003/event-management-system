package org.example.eventhubbackend.controllers.ticket;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.ticket.CreateTicketRequest;
import org.example.eventhubbackend.dto.ticket.TicketResponse;
import org.example.eventhubbackend.services.ticket.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/event/{eventId}")
    public TicketResponse createTicket(
            @PathVariable Long eventId,
            @RequestBody CreateTicketRequest request
    ) {

        return ticketService.createTicket(eventId, request);
    }

    @GetMapping("/event/{eventId}")
    public List<TicketResponse> getTicketsByEvent(
            @PathVariable Long eventId
    ) {

        return ticketService.getTicketsByEvent(eventId);
    }
}
