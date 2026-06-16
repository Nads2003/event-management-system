export default function TicketCard({ ticket }) {
  return (
    <div
      className="bg-white dark:bg-gray-900
      backdrop-blur-md p-6 rounded-2xl shadow-lg border
  border-gray-200 dark:border-gray-700
  space-y-5"
    >
      <div className="flex justify-between">

        <h3 className="font-bold text-lg">
          {ticket.ticketType}
        </h3>

        <span
          className="px-3 py-1 rounded-full
          bg-indigo-100 text-indigo-700"
        >
          {ticket.price} Ar
        </span>
      </div>

      <p className="mt-3 text-gray-500">
        {ticket.description}
      </p>

      <div className="mt-4 flex justify-between text-sm">

        <span>
          Total : {ticket.quantity}
        </span>

        <span>
          Disponible :
          {" "}
          {ticket.quantityAvailable}
        </span>

      </div>
    </div>
  );
}