import { Search, CalendarCheck, Ticket, Sparkles } from "lucide-react";


export default function Guide() {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Explorez les événements",
      desc: "Parcourez les événements disponibles selon vos préférences."
    },
    {
      icon: <CalendarCheck size={28} />,
      title: "Choisissez votre événement",
      desc: "Consultez les détails, dates, lieux et disponibilités."
    },
    {
      icon: <Ticket size={28} />,
      title: "Réservez votre place",
      desc: "Réservez rapidement votre participation en quelques clics."
    },
    {
      icon: <Sparkles size={28} />,
      title: "Profitez de l’expérience",
      desc: "Participez et vivez une expérience unique."
    }
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Comment ça fonctionne ?
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Réservez vos événements facilement en suivant quelques étapes simples.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl
            rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700
            hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg mb-6">
              {step.icon}
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              {step.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
     
    </section>
  );
}