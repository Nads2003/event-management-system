package org.example.eventhubbackend.entity.notification;

public enum NotificationType {
    EVENT_CREATED,          // nouvel événement créé -> notifie les users
    RESERVATION_CREATED,    // user réserve -> notifie l'organizer
    RESERVATION_VALIDATED,  // réservation validée/confirmée -> notifie l'organizer
    RESERVATION_CANCELLED   // optionnel, pour plus tard
}