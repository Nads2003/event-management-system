package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.Reservation;
import org.example.eventhubbackend.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByEventIdAndStatus(Long eventId, ReservationStatus status);

}
