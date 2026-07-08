package org.example.eventhubbackend.dto.reservation;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ReservationRequest {
    private Long eventId;
    private String paymentMethod;

    private MultipartFile proofImage;
    private List<ItemRequest> items;

    @Data
    public static class ItemRequest {
        private Integer ticketId;
        private Integer quantity;
    }
}
