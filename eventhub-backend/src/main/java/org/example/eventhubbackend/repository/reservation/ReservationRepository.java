package org.example.eventhubbackend.repository.reservation;

import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;
import org.example.eventhubbackend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByEventIdAndStatus(Long eventId, ReservationStatus status);
    List<Reservation> findByUser(User user);

}
