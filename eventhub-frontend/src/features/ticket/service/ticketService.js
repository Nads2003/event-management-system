import axios from "axios";

const API_URL = "http://localhost:8080/api/tickets";

export const createTicket = async (eventId, data) => {
  const response = await axios.post(
    `${API_URL}/event/${eventId}`,
    data
  );

  return response.data;
};

export const getTicketsByEvent = async (eventId) => {
  const response = await axios.get(
    `${API_URL}/event/${eventId}`
  );

  return response.data;
};