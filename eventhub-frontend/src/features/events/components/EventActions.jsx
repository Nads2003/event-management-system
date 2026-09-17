import { Link } from "react-router-dom";

export default function EventActions({ event }) {
  const canReserve =
    event.type === "GRATUIT" || (event.tickets && event.tickets.length > 0);

  return (
    <div className="flex gap-3 mt-6">
      {/* Détails */}
      <Link to={`/events/${event.id}`} className="flex-1">
        <div
          className="w-full py-3 rounded-2xl
      border border-indigo-600
      text-indigo-600 dark:text-indigo-400
      font-semibold text-center
      hover:bg-indigo-50
      dark:hover:bg-indigo-950/40
      transition-all duration-300"
        >
          Détails
        </div>
      </Link>

      {/* Réserver */}
      {canReserve && (
        <Link to={`/events/${event.id}/reservation`} className="flex-1">
          <div
            className="w-full py-3 rounded-2xl
      bg-gradient-to-r from-indigo-600 to-purple-600
      text-white font-semibold text-center
      hover:shadow-lg hover:scale-[1.02]
      transition-all duration-300"
          >
            Réserver
          </div>
        </Link>
      )}
    </div>
  );
}