package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.EventMedia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventMediaRepository extends JpaRepository<EventMedia, Long> {
}
