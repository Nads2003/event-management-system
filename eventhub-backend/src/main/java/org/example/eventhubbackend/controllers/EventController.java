package org.example.eventhubbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.EventRequest;
import org.example.eventhubbackend.dto.EventUpdateRequest;
import org.example.eventhubbackend.entity.Event;
import org.example.eventhubbackend.services.EventService;
import org.springframework.http.ResponseEntity;
import org.example.eventhubbackend.entity.EventCategory;
import org.example.eventhubbackend.entity.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EventController {
    private final EventService eventService;
    //creer event
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createEvent(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam Integer capacity,
            @RequestParam Long organizerId,

            @RequestParam(required = false) String address,
            @RequestParam(required = false) String city,

            @RequestParam(required = false) EventCategory category,

            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,

            @RequestParam(value = "files", required = false)
            List<MultipartFile> files,
            @RequestParam(value = "types", required = false)
            List<MediaType> types
    ) {

        return ResponseEntity.ok(
                eventService.createEvent(
                        title,
                        description,
                        location,
                        capacity,
                        organizerId,
                        address,
                        city,
                        category,
                        startDate,
                        endDate,
                        files,
                        types
                )
        );
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
