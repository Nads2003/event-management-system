import { useEffect, useState } from "react";
import {
  getOrganizerEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} from "../services/organizer.service";

import { getAuth } from "../../auth/utils/auth.storage";

export function useOrganizerEvents() {
  const auth = getAuth();

  const organizerId = auth?.id;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    if (!organizerId) return;

    const { data } = await getOrganizerEvents(organizerId);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [organizerId]);

const addEvent = async (formData) => {
  formData.append("organizerId", organizerId);

  await createEvent(formData);

  fetchEvents();
};

  const removeEvent = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

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