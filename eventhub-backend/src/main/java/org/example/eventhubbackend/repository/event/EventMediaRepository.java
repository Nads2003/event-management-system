package org.example.eventhubbackend.repository.event;

import org.example.eventhubbackend.entity.event.EventMedia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventMediaRepository extends JpaRepository<EventMedia, Long> {
}
