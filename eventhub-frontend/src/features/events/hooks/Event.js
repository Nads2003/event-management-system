// ✅ Hook personnalisé pour gérer les événements
import { getEvents } from "../services/event.service";
import { useEffect, useState } from "react";

export const useEvents = () => {
// ✅ State local pour stocker les événements
  const [events, setEvents] = useState([]);
// ✅ Fonction pour récupérer les événements depuis l'API
  const fetchEvents = async () => {
    const { data } = await getEvents();
    setEvents(data);
  };
// ✅ useEffect pour charger les événements au montage du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  return { events };
};