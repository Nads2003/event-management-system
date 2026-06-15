package org.example.eventhubbackend.repository;

import org.example.eventhubbackend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
