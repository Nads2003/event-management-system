package org.example.eventhubbackend.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class EligibleReservationDTO {
    private Long id;
    private String reservationCode;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private String eventTitle;
    private LocalDateTime eventStartDate;
    private boolean ticketsGenerated; // true si des tickets existent déjà pour cette résa
}