import { useState } from "react";
//pour les icones
import { User, Calendar, MapPin, Ticket, Search } from "lucide-react";
//composant hooks events
import{useEvents} from "../hooks/Event";
//pour le carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//
import { Link } from "react-router-dom";

export default function Events() {
  // ✅ state global des events
  const { events } = useEvents();
    const formatEventDate = (date) => {
  const d = new Date(date);

  const datePart = d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${datePart} à ${hours}H${minutes}`;
};
  const [search, setSearch] = useState("");
  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-27 px-6 lg:px-16 pb-5
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
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800/60 px-4 py-3 rounded-2xl shadow w-full">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <select className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800/60 text-gray-700 dark:text-white shadow">
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
   {event.media?.length > 0 ? (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      spaceBetween={0}
      slidesPerView={1}
       className="w-full md:w-80 lg:w-96 h-64 flex-shrink-0"
    >
      {event.media.map((m, i) => (
        <SwiperSlide key={i}>
          {m.type === "IMAGE" ? (
            <img
              src={`http://localhost:8080${m.url}`}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={`http://localhost:8080${m.url}`}
              className="w-full h-full object-cover"
              controls
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="w-full md:w-80 lg:w-96 h-64 flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
      Aucun média
    </div>
  )}

            {/* CONTENT */}
            <div className="p-6 flex flex-col justify-between flex-1">

              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {event.title}
                  </h3>
                  

                   <span
      className={`px-3 py-1 rounded-full text-xs font-bold
      ${
        event.type === "GRATUIT"
          ? "bg-green-500 text-white"
          : "bg-yellow-400 text-black"
      }`}
    >
      {event.type === "GRATUIT"
        ? "🎉 Gratuit"
        : `💰 ${event.price} Ar`}
    </span>
                </div>

                <span className="inline-block mt-2 px-3 py-1 rounded-full
bg-indigo-100 text-indigo-700
dark:bg-indigo-900/40 dark:text-indigo-300
text-xs font-semibold">
  {event.category}
</span>

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
    { event.organizer?.firstName && event.organizer?.lastName ? `${event.organizer.firstName} ${event.organizer.lastName}` : "Non renseigné"}
  </p>
</div>

</div>
              </div>

              {/* BUTTON */}
  <div className="flex gap-3 mt-6">

  {/* Détails */}
  <Link
    to={`/events/${event.id}`}
    className="flex-1"
  >
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
  <Link
    to={`/events/${event.id}`}
    className="flex-1"
  >
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

</div>

            </div>
          </div>
        ))}
       

      </div>
    </div>
  );
}