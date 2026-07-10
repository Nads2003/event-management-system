package org.example.eventhubbackend.services.reservation;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.Event.EventMediaResponse;
import org.example.eventhubbackend.dto.Event.EventResponse;
import org.example.eventhubbackend.dto.payement.PaymentResponse;
import org.example.eventhubbackend.dto.reservation.ReservationItemResponse;
import org.example.eventhubbackend.dto.reservation.ReservationRequest;
import org.example.eventhubbackend.dto.reservation.ReservationResponse;
import org.example.eventhubbackend.dto.ticket.TicketResponse;
import org.example.eventhubbackend.dto.user.OrganizerResponse;
import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.event.EventMedia;
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
    public ReservationResponse createReservation(Long userId, ReservationRequest request) {

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

        Reservation savedReservation = reservationRepository.save(reservation);

        return toReservationResponse(savedReservation);
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

    private ReservationResponse toReservationResponse(Reservation reservation) {

        return ReservationResponse.builder()
                .id(reservation.getId())
                .reservationCode(reservation.getReservationCode())
                .totalAmount(reservation.getTotalAmount())
                .status(reservation.getStatus())
                .paymentStatus(reservation.getPaymentStatus())
                .createdAt(reservation.getCreatedAt())
                .expiresAt(reservation.getExpiresAt())

                .event(toEventResponse(reservation.getEvent()))

                .payment(toPaymentResponse(reservation.getPayment()))

                .items(
                        reservation.getItems()
                                .stream()
                                .map(this::toReservationItemResponse)
                                .toList()
                )

                .build();
    }

    private EventResponse toEventResponse(Event event) {

        if (event == null) return null;

        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .city(event.getCity())
                .address(event.getAddress())
                .capacity(event.getCapacity())
                .category(event.getCategory())
                .type(event.getType())
                .price(event.getPrice())
                .status(event.getStatus())

                .media(
                        event.getMedia() == null
                                ? List.of()
                                : event.getMedia()
                                .stream()
                                .map(this::toMediaResponse)
                                .toList()
                )

                .organizer(toOrganizerResponse(event.getOrganizer()))

                .tickets(
                        event.getTickets() == null
                                ? List.of()
                                : event.getTickets()
                                .stream()
                                .map(this::toTicketResponse)
                                .toList()
                )

                .build();
    }
    private EventMediaResponse toMediaResponse(EventMedia media) {

        return EventMediaResponse.builder()
                .id(media.getId())
                .url(media.getUrl())
                .type(media.getType().name())
                .build();
    }
    private OrganizerResponse toOrganizerResponse(User user) {

        if (user == null) return null;

        return OrganizerResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .profilePicture(user.getProfilePicture())
                .build();
    }
    private TicketResponse toTicketResponse(Ticket ticket) {

        return TicketResponse.builder()
                .id(ticket.getId())
                .ticketType(ticket.getType())
                .description(ticket.getDescription())
                .price(ticket.getPrice())
                .quantity(ticket.getQuantity())
                .quantityAvailable(ticket.getQuantityAvailable())
                .build();
    }
    private PaymentResponse toPaymentResponse(Payment payment) {

        if (payment == null) return null;

        return PaymentResponse.builder()
                .id(payment.getId())
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .transactionId(payment.getTransactionId())
                .proofImage(payment.getProofImage())
                .status(payment.getStatus())
                .paidAt(payment.getPaidAt())
                .build();
    }
    private ReservationItemResponse toReservationItemResponse(ReservationItem item) {

        return ReservationItemResponse.builder()
                .id(item.getId())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .subtotal(item.getSubtotal())
                .ticket(toTicketResponse(item.getTicket()))
                .build();
    }

    @Transactional(readOnly = true)
    public List<ReservationResponse> getMyReservations(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        List<Reservation> reservations = reservationRepository.findByUser(user);


        return reservations.stream()
                .map(this::toReservationResponse)
                .toList();
    }
}
