import { useState, useEffect, useCallback } from "react";
import {
  getNotifications,
  getCurrentUserId,
  markAsRead as markAsReadApi,
  markAllAsRead as markAllAsReadApi,
  deleteNotification,
} from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchNotifications = useCallback(async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = filter === "unread" ? { unread: true } : {};
      const response = await getNotifications(params);
      setNotifications(response.data.items ?? response.data);
    } catch (err) {
      setError("Impossible de charger les notifications.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await markAsReadApi(id);
    } catch {
      fetchNotifications();
    }
  };

  const markAllAsRead = async () => {
    const prevState = notifications;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markAllAsReadApi();
    } catch {
      setNotifications(prevState);
    }
  };

  const removeNotification = async (id) => {
    const prevState = notifications;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNotification(id);
    } catch {
      setNotifications(prevState);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications, loading, error, filter, setFilter,
    unreadCount, markAsRead, markAllAsRead, removeNotification,
    refetch: fetchNotifications,
  };
}