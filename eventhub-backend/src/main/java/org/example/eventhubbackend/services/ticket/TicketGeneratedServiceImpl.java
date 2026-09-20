package org.example.eventhubbackend.services.ticket;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.reservation.EligibleReservationDTO;
import org.example.eventhubbackend.dto.ticket.TicketGeneratedDTO;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.reservation.ReservationItem;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;
import org.example.eventhubbackend.entity.payement.PaymentStatus;
import org.example.eventhubbackend.entity.ticket.TicketGenerated;
import org.example.eventhubbackend.repository.reservation.ReservationRepository;
import org.example.eventhubbackend.repository.ticket.TicketGeneratedRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TicketGeneratedServiceImpl implements TicketGeneratedService {

    private final TicketGeneratedRepository ticketGeneratedRepository;
    private final ReservationRepository reservationRepository;

    @Override
    public List<TicketGeneratedDTO> generateTicketsForReservation(Reservation reservation) {

        if (reservation.getStatus() != ReservationStatus.CONFIRMED
                || reservation.getPaymentStatus() != PaymentStatus.PAID) {
            throw new IllegalStateException(
                    "Impossible de générer les tickets : réservation non confirmée ou non payée."
            );
        }

        List<TicketGenerated> generated = new ArrayList<>();

        for (ReservationItem item : reservation.getItems()) {
            if (ticketGeneratedRepository.existsByReservationItem(item)) {
                continue; // déjà générés, idempotence
            }

            for (int i = 0; i < item.getQuantity(); i++) {
                String ticketNumber = generateTicketNumber(reservation);

                TicketGenerated ticket = TicketGenerated.builder()
                        .ticketNumber(ticketNumber)
                        .qrCode(ticketNumber + "|" + UUID.randomUUID())
                        .isChecked(false)
                        .reservationItem(item)
                        .build();

                generated.add(ticket);
            }
        }

        return ticketGeneratedRepository.saveAll(generated)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<TicketGeneratedDTO> getMyTickets(Long userId) {
        return ticketGeneratedRepository.findByReservationItem_Reservation_User_Id(userId)
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public List<TicketGeneratedDTO> getTicketsByReservation(Long reservationId) {
        return ticketGeneratedRepository.findByReservationItem_Reservation_Id(reservationId)
                .stream()
                .map(this::map)
                .toList();
    }

    private String generateTicketNumber(Reservation reservation) {
        String suffix = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "TKT-" + reservation.getReservationCode() + "-" + suffix;
    }

    private TicketGeneratedDTO map(TicketGenerated t) {
        var event = t.getReservationItem().getTicket().getEvent();
        var buyer = t.getReservationItem().getReservation().getUser();

        return TicketGeneratedDTO.builder()
                .id(t.getId())
                .ticketNumber(t.getTicketNumber())
                .qrCode(t.getQrCode())
                .isChecked(t.getIsChecked())
                .checkedAt(t.getCheckedAt())
                .eventTitle(event.getTitle())
                .eventStartDate(event.getStartDate())
                .ticketType(t.getReservationItem().getTicket().getType().name())
                .buyerFirstName(buyer.getFirstName())
                .buyerLastName(buyer.getLastName())
                .buyerEmail(buyer.getEmail())
                .build();
    }
    @Override
    public List<EligibleReservationDTO> getMyEligibleReservations(Long userId) {
        List<Reservation> reservations = reservationRepository
                .findByUserIdAndStatusAndPaymentStatus(userId, ReservationStatus.CONFIRMED, PaymentStatus.PAID);

        return reservations.stream()
                .map(r -> EligibleReservationDTO.builder()
                        .id(r.getId())
                        .reservationCode(r.getReservationCode())
                        .totalAmount(r.getTotalAmount())
                        .createdAt(r.getCreatedAt())
                        .eventTitle(r.getEvent().getTitle())
                        .eventStartDate(r.getEvent().getStartDate())
                        .ticketsGenerated(
                                ticketGeneratedRepository.existsByReservationItem_Reservation_Id(r.getId())
                        )
                        .build())
                .toList();
    }

    @Override
    public List<TicketGeneratedDTO> generateTicketsForReservationId(Long reservationId, Long userId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));

        if (!reservation.getUser().getId().equals(userId)) {
            throw new IllegalStateException("Cette réservation ne vous appartient pas.");
        }

        return generateTicketsForReservation(reservation);
    }
}