package org.example.eventhubbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.EventRequest;
import org.example.eventhubbackend.dto.EventUpdateRequest;
import org.example.eventhubbackend.entity.Event;
import org.example.eventhubbackend.services.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EventController {
    private final EventService eventService;
    //creer event
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }
    //recuperation tous les evenement avec leurs medias et leur organisateur
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
    //recuperer event à partir id
    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<Event>> getEventsByOrganizer(@PathVariable Long organizerId) {
        return ResponseEntity.ok(eventService.getEventByOrganizer(organizerId));
    }
    //suppression d'un event
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return  ResponseEntity.ok("Event supprimé avec succès");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    //modification d'un evenement
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id,
                                         @RequestBody EventUpdateRequest request,
                                         @RequestParam  Long organizerId) {
        try {
            return ResponseEntity.ok(eventService.updateEvent(id,request,organizerId));

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
