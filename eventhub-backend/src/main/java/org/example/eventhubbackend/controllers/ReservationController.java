package org.example.eventhubbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.ReservationRequest;
import org.example.eventhubbackend.entity.Reservation;
import org.example.eventhubbackend.entity.User;
import org.example.eventhubbackend.services.ReservationService;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReservationController {
    private final ReservationService reservationService;
    @PostMapping("/register")
    public ResponseEntity<?> reserve(
            @AuthenticationPrincipal User user,
            @RequestBody ReservationRequest request
    ) {

        Reservation reservation =
                reservationService.createReservation(
                        user.getId(),
                        request
                );

        return ResponseEntity.ok(reservation);
    }
}
