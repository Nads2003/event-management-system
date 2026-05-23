import axios from "axios";

const API = "http://localhost:8080/api/events";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getOrganizerEvents = (organizerId) => {
  if (!organizerId) {
    throw new Error("OrganizerId manquant");
  }

  return axios.get(`${API}/organizer/${organizerId}`, authHeader());
};

export const createEvent = (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEvent = (id) => {
  return axios.delete(`${API}/${id}`, authHeader());
};

export const updateEvent = (id, data, organizerId) => {
  return axios.put(
    `${API}/${id}?organizerId=${organizerId}`,
    data,
    authHeader()
  );
};