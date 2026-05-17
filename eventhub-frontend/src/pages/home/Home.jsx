import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import Guide from "./Guide";
import Footer from "../footer/Footer";

export default function Home() {
  const events = [
    {
      id: 1,
      title: "Festival Digital 2026",
      date: "12 Juin 2026",
      location: "Antananarivo",
      price: "50 000 Ar",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },
    {
      id: 2,
      title: "Conférence Tech IA",
      date: "18 Juin 2026",
      location: "Ivandry",
      price: "80 000 Ar",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    },
    {
      id: 3,
      title: "Concert Summer Vibes",
      date: "25 Juin 2026",
      location: "Mahamasina",
      price: "35 000 Ar",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    },
    {
      id: 4,
      title: "Startup Expo",
      date: "30 Juin 2026",
      location: "Ankorondrano",
      price: "Gratuit",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    },
    {
      id: 5,
      title: "Forum Business",
      date: "05 Juillet 2026",
      location: "Analakely",
      price: "65 000 Ar",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    },
    {
      id: 6,
      title: "Soirée Networking",
      date: "12 Juillet 2026",
      location: "Ambatobe",
      price: "40 000 Ar",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    },
  ];

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
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {event.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {event.title}
                </h3>

                <div className="space-y-3 text-gray-600 dark:text-gray-300">

                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{event.location}</span>
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
        <Footer />
    </div>
  );
}