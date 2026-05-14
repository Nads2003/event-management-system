package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e LEFT  JOIN FETCH  e.media JOIN FETCH e.organizer")
    List<Event> findAllwithMediaAndOrganizer();
    List<Event> findByOrganizerId(Long organizerId);

}
