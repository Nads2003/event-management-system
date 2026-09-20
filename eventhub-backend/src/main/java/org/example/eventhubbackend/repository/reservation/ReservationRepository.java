package org.example.eventhubbackend.repository.reservation;

import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.payement.PaymentStatus;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;
import org.example.eventhubbackend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByEventIdAndStatus(Long eventId, ReservationStatus status);
    List<Reservation> findByUser(User user);

    // Méthode pour trouver les réservations par liste d'événements
    List<Reservation> findByEventIn(List<Event> events);
    List<Reservation> findByUserIdAndStatusAndPaymentStatus(
            Long userId, ReservationStatus status, PaymentStatus paymentStatus
    );
}