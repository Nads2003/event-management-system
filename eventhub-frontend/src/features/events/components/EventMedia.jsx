import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EventMedia({ media }) {
  if (!media || media.length === 0) {
    return (
      <div className="w-full md:w-80 lg:w-96 h-64 flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
        Aucun média
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      spaceBetween={0}
      slidesPerView={1}
      className="w-full md:w-80 lg:w-96 h-64 flex-shrink-0"
    >
      {media.map((m, i) => (
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
  );
}