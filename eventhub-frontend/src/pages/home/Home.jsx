//pour les icones
import { User,Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
//composant guide et hooks events
import Guide from "../../features/guide/Guide";
import{useEvents} from "../../features/events/hooks/Event";
import Hero from "../hero/Hero";
//pour le carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//
import { Link } from "react-router-dom";


export default function Home() {
  // ✅ state global des events
  const { events } = useEvents();


console.log(events);
  //fonction pour formater la date en français
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

  return (
    <div className="min-h-screen pt-28 px-6 lg:px-16
      bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

      {/* Hero */}
    <Hero eventCount={events.length} />
<div className="flex items-center justify-between mb-8">
  <div>
    <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
       Événements populaires
    </h2>

    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Les événements les plus consultés du moment
    </p>
  </div>

 <Link
  to="/events"
  className="text-indigo-600 font-semibold hover:underline"
>
  Voir tout →
</Link>
</div>

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
 {event.type === "GRATUIT" ? (
  <span className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20 bg-green-500 text-white">
    🎉 Gratuit
  </span>
) : (
  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 max-w-[220px]">
    {event.tickets?.length > 0 ? (
      event.tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm
          px-3 py-2 rounded-xl shadow-md border border-yellow-300
          text-xs font-medium"
        >
          <div className="flex justify-between items-center gap-2">
            <span className="font-bold text-yellow-700 dark:text-yellow-400">
              {ticket.type} :
            </span>

            <span className="text-gray-800 dark:text-gray-100">
              {ticket.price?.toLocaleString("fr-FR")} Ar
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className="bg-red-500 text-white px-3 py-2 rounded-xl shadow-md text-xs font-medium">
        ⚠️ Aucun ticket
      </div>
    )}
  </div>
)}
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


  </div>

  {/* TITLE */}
  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
    {event.title}
  </h3>

  {/* INFOS */}
  <div className="space-y-4">
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
 <div
    className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700"
  >
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
</div>
    {/* LOCATION */}
     <div
    className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700"
  >
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
</div>

  </div>

 {/* BUTTONS */}
<div className="flex gap-3 mt-7">

  {/* Détails */}
  <Link
    to={`/events/${event.id}`}
    className="flex-1"
  >
    <div
      className="w-full py-4 rounded-2xl
      border-2 border-indigo-600
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
      className="w-full flex items-center justify-center gap-2
      py-4 rounded-2xl font-semibold text-white
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
      hover:scale-[1.02] transition-all duration-300"
    >
      Réserver
      <ArrowRight size={18} />
    </div>
  </Link>

</div>
</div>
            </div>
          ))}
        </div>
      </section>
       <Guide />
  
    </div>
  );
}