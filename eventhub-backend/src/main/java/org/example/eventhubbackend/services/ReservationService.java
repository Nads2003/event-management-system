package org.example.eventhubbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.ReservationRequest;
import org.example.eventhubbackend.entity.*;
import org.example.eventhubbackend.repository.*;
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
    private final  PaymentRepository paymentRepository;
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

        BigDecimal total =
                ticket.getPrice()
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
