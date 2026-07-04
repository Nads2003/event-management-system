package org.example.eventhubbackend.dto.reservation;


import lombok.Data;
import java.util.List;

@Data
public class ReservationRequest {
    private Long eventId;
    private List<ItemRequest> items;

    @Data
    public static class ItemRequest {
        private Integer ticketId;
        private Integer quantity;
    }
}
