export default function EventPriceBadge({ event }) {
  if (event.type === "GRATUIT") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
        🎉 Gratuit
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {event.tickets?.length > 0 ? (
        event.tickets.map((ticket) => (
          <span
            key={ticket.id}
            className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black"
          >
            🎟️ {ticket.ticketType} :{" "}
            {ticket.price?.toLocaleString("fr-FR")} Ar
          </span>
        ))
      ) : (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
          ⚠️ Aucun ticket
        </span>
      )}
    </div>
  );
}