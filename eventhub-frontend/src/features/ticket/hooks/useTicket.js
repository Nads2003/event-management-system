import { useEffect, useState } from "react";
import {
  createTicket,
  getTicketsByEvent,
} from "../service/ticketService";

export const useTicket = (eventId) => {
  const [tickets, setTickets] = useState([]);

 const loadTickets = async () => {
  try {
    const data = await getTicketsByEvent(eventId);

    console.log("Tickets API :", data);

    setTickets(data);
  } catch (error) {
    console.error(error);
  }
};

  const addTicket = async (ticket) => {
    await createTicket(eventId, ticket);
    loadTickets();
  };

  useEffect(() => {
    if (eventId) {
      loadTickets();
    }
  }, [eventId]);

  return {
    tickets,
    addTicket,
    loadTickets,
  };
};