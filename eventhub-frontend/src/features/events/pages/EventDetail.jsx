import { useParams } from "react-router-dom";
import { useEvents } from "../hooks/Event";
import { User, Calendar, MapPin, Ticket } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EventDetail() {
  const { id } = useParams();
  const { events } = useEvents();

  const event = events.find((e) => e.id.toString() === id);
  

  if (!event) {
    return (
      <div className="p-10 text-center text-gray-500">
        Événement introuvable
      </div>
    );
  }

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
    <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5
      bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

      {/* HERO IMAGE */}
      <div className="rounded-3xl overflow-hidden shadow-xl mb-10">
        {event.media?.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="h-[450px]"
          >
            {event.media.map((m, i) => (
              <SwiperSlide key={i}>
                {m.type === "IMAGE" ? (
                  <img
                    src={`http://localhost:8080${m.url}`}
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
          <div className="h-[450px] flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-2xl font-bold">
            Aucun média
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {event.title}
          </h1>

          <span className="inline-block mt-3 px-4 py-1 rounded-full
            bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            {event.category}
          </span>

          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
            {event.description}
          </p>

          {/* INFOS GRID */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">

            <div className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-indigo-600" size={18} />
                <span className="font-semibold dark:text-white">Date</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
          {formatEventDate(event.startDate)}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          au {formatEventDate(event.endDate)}
        </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-purple-600" size={18} />
                <span className="font-semibold dark:text-white">Lieu</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {event.city}
              </p>
              <p className="text-xs text-gray-500">{event.address}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl p-4 border border-gray-100
    dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="text-pink-600" size={18} />
                <span className="font-semibold dark:text-white">Places</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {event.capacity} disponibles
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

        {/* RIGHT SIDEBAR */}
        <div className="bg-gray-50 dark:bg-gray-800/60
    rounded-2xl  border border-gray-100
    dark:border-gray-700 p-6 h-fit">

          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Réservation
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
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
          </p>

          <button className="w-full py-4 rounded-2xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold hover:scale-105 transition">
            Réserver maintenant
          </button>

        </div>

      </div>
    </div>
  );
}