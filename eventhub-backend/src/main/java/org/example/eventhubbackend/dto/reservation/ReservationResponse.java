package org.example.eventhubbackend.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.eventhubbackend.dto.Event.EventMediaResponse;
import org.example.eventhubbackend.dto.Event.EventResponse;
import org.example.eventhubbackend.dto.payement.PaymentResponse;
import org.example.eventhubbackend.entity.payement.PaymentStatus;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private Long id;

    private String reservationCode;

    private BigDecimal totalAmount;

    private ReservationStatus status;

    private PaymentStatus paymentStatus;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private EventResponse event;

    private PaymentResponse payment;

    private List<EventMediaResponse> media;

    private List<ReservationItemResponse> items;

}
