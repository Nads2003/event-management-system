export default function EventCard({ event, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl">

      <img
        src={event.media?.[0]?.url}
        alt={event.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold dark:text-white">
          {event.title}
        </h3>

        <p className="text-gray-500 mt-3">
          {event.description}
        </p>

        <button
          onClick={() => onDelete(event.id)}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-xl"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}