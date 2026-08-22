//reservation/services/reservationService.js
import axios from "axios";

const API = "http://localhost:8080/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line
    return token 
        ? { Authorization: `Bearer ${token}` }
        : {};
};

export const getEvent = (id) => {
    return axios.get(`${API}/events/${id}`);
};

export const createReservation = (data) => {
    return axios.post(
        `${API}/reservation/create`,
        data,
        {
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export const getMyReservations = (role) => {
    return axios.get(
        `${API}/reservation/my-reservations?role=${role || 'USER'}`,
        {
            headers: getAuthHeaders()
        }
    );
};

// Nouvelles fonctions pour les organisateurs
export const validateReservation = (reservationId) => {
    return axios.put(
        `${API}/reservation/${reservationId}/validate`,
        {},
        {
            headers: getAuthHeaders()
        }
    );
};

export const cancelReservation = (reservationId) => {
    return axios.put(
        `${API}/reservation/${reservationId}/cancel`,
        {},
        {
            headers: getAuthHeaders()
        }
    );
};