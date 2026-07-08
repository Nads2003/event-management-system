package org.example.eventhubbackend.dto.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketGeneratedResponse {

    private Long id;

    private String ticketNumber;

    private String qrCode;

    private Boolean isChecked;

    private LocalDateTime checkedAt;
}
