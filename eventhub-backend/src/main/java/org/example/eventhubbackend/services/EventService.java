package org.example.eventhubbackend.services;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.dto.EventRequest;
import org.example.eventhubbackend.entity.Event;
import org.example.eventhubbackend.entity.EventMedia;
import org.example.eventhubbackend.entity.User;
import org.example.eventhubbackend.repository.EventRepository;
import org.example.eventhubbackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

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
        return eventRepository.findAll();
    }
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElseThrow(()->new RuntimeException("Event not found"));
    }
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
