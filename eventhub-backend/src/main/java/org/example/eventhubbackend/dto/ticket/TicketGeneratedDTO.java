package org.example.eventhubbackend.dto.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class TicketGeneratedDTO {
    private Long id;
    private String ticketNumber;
    private String qrCode;
    private Boolean isChecked;
    private LocalDateTime checkedAt;

    private String eventTitle;
    private LocalDateTime eventStartDate;
    private String ticketType;
}