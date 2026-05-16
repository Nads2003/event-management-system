import { Link } from "react-router-dom";
import { Plus, Sun, Moon } from "lucide-react";

export default function MobileMenu({
  mobileOpen,
  darkMode,
  toggleTheme,
  setMobileOpen,
}) {
  if (!mobileOpen) return null;

  return (
    <div className="lg:hidden bg-whitedark:bg-gray-900/80 
border-b border-gray-200 shadow-lg  dark:border-gray-700 px-6 py-5 space-y-4 animate-slideDown">

      <Link to="/" onClick={() => setMobileOpen(false)} className="block font-medium dark:text-white">
        Accueil
      </Link>

      <Link to="/events" onClick={() => setMobileOpen(false)} className="block font-medium dark:text-white">
        Événements
      </Link>

      <Link to="/reservations" onClick={() => setMobileOpen(false)} className="block font-medium dark:text-white">
        Réservations
      </Link>

      <Link to="/statistiques" onClick={() => setMobileOpen(false)} className="block font-medium dark:text-white">
        Statistiques
      </Link>

      <Link to="/profile" onClick={() => setMobileOpen(false)} className="block font-medium dark:text-white">
        Profil
      </Link>

      <button
        onClick={toggleTheme}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:text-white"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        {darkMode ? "Mode clair" : "Mode sombre"}
      </button>

      <Link
        to="/creer-event"
        onClick={() => setMobileOpen(false)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-2xl"
      >
        <Plus size={18} />
        Créer un événement
      </Link>
    </div>
  );
}