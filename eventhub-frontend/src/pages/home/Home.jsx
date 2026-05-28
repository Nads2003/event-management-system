import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import Guide from "../../features/guide/Guide";
import{useEvents} from "../../features/events/hooks/Event";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Home() {
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
  const { events } = useEvents();
  console.log(events);
  return (
    <div className="min-h-screen pt-28 px-6 lg:px-16
      bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Découvrez les meilleurs événements
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explorez, réservez et participez aux événements les plus marquants
          de Madagascar.
        </p>
      </section>

      {/* Events Grid */}
      <section>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white/80 dark:bg-gray-900/80
              backdrop-blur-xl rounded-3xl overflow-hidden
              shadow-xl hover:shadow-2xl transition-all duration-300
              hover:-translate-y-2 border border-white/50 dark:border-gray-700"
            >
              {/* Image */}
<div className="relative overflow-hidden">

  {event.media?.length > 0 ? (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      spaceBetween={0}
      slidesPerView={1}
      className="h-64"
    >
      {event.media.map((m, i) => (
        <SwiperSlide key={i}>
          {m.type === "IMAGE" ? (
            <img
              src={`http://localhost:8080${m.url}`}
              alt=""
              className="h-64 w-full object-cover"
            />
          ) : (
            <video
              src={`http://localhost:8080${m.url}`}
              className="h-64 w-full object-cover"
              controls
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="h-44 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
      Aucun média
    </div>
  )}

  {/* BADGE */}
  <span
    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20
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

              {/* Content */}
{/* Content */}
<div className="p-6 flex flex-col h-full">

  {/* CATEGORY + PRICE */}
  <div className="flex items-center justify-between mb-4">
    <span className="px-3 py-1 rounded-full text-xs font-semibold
    bg-indigo-100 text-indigo-700
    dark:bg-indigo-900/40 dark:text-indigo-300">
      {event.category}
    </span>

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

  {/* TITLE */}
  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
    {event.title}
  </h3>

  {/* DESCRIPTION */}
  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
    {event.description}
  </p>

  {/* INFOS */}
  <div className="space-y-4">

    {/* DATE */}
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
        <Calendar
          size={18}
          className="text-indigo-600 dark:text-indigo-300"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Date
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {formatEventDate(event.startDate)}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          au {formatEventDate(event.endDate)}
        </p>
      </div>
    </div>

    {/* LOCATION */}
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40">
        <MapPin
          size={18}
          className="text-purple-600 dark:text-purple-300"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Lieu
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {event.city}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {event.address}
        </p>
      </div>
    </div>

    {/* CAPACITY */}
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-900/40">
        <Ticket
          size={18}
          className="text-pink-600 dark:text-pink-300"
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          Places disponibles
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {event.capacity} places
        </p>
      </div>
    </div>
  </div>

  {/* BUTTON */}
  <button
    className="w-full mt-7 flex items-center justify-center gap-2
    py-4 rounded-2xl font-semibold text-white
    bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
    hover:scale-[1.02] hover:shadow-xl
    transition-all duration-300"
  >
    Réserver
    <ArrowRight size={18} />
  </button>
</div>
            </div>
          ))}
        </div>
      </section>
       <Guide />
  
    </div>
  );
}