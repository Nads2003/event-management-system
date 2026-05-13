package org.example.eventhubbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.EventRequest;
import org.example.eventhubbackend.entity.Event;
import org.example.eventhubbackend.services.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EventController {
    private final EventService eventService;
    @PostMapping

    public ResponseEntity<?> createEvent(@RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }
}
