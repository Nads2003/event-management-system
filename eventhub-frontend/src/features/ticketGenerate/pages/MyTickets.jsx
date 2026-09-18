import { useState, useEffect } from "react";
import { getMyTickets } from "../sevices/TicketGenerateService";
import TicketCard from "../components/TicketCard";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTickets()
      .then((res) => setTickets(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tickets.length === 0 && <p>Aucun ticket pour le moment.</p>}
      {tickets.map((t) => (
        <TicketCard key={t.id} ticket={t} />
      ))}
    </div>
  );
}