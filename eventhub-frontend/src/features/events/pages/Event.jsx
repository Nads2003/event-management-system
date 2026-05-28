import { useState } from "react";
//pour les icones
import { Calendar, MapPin, Ticket, Search } from "lucide-react";
//composant hooks events
import{useEvents} from "../hooks/Event";

export default function Events() {
  // ✅ state global des events
  const { events } = useEvents();
  const [search, setSearch] = useState("");
  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 px-6 lg:px-16 pb-5
      bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Tous les événements
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Explore et réserve les meilleurs événements
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl shadow w-full">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <select className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-900 text-gray-700 dark:text-white shadow">
          <option>Toutes catégories</option>
          <option>Festival</option>
          <option>Tech</option>
          <option>Concert</option>
        </select>
      </div>

      {/* EVENTS LIST (COLUMN STYLE) */}
      <div className="space-y-6">

        {filtered.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row bg-white/80 dark:bg-gray-900/80
            backdrop-blur-xl rounded-3xl overflow-hidden
            shadow-xl hover:shadow-2xl transition border border-white/50 dark:border-gray-700"
          >

            {/* IMAGE */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-72 h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6 flex flex-col justify-between flex-1">

              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {event.title}
                  </h3>

                  <span className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-full">
                    {event.price}
                  </span>
                </div>

                <span className="text-indigo-600 font-medium text-sm">
                  {event.category}
                </span>

                <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">

                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    {event.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    {event.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Ticket size={18} />
                    Places disponibles
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button className="mt-6 md:mt-0 w-full md:w-fit px-6 py-3
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white rounded-2xl hover:scale-105 transition">
                Réserver
              </button>

            </div>
          </div>
        ))}
       

      </div>
    </div>
  );
}