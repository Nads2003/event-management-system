package org.example.eventhubbackend.services.reservation;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.reservation.ReservationRequest;
import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.payement.Payment;
import org.example.eventhubbackend.entity.payement.PaymentStatus;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.reservation.ReservationItem;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;
import org.example.eventhubbackend.entity.ticket.Ticket;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.repository.event.EventRepository;
import org.example.eventhubbackend.repository.payement.PaymentRepository;
import org.example.eventhubbackend.repository.reservation.ReservationItemRepository;
import org.example.eventhubbackend.repository.reservation.ReservationRepository;
import org.example.eventhubbackend.repository.ticket.TicketRepository;
import org.example.eventhubbackend.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
   
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private  final TicketRepository ticketRepository;
    private  final ReservationItemRepository reservationItemRepository;
    private final PaymentRepository paymentRepository;
    @Transactional
    public Reservation createReservation(
            Long userId,
            ReservationRequest request
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow();

        Ticket ticket = ticketRepository.findById(request.getTicketId())
                .orElseThrow();

        // ✅ Vérifier les places disponibles
        if(ticket.getQuantityAvailable() < request.getQuantity()){
            throw new RuntimeException("Places insuffisantes");
        }

        // ✅ Décrémenter les places
        ticket.setQuantityAvailable(
                ticket.getQuantityAvailable() - request.getQuantity()
        );

        ticketRepository.save(ticket);

        // Calcul du montant
        BigDecimal total = ticket.getPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        Reservation reservation = Reservation.builder()
                .reservationCode(UUID.randomUUID().toString())
                .user(user)
                .event(event)
                .status(ReservationStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .totalAmount(total)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();

        reservationRepository.save(reservation);

        ReservationItem item = ReservationItem.builder()
                .reservation(reservation)
                .ticket(ticket)
                .quantity(request.getQuantity())
                .unitPrice(ticket.getPrice())
                .subtotal(total)
                .build();

        reservationItemRepository.save(item);

        reservation.setItems(List.of(item));

        Payment payment = Payment.builder()
                .reservation(reservation)
                .amount(total)
                .status(PaymentStatus.PENDING)
                .method("MVOLA")
                .build();

        paymentRepository.save(payment);

        reservation.setPayment(payment);

        return reservationRepository.save(reservation);
    }
}
