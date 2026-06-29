package org.example.eventhubbackend.controllers.event;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.Event.EventUpdateRequest;
import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.event.EventType;
import org.example.eventhubbackend.services.event.EventService;
import org.springframework.http.ResponseEntity;
import org.example.eventhubbackend.entity.event.EventCategory;
import org.example.eventhubbackend.entity.event.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.web.bind.annotation.*;



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

            @RequestParam Integer capacity,
            @RequestParam Long organizerId,

            @RequestParam(required = false) String address,
            @RequestParam(required = false) String city,

            @RequestParam(required = false) EventCategory category,
            @RequestParam(required = false) EventType eventType,

            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate,

            @RequestParam(value = "files", required = false)
            List<MultipartFile> files,
            @RequestParam(value = "types", required = false)
            List<MediaType> types
    ) {

        return ResponseEntity.ok(
                eventService.createEvent(
                        title,
                        description,
                        capacity,
                        organizerId,
                        address,
                        city,
                        category,
                        eventType,

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
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
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
