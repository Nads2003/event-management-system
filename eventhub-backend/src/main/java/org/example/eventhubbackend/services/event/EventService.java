package org.example.eventhubbackend.services.event;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.Event.EventUpdateRequest;
import org.example.eventhubbackend.entity.event.*;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.reservation.ReservationStatus;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.repository.event.EventRepository;
import org.example.eventhubbackend.repository.reservation.ReservationRepository;
import org.example.eventhubbackend.repository.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
// insertion d'un evenement
public Event createEvent(
        String title,
        String description,
        Integer capacity,
        Long organizerId,
        String address,
        String city,
        EventCategory category,
        EventType eventType,

        LocalDateTime startDate,
        LocalDateTime endDate,
        List<MultipartFile> files,
        List<MediaType> types
) {

    User organizer = userRepository.findById(organizerId)
            .orElseThrow(() -> new RuntimeException("Organisateur introuvable"));

    Event event = Event.builder()
            .title(title)
            .description(description)
            .capacity(capacity)
            .address(address)
            .city(city)
            .category(category)
            .type(eventType)
            .startDate(startDate)
            .endDate(endDate)
            .organizer(organizer)
            .build();

    List<EventMedia> medias = new ArrayList<>();

    if (files != null && !files.isEmpty()) {

        for (int i = 0; i < files.size(); i++) {

            MultipartFile file = files.get(i);

            String filename =
                    System.currentTimeMillis()
                            + "_" +
                            file.getOriginalFilename();

            Path path = Paths.get("uploads/" + filename);

            try {

                Files.createDirectories(path.getParent());

                Files.write(path, file.getBytes());

            } catch (Exception e) {
                throw new RuntimeException("Erreur upload fichier");
            }

            EventMedia media = EventMedia.builder()
                    .url("/uploads/" + filename)
                    .type(types.get(i))
                    .event(event)
                    .build();

            medias.add(media);
        }
    }

    event.setMedia(medias);

    return eventRepository.save(event);
}
    //liste de evenement
    public List<Event> getAllEvents() {
        return eventRepository.findAllwithMediaAndOrganizer();
    }
    public Event getEventById(Long id) {
        return eventRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("Événement introuvable"));
    }
    //evenement d'un organisateur
    public List<Event> getEventByOrganizer(Long organizer) {
        return eventRepository.findByOrganizerId(organizer);
    }
    //suppression d'un evenement
//suppression d'un evenement
    public void deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Evenement introuvable"));

        List<Reservation> pendingReservation =
                reservationRepository.findByEventIdAndStatus(
                        id,
                        ReservationStatus.PENDING
                );

        // ✅ BLOQUER seulement si reservation existe
        if (!pendingReservation.isEmpty()) {

            throw new RuntimeException(
                    "Impossible de supprimer : des réservations existent"
            );
        }

        // ✅ supprimer medias physiques
        if (event.getMedia() != null) {

            for (EventMedia media : event.getMedia()) {

                try {

                    String filename =
                            media.getUrl()
                                    .replace("http://localhost:8080/uploads/", "");

                    Path path = Paths.get("uploads/" + filename);

                    Files.deleteIfExists(path);

                } catch (Exception e) {

                    System.out.println("Erreur suppression fichier");
                }
            }
        }
        // ✅ suppression event + medias DB
        eventRepository.delete(event);
    }
    // modification d'un evenement
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
