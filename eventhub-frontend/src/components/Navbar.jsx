import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import {
  Menu,
  X,
  Calendar,
  Bell,
  Plus,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);
 

const [darkMode, setDarkMode] = useState(
  document.documentElement.classList.contains("dark")
);

const toggleTheme = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);

  if (newMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl 
bg-white/80 dark:bg-gray-900/80 
border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                EventMaster
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Plateforme de gestion d'événements
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="font-medium text-gray-700 dark:text-white hover:text-indigo-600">
              Accueil
            </Link>

            <div className="relative">
              <button
                onClick={() => setEventDropdown(!eventDropdown)}
                className="flex items-center gap-1 font-medium text-gray-700 dark:text-white hover:text-indigo-600"
              >
                Événements
                <ChevronDown size={18} />
              </button>

              {eventDropdown && (
                <div className="absolute top-12 left-0 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border p-3 animate-fadeIn">
                  <Link to="/events" className="block px-4 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700">
                    Tous les événements
                  </Link>
                  <Link to="/mes-events" className="block px-4 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700">
                    Mes événements
                  </Link>
                  <Link to="/categories" className="block px-4 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700">
                    Catégories
                  </Link>
                </div>
              )}
            </div>

            <Link to="/reservations" className="font-medium text-gray-700 dark:text-white hover:text-indigo-600">
              Réservations
            </Link>

            <Link to="/statistiques" className="font-medium text-gray-700 dark:text-white hover:text-indigo-600">
              Statistiques
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-indigo-100 transition"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Create */}
            <Link
              to="/creer-event"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:scale-105 transition shadow-lg"
            >
              <Plus size={18} />
              Créer
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold dark:text-white">Admin</p>
                <p className="text-xs text-gray-500">Organisateur</p>
              </div>
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

<MobileMenu
  mobileOpen={mobileOpen}
  darkMode={darkMode}
  toggleTheme={toggleTheme}
  setMobileOpen={setMobileOpen}
/>
    </nav>
  );
}