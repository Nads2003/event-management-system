package org.example.eventhubbackend.services.notification;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.entity.event.Event;
import org.example.eventhubbackend.entity.notification.Notification;
import org.example.eventhubbackend.entity.notification.NotificationType;
import org.example.eventhubbackend.entity.reservation.Reservation;
import org.example.eventhubbackend.entity.user.Role;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.repository.notification.NotificationRepository;
import org.example.eventhubbackend.repository.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    // ---------- LECTURE ----------

    public List<Notification> getUserNotifications(Long userId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotifications(Long userId) {
        return notificationRepository.findByRecipientIdAndIsReadFalseOrderByCreatedAtDesc(userId);
    }

    public long countUnread(Long userId) {
        return notificationRepository.countByRecipientIdAndIsReadFalse(userId);
    }

    // ---------- ACTIONS ----------

    public Notification markAsRead(Long id) {
        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification introuvable"));
        notif.setIsRead(true);
        return notificationRepository.save(notif);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unread = notificationRepository
                .findByRecipientIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    public void delete(Long id) {
        notificationRepository.deleteById(id);
    }

    // ---------- CRÉATION (appelées depuis EventService / ReservationService) ----------

    /**
     * Notifie tous les users (role USER) qu'un nouvel événement a été créé.
     */
    public void notifyEventCreated(Event event) {
        List<User> users = userRepository.findByRole(Role.USER);

        List<Notification> notifications = users.stream()
                .map(user -> Notification.builder()
                        .type(NotificationType.EVENT_CREATED)
                        .title("Nouvel événement disponible")
                        .message("\"" + event.getTitle() + "\" vient d'être publié. Découvrez-le dès maintenant !")
                        .recipient(user)
                        .event(event)
                        .build())
                .toList();

        notificationRepository.saveAll(notifications);
    }

    /**
     * Notifie l'organizer qu'un user vient de faire une réservation.
     */
    public void notifyReservationCreated(Reservation reservation) {
        User organizer = reservation.getEvent().getOrganizer();

        Notification notif = Notification.builder()
                .type(NotificationType.RESERVATION_CREATED)
                .title("Nouvelle réservation")
                .message(reservation.getUser().getFirstName() + " " + reservation.getUser().getLastName()
                        + " a réservé pour \"" + reservation.getEvent().getTitle() + "\".")
                .recipient(organizer)
                .event(reservation.getEvent())
                .reservation(reservation)
                .build();

        notificationRepository.save(notif);
    }

    /**
     * Notifie le USER que sa réservation a été validée par l'organizer.
     */
    public void notifyReservationValidated(Reservation reservation) {
        User user = reservation.getUser();

        Notification notif = Notification.builder()
                .type(NotificationType.RESERVATION_VALIDATED)
                .title("Réservation confirmée")
                .message("Votre réservation pour \"" + reservation.getEvent().getTitle()
                        + "\" a été validée. À bientôt !")
                .recipient(user)
                .event(reservation.getEvent())
                .reservation(reservation)
                .build();

        notificationRepository.save(notif);
    }

    /**
     * Notifie le USER que sa réservation a été refusée par l'organizer.
     */
    public void notifyReservationCancelled(Reservation reservation) {
        User user = reservation.getUser();

        Notification notif = Notification.builder()
                .type(NotificationType.RESERVATION_CANCELLED)
                .title("Réservation refusée")
                .message("Votre réservation pour \"" + reservation.getEvent().getTitle()
                        + "\" a été refusée par l'organisateur.")
                .recipient(user)
                .event(reservation.getEvent())
                .reservation(reservation)
                .build();

        notificationRepository.save(notif);
    }
}