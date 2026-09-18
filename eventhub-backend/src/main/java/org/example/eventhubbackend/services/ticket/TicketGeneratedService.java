package org.example.eventhubbackend.services.ticket;

import org.example.eventhubbackend.dto.ticket.TicketGeneratedDTO;
import org.example.eventhubbackend.entity.reservation.Reservation;

import java.util.List;

public interface TicketGeneratedService {

    List<TicketGeneratedDTO> generateTicketsForReservation(Reservation reservation);

    List<TicketGeneratedDTO> getMyTickets(Long userId);

    List<TicketGeneratedDTO> getTicketsByReservation(Long reservationId);
}