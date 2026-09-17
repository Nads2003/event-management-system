import EventMedia from "./EventMedia";
import EventPriceBadge from "./EventPriceBadge";
import EventInfoGrid from "./EventInfoGrid";
import EventActions from "./EventActions";

export default function EventCard({ event }) {
  return (
    <div
      className="flex flex-col md:flex-row bg-white/80 dark:bg-gray-900/80
            backdrop-blur-xl rounded-3xl overflow-hidden
            shadow-xl hover:shadow-2xl transition border border-white/50 dark:border-gray-700"
    >
      {/* IMAGE */}
      <EventMedia media={event.media} />

      {/* CONTENT */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {event.title}
            </h3>

            <EventPriceBadge event={event} />
          </div>

          <span
            className="inline-block mt-2 px-3 py-1 rounded-full
bg-indigo-100 text-indigo-700
dark:bg-indigo-900/40 dark:text-indigo-300
text-xs font-semibold"
          >
            {event.category}
          </span>

          <EventInfoGrid event={event} />
        </div>

        {/* BUTTON */}
        <EventActions event={event} />
      </div>
    </div>
  );
}