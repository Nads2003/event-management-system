import  axios  from "axios";
const API = "http://localhost:8080/api/events";

export const getEvents = () => {
  return axios.get(`${API}`);
};
