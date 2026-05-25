import { getEvents } from "../services/event.service";
import { useEffect, useState } from "react";

export const useEvents = () => {

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const { data } = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events };
};