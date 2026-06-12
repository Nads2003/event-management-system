export default function Hero({ eventCount }) {
  return (
    <section className="relative overflow-hidden mb-20">

      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative text-center py-20">

        <span
          className="inline-block px-4 py-2 rounded-full
          bg-indigo-100 dark:bg-indigo-900/40
          text-indigo-600 dark:text-indigo-300
          text-sm font-semibold mb-6"
        >
         Plateforme d'événements à Madagascar
        </span>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
          Découvrez les
          <span
            className="block bg-gradient-to-r
            from-indigo-600 via-purple-600 to-pink-600
            bg-clip-text text-transparent"
          >
            meilleurs événements
          </span>
        </h1>

        <p
          className="max-w-3xl mx-auto text-lg lg:text-xl
          text-gray-600 dark:text-gray-300 mb-10"
        >
          Explorez, réservez et participez aux événements les plus marquants
          de Madagascar.
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-3xl shadow-lg text-center">
          <h3 className="text-4xl font-bold text-indigo-600">
            {eventCount}+
          </h3>
          <p className="dark:text-white">Événements</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-3xl shadow-lg text-center">
          <h3 className="text-4xl font-bold text-purple-600">
            50+
          </h3>
          <p className="dark:text-white">Organisateurs</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-3xl shadow-lg text-center">
          <h3 className="text-4xl font-bold text-pink-600">
            10K+
          </h3>
          <p className="dark:text-white">Participants</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 p-6 rounded-3xl shadow-lg text-center">
          <h3 className="text-4xl font-bold text-green-600">
            6
          </h3>
          <p className="dark:text-white">Villes</p>
        </div>

      </div>

    </section>
  );
}