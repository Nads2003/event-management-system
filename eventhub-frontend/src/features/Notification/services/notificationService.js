import axios from "axios";

const API = "http://localhost:8080/api/notifications";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getNotifications = (params = {}) => {
  return axios.get(API, {
    ...authHeader(),
    params,
  });
};

export const getUnreadCount = () => {
  return axios.get(`${API}/unread-count`, authHeader());
};

export const markAsRead = (id) => {
  return axios.patch(`${API}/${id}/read`, null, authHeader());
};

export const markAllAsRead = () => {
  return axios.patch(`${API}/read-all`, null, authHeader());
};

export const deleteNotification = (id) => {
  return axios.delete(`${API}/${id}`, authHeader());
};