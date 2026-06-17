import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

export default function EventCard({
  event,
  onDelete,
}) {
  if (!event) return null; // sécurité importante
  const ev = event;
  const formatEventDate = (date) => {
    return new Date(date).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (


    <div
      key={ev.id}
      className="bg-white dark:bg-gray-900
rounded-3xl overflow-hidden shadow-lg
border border-gray-100 dark:border-gray-700"
    >
      <div className="relative overflow-hidden">
        
      {/* MEDIA CAROUSEL */}
{ev.media?.length > 0 ? (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    spaceBetween={0}
    slidesPerView={1}
    className="h-64"
  >
    {ev.media.map((m, i) => (
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
  <span
    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20 
    ${
      ev.type === "GRATUIT"
        ? "bg-green-500 text-white"
        : "bg-yellow-400 text-black"
    }`}
  >
    {ev.type === "GRATUIT"
      ? "🎉 Gratuit"
      : `💰 ${ev.price} Ar`}
  </span>
  </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between dark:text-gray-400" >
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {ev.title}
            </h2>
                        
            <p className="text-sm text-gray-500 mt-1  dark:text-gray-200">
              📍 {ev.location}
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-200">
  🏙️ {ev.city}
</p>

<p className="text-sm text-gray-500  dark:text-gray-200">
  🛣️ {ev.address}
</p>

<span className="inline-block mt-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full ">
  {ev.category}
</span>
          </div>

          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full ">
            {ev.capacity} places
          </span>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-3  dark:text-gray-200" >
          {ev.description}
        </p>
         <p className="text-sm text-gray-500 mt-2  dark:text-gray-200">
  📅 {formatEventDate(ev.startDate)} au{" "}
  {formatEventDate(ev.endDate)}
</p>
        {/* ACTIONS */}
   <div className="mt-6 flex gap-3">

  <button
    onClick={() => {
      const confirmDelete = window.confirm(
        "Voulez-vous vraiment supprimer cet événement ?"
      );

      if (confirmDelete) {
        onDelete(ev.id);
      }
    }}
    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition font-medium"
  >
    Supprimer
  </button>

  <Link
    to={`/events/${ev.id}`}
    className="flex-1"
  >
    <button
      className="w-full bg-indigo-600 hover:bg-indigo-700
      text-white py-2 rounded-xl transition font-medium"
    >
      Voir
    </button>
  </Link>

  {ev.type !== "GRATUIT" && (
  <Link
    to={`/organizer/events/${ev.id}/tickets`}
    className="flex-1"
  >
    <button
      className="w-full bg-emerald-600 hover:bg-emerald-700
      text-white py-2 rounded-xl transition font-medium"
    >
      🎟️ Tickets
    </button>
  </Link>
)}

</div>
      </div>
    </div>


  );
}