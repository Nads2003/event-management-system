package org.example.eventhubbackend.repository.reservation;

import org.example.eventhubbackend.entity.reservation.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationItemRepository extends JpaRepository<ReservationItem, Long> {
    boolean existsByTicketId (Integer ticketId);
}
