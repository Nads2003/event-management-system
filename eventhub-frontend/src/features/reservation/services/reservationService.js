import axios from "axios";

const API = "http://localhost:8080/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // adaptez selon où vous stockez le token après le login
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getEvent = (id) => {
    return axios.get(`${API}/events/${id}`);
};

export const createReservation = (data) => {

    return axios.post(
        `${API}/reservation/create`,
        data,
        {
            headers:{
                ...getAuthHeaders(),
                "Content-Type":"multipart/form-data"
            }
        }
    );

};
export function getMyReservations(){

    return axios.get("/reservation/my");

}