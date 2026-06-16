import { useParams } from "react-router-dom";
import TicketCard from "../composant/TicketCard";
import TicketForm from "../composant/TicketForm"
import { useTicket } from "../hooks/useTicket";

export default function TicketManagement() {

  const { id } = useParams();

  const {
    tickets,
    addTicket,
  } = useTicket(id);

  return (
    <div
      className="min-h-screen pt-28 px-6 lg:px-16
      bg-gradient-to-br
      from-indigo-50
      via-white
      to-purple-100
      
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 dark:text-white">
      
      <h1 className="text-4xl font-bold mb-8">
        Gestion des tickets
      </h1>

      <TicketForm
        onSubmit={addTicket}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 ">

        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
          />
        ))}

      </div>
    </div>
  );
}