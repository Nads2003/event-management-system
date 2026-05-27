import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import Guide from "../../features/guide/Guide";
import{useEvents} from "../../features/events/hooks/Event";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Home() {
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {event.title}
                </h3>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">

                  <div className="flex items-center gap-2">
                   
                    <span>{event.description}</span>
                    
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{event.location}</span>
                                   <span
  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg
  ${
    event.type === "GRATUIT"
      ? "bg-green-500 text-white"
      : "bg-indigo-600 text-white"
  }`}
>
  {event.type === "GRATUIT"
    ? "Gratuit"
    : `${event.price} Ar`}
</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Ticket size={18} />
                    <span>Places disponibles</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 flex items-center justify-center gap-2
                  py-4 bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white rounded-2xl font-semibold
                  hover:scale-[1.02] transition"
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