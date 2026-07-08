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
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public Reservation createReservation(Long userId, ReservationRequest request) {

        User user = userRepository.findById(userId).orElseThrow();
        Event event = eventRepository.findById(request.getEventId()).orElseThrow();

        Reservation reservation = Reservation.builder()
                .reservationCode(UUID.randomUUID().toString())
                .user(user)
                .event(event)
                .status(ReservationStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        reservationRepository.save(reservation);

        BigDecimal grandTotal = BigDecimal.ZERO;
        List<ReservationItem> items = new ArrayList<>();

        for (ReservationRequest.ItemRequest itemReq : request.getItems()) {

            Ticket ticket = ticketRepository.findById(itemReq.getTicketId())
                    .orElseThrow(() -> new RuntimeException("Ticket introuvable"));

            if (ticket.getQuantityAvailable() < itemReq.getQuantity()) {
                throw new RuntimeException("Places insuffisantes pour le ticket " + ticket.getId());
            }

            ticket.setQuantityAvailable(ticket.getQuantityAvailable() - itemReq.getQuantity());
            ticketRepository.save(ticket);

            BigDecimal subtotal = ticket.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            grandTotal = grandTotal.add(subtotal);

            ReservationItem item = ReservationItem.builder()
                    .reservation(reservation)
                    .ticket(ticket)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(ticket.getPrice())
                    .subtotal(subtotal)
                    .build();

            reservationItemRepository.save(item);
            items.add(item);
        }

        reservation.setItems(items);
        reservation.setTotalAmount(grandTotal);

        String imagePath = saveFile(request.getProofImage());


        Payment payment = Payment.builder()
                .reservation(reservation)
                .amount(grandTotal)
                .status(PaymentStatus.PENDING)
                .method(request.getPaymentMethod())
                .proofImage(imagePath)
                .build();
        paymentRepository.save(payment);
        reservation.setPayment(payment);

        return reservationRepository.save(reservation);
    }

    private String saveFile(MultipartFile file) {

        try {

            String filename =
                    UUID.randomUUID()+"_"+file.getOriginalFilename();


            Path path = Paths.get("uploads/payments/"+filename);


            Files.createDirectories(path.getParent());


            Files.copy(
                    file.getInputStream(),
                    path,
                    StandardCopyOption.REPLACE_EXISTING
            );


            return "/uploads/payments/"+filename;


        } catch(Exception e){

            throw new RuntimeException("Erreur upload image");

        }
    }
}
