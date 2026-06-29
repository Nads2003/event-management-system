package org.example.eventhubbackend.repository.event;

import org.example.eventhubbackend.entity.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("""
    SELECT DISTINCT e
    FROM Event e
    LEFT JOIN FETCH e.media
    LEFT JOIN FETCH e.organizer
""")
    List<Event> findAllwithMediaAndOrganizer();

    List<Event> findByOrganizerId(Long organizerId);
    @Query("""
    SELECT DISTINCT e
    FROM Event e
    LEFT JOIN FETCH e.media
    LEFT JOIN FETCH e.organizer
    WHERE e.id = :id
""")
    Optional<Event> findByIdWithDetails(@Param("id") Long id);

}
