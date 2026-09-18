package org.example.eventhubbackend.controllers.ticket;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.ticket.TicketGeneratedDTO;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.services.ticket.TicketGeneratedService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets-generated")
@RequiredArgsConstructor
public class TicketGeneratedController {

    private final TicketGeneratedService ticketGeneratedService;

    @GetMapping("/my")
    public List<TicketGeneratedDTO> getMyTickets(@AuthenticationPrincipal User currentUser) {
        return ticketGeneratedService.getMyTickets(currentUser.getId());
    }

    @GetMapping("/reservation/{reservationId}")
    public List<TicketGeneratedDTO> getByReservation(@PathVariable Long reservationId) {
        return ticketGeneratedService.getTicketsByReservation(reservationId);
    }
}