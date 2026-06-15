package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.ReservationItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationItemRepository extends JpaRepository<ReservationItem, Long> {
}
