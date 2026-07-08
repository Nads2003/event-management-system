package org.example.eventhubbackend.dto.payement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.eventhubbackend.entity.payement.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Long id;

    private BigDecimal amount;

    private String method;

    private String transactionId;

    private String proofImage;

    private PaymentStatus status;

    private LocalDateTime paidAt;
}