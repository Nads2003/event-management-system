package org.example.eventhubbackend.services.ticket;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.ticket.CreateTicketRequest;
import org.example.eventhubbackend.dto.ticket.TicketResponse;

import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.ticket.Ticket;
import org.example.eventhubbackend.repository.event.EventRepository;
import org.example.eventhubbackend.repository.ticket.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;

    @Override
    public TicketResponse createTicket(
            Long eventId,
            CreateTicketRequest request
    ) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event introuvable"));

        Ticket ticket = Ticket.builder()
                .type(request.getTicketType())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .quantityAvailable(request.getQuantity())
                .event(event)
                .build();

        ticketRepository.save(ticket);

        return map(ticket);
    }

    @Override
    public List<TicketResponse> getTicketsByEvent(Long eventId) {

        return ticketRepository.findById(eventId)
                .stream()
                .map(this::map)
                .toList();
    }

    private TicketResponse map(Ticket ticket) {

        return TicketResponse.builder()
                .id(ticket.getId())
                .ticketType(ticket.getType())
                .description(ticket.getDescription())
                .price(ticket.getPrice())
                .quantity(ticket.getQuantity())
                .quantityAvailable(ticket.getQuantityAvailable())
                .build();
    }
}
