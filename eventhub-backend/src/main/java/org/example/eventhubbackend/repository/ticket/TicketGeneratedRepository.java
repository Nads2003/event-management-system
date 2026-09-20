package org.example.eventhubbackend.repository.ticket;

import org.example.eventhubbackend.entity.reservation.ReservationItem;
import org.example.eventhubbackend.entity.ticket.TicketGenerated;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketGeneratedRepository extends JpaRepository<TicketGenerated, Long> {

    boolean existsByReservationItem(ReservationItem reservationItem);

    List<TicketGenerated> findByReservationItem_Reservation_Id(Long reservationId);

    List<TicketGenerated> findByReservationItem_Reservation_User_Id(Long userId);
    boolean existsByReservationItem_Reservation_Id(Long reservationId);
}