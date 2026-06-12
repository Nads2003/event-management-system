import { useEffect, useState } from "react";
//services pour les events de l'organisateur
import {
  getOrganizerEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../services/organizer.service";
//pour le stockage de l'auth
import { getAuth } from "../../auth/utils/auth.storage";

export function useOrganizerEvents() {
  //affectation de l'id de l'organisateur à partir du stockage de l'auth
  const auth = getAuth();
  const organizerId = auth?.id;
//state local pour stocker les events de l'organisateur et le loading
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
//fonction pour récupérer les events de l'organisateur
  const fetchEvents = async () => {
    if (!organizerId) return;

    const { data } = await getOrganizerEvents(organizerId);
    setEvents(data);
  };
//useEffect pour charger les events de l'organisateur au montage du composant et à chaque changement de l'id de l'organisateur
  useEffect(() => {
    fetchEvents();
  }, [organizerId]);
//fonction pour ajouter un event, qui prend en paramètre les données du formulaire, ajoute l'id de l'organisateur, appelle le service de création d'event et recharge les events de l'organisateur
const addEvent = async (formData) => {
  formData.append("organizerId", organizerId);

  await createEvent(formData);

  fetchEvents();
};
//fonction pour supprimer un event, qui prend en paramètre l'id de l'event, appelle le service de suppression d'event et recharge les events de l'organisateur
  const removeEvent = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };
//fonction pour éditer un event, qui prend en paramètre l'id de l'event et les données du formulaire, ajoute l'id de l'organisateur, appelle le service de mise à jour d'event et recharge les events de l'organisateur
  const editEvent = async (id, form) => {
    await updateEvent(id, form, organizerId);
    fetchEvents();
  };

  return {
    events,
    addEvent,
    removeEvent,
    editEvent,
    loading,
  };
} 