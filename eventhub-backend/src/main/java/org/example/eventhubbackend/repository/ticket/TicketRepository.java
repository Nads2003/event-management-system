package org.example.eventhubbackend.repository.ticket;

import org.example.eventhubbackend.entity.ticket.Ticket;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TicketRepository extends CrudRepository<Ticket, Integer> {
    Optional<Ticket> findById(Long ind);
}
