package org.example.eventhubbackend.controllers.reservation;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.reservation.ReservationRequest;
import org.example.eventhubbackend.dto.reservation.ReservationResponse;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.services.reservation.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReservationController {
    private final ReservationService reservationService;
    @PostMapping(
            value="/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ReservationResponse>  createReservation(

            @AuthenticationPrincipal User user,

            @RequestPart("data") ReservationRequest request,

            @RequestPart("proofImage") MultipartFile image

    ){

        request.setProofImage(image);


        return ResponseEntity.ok(
                reservationService.createReservation(
                        user.getId(),
                        request
                )
        );
    }
    // Dans ReservationController

    @GetMapping("/my-reservations")
    public ResponseEntity<List<ReservationResponse>> getMyReservations(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "USER") String role) {

        List<ReservationResponse> reservations = reservationService.getReservationsForUser(user.getId(), role);
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/{reservationId}/validate")
    public ResponseEntity<ReservationResponse> validateReservation(
            @PathVariable Long reservationId,
            @AuthenticationPrincipal User user) {

        ReservationResponse response = reservationService.validateReservation(reservationId, user.getId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{reservationId}/cancel")
    public ResponseEntity<ReservationResponse> cancelReservation(
            @PathVariable Long reservationId,
            @AuthenticationPrincipal User user) {

        ReservationResponse response = reservationService.cancelReservation(reservationId, user.getId());
        return ResponseEntity.ok(response);
    }
}
