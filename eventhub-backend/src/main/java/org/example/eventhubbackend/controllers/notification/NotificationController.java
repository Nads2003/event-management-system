package org.example.eventhubbackend.controllers.notification;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.entity.notification.Notification;
import org.example.eventhubbackend.services.notification.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public List<Notification> getAll(@RequestParam Long userId,
                                     @RequestParam(required = false) Boolean unread) {
        if (Boolean.TRUE.equals(unread)) {
            return notificationService.getUnreadNotifications(userId);
        }
        return notificationService.getUserNotifications(userId);
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(@RequestParam Long userId) {
        return Map.of("count", notificationService.countUnread(userId));
    }

    @PatchMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return notificationService.markAsRead(id);
    }

    @PatchMapping("/read-all")
    public void markAllAsRead(@RequestParam Long userId) {
        notificationService.markAllAsRead(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.delete(id);
    }
}