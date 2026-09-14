import axios from "axios";
import { getAuth } from "../../auth/utils/auth.storage"; // ⚠️ adaptez le chemin relatif si besoin

const API = "http://localhost:8080/api/notifications";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCurrentUserId = () => {
  const authData = getAuth();
  return authData?.id ?? null;
};

export const getNotifications = (params = {}) => {
  const userId = getCurrentUserId();
  return axios.get(API, {
    ...authHeader(),
    params: { userId, ...params },
  });
};

export const getUnreadCount = () => {
  const userId = getCurrentUserId();
  return axios.get(`${API}/unread-count`, {
    ...authHeader(),
    params: { userId },
  });
};

export const markAsRead = (id) => {
  return axios.patch(`${API}/${id}/read`, null, authHeader());
};

export const markAllAsRead = () => {
  const userId = getCurrentUserId();
  return axios.patch(`${API}/read-all`, null, {
    ...authHeader(),
    params: { userId },
  });
};

export const deleteNotification = (id) => {
  return axios.delete(`${API}/${id}`, authHeader());
};