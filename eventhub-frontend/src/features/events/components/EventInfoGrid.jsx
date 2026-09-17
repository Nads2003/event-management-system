import { Calendar, MapPin, User } from "lucide-react";
import { formatEventDate } from "../utils/formatEventDate";

export default function EventInfoGrid({ event }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">
      {/* DATE */}
      <div
        className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
            <Calendar
              size={18}
              className="text-indigo-600 dark:text-indigo-300"
            />
          </div>

          <span className="font-semibold text-gray-800 dark:text-white">
            Date
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {formatEventDate(event.startDate)}
        </p>
      </div>

      {/* LIEU */}
      <div
        className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40">
            <MapPin
              size={18}
              className="text-purple-600 dark:text-purple-300"
            />
          </div>

          <span className="font-semibold text-gray-800 dark:text-white">
            Lieu
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {event.city}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {event.address}
        </p>
      </div>

      {/* ORGANISATEUR */}
      <div
        className="bg-gray-50 dark:bg-gray-800/60
  rounded-2xl p-4 border border-gray-100
  dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
            <User
              size={18}
              className="text-emerald-600 dark:text-emerald-300"
            />
          </div>

          <span className="font-semibold text-gray-800 dark:text-white">
            Organisateur
          </span>
        </div>

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {event.organizer?.firstName && event.organizer?.lastName
            ? `${event.organizer.firstName} ${event.organizer.lastName}`
            : "Non renseigné"}
        </p>
      </div>
    </div>
  );
}