package org.example.eventhubbackend.repository.payement;

import org.example.eventhubbackend.entity.payement.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
