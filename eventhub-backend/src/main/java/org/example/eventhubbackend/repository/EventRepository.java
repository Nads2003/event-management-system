package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
