package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.Ticket;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TicketRepository extends CrudRepository<Ticket, Integer> {
    Optional<Ticket> findById(Long ind);
}
