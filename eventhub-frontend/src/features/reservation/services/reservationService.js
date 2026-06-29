import axios from "axios";

const API="http://localhost:8080/api";

export const getEvent=(id)=>{

    return axios.get(`${API}/events/${id}`);

};

export const createReservation=(data)=>{

    return axios.post(`${API}/reservations`,data);

};