package org.example.eventhubbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.EventRequest;
import org.example.eventhubbackend.dto.EventUpdateRequest;
import org.example.eventhubbackend.entity.*;
import org.example.eventhubbackend.repository.EventRepository;
import org.example.eventhubbackend.repository.ReservationRepository;
import org.example.eventhubbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public Event createEvent(EventRequest request) {

        User organizer = userRepository.findById(request.getOrganizerId())
                .orElseThrow(() -> new RuntimeException("Organisateur introuvable"));

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .location(request.getLocation())
                .address(request.getAddress())
                .city(request.getCity())
                .capacity(request.getCapacity())
                .category(request.getCategory())
                .organizer(organizer)
                .build();

        List<EventMedia> medias = request.getMedia().stream()
                .map(m -> EventMedia.builder()
                        .url(m.getUrl())
                        .type(m.getType())
                        .event(event)
                        .build())
                .toList();

        event.setMedia(medias);

        return eventRepository.save(event);
    }
    public List<Event> getAllEvents() {
        return eventRepository.findAllwithMediaAndOrganizer();
    }
    public List<Event> getEventByOrganizer(Long organizer) {
        return eventRepository.findByOrganizerId(organizer);
    }
    public void deleteEvent(Long id) {
       List<Reservation> pendingReservation =
               reservationRepository.findByEventIdAndStatus(id, ReservationStatus.PENDING);
       if (pendingReservation.isEmpty()) {
           throw new RuntimeException
                   ("Impossible de supprimer: des reservations encours existent");

       }
       eventRepository.deleteById(id);

    }
    public Event updateEvent(Long id, EventUpdateRequest request,Long organizer) {
        Event event=eventRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Evenement introuvable"));
        // securité :seul l'organisateur peut le modifier
        if (!event.getOrganizer().getId().equals(organizer)) {
            throw new RuntimeException("Vous, vous n'etes pas autorisé à modifier cet event");
        }
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setStartDate(request.getStartDate());
        event.setEndDate(request.getEndDate());
        event.setLocation(request.getLocation());
        event.setAddress(request.getAddress());
        event.setCity(request.getCity());
        event.setCapacity(request.getCapacity());
        event.setCategory(request.getCategory());
        return  eventRepository.save(event);

    }
}
