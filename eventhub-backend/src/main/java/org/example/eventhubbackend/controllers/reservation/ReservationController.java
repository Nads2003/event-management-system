package org.example.eventhubbackend.controllers.reservation;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.reservation.ReservationRequest;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.services.reservation.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReservationController {
    private final ReservationService reservationService;
    @PostMapping

    public ResponseEntity<?> reserve(
            @AuthenticationPrincipal User user,
            @RequestBody ReservationRequest request
    ) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Utilisateur non authentifié");
        }

        Reservation reservation = reservationService.createReservation(user.getId(), request);
        return ResponseEntity.ok(reservation);
    }
}
