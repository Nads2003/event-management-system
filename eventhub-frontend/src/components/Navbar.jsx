import { useState } from "react";
import {
  Menu,
  X,
  Calendar,
  Bell,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                EventMaster
              </h1>
              <p className="text-xs text-gray-500">
                Smart Event Management
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Accueil
            </a>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventDropdown(!eventDropdown)}
                className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 transition"
              >
                Événements
                <ChevronDown size={18} />
              </button>

              {eventDropdown && (
                <div className="absolute top-12 left-0 w-56 bg-white rounded-2xl shadow-2xl border p-3 animate-fadeIn">
                  <a href="#" className="block px-4 py-3 rounded-xl hover:bg-indigo-50">
                    Tous les événements
                  </a>
                  <a href="#" className="block px-4 py-3 rounded-xl hover:bg-indigo-50">
                    Mes événements
                  </a>
                  <a href="#" className="block px-4 py-3 rounded-xl hover:bg-indigo-50">
                    Catégories
                  </a>
                </div>
              )}
            </div>

            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Réservations
            </a>

            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Statistiques
            </a>
          </div>

          {/* Search + Actions */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-11 pr-4 py-3 rounded-2xl bg-gray-100 focus:bg-white border border-transparent focus:border-indigo-500 outline-none transition w-64"
              />
            </div>

            {/* Notification */}
            <button className="relative p-3 rounded-2xl bg-gray-100 hover:bg-indigo-100 transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Create Button */}
            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:scale-105 transition shadow-lg">
              <Plus size={18} />
              Créer
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-200 transition">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-gray-500">Organisateur</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl border-t px-6 py-5 space-y-4 animate-slideDown">
          <a href="#" className="block font-medium">Accueil</a>
          <a href="#" className="block font-medium">Événements</a>
          <a href="#" className="block font-medium">Réservations</a>
          <a href="#" className="block font-medium">Statistiques</a>

          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl">
            <Plus size={18} />
            Créer un événement
          </button>
        </div>
      )}
    </nav>
  );
}