// services/TicketGenerateService.js
import axios from "axios";

const API = "http://localhost:8080/api/tickets-generated";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getMyTickets = () => axios.get(`${API}/my`, authHeader());

export const getEligibleReservations = () =>
  axios.get(`${API}/eligible-reservations`, authHeader());

export const generateTickets = (reservationId) =>
  axios.post(`${API}/generate/${reservationId}`, null, authHeader());