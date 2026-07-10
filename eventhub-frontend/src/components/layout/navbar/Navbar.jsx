import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Calendar,
  Bell,
  Plus,
  ChevronDown,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  CircleUserRound
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import MobileMenu from "./MobileMenu";
import { NAV_ITEMS } from "./navbar.data";
import { useNavbar } from "./navbar.hooks";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const photo = localStorage.getItem("photo");
  const {
    mobileOpen,
    setMobileOpen,
    eventDropdown,
    setEventDropdown,
    darkMode,
    toggleTheme,
  } = useNavbar();
const navigate = useNavigate();
const handleCreateEvent = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // pas connecté
  if (!token) {
    navigate("/login");
    return;
  }

  // connecté mais pas organizer
  if (role !== "ORGANIZER") {
    alert("Vous devez être organisateur");
    return;
  }

  // organizer connecté
  navigate("/creer-event");
};
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b shadow-lg">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <Calendar className="text-white" />
          </div>
          <h1 className="font-bold text-xl dark:text-white">EventMada</h1>
        </Link>

        {/* DESKTOP MENU */}
<div className="hidden lg:flex items-center gap-8">

  {/* Accueil */}
  <Link
    to="/"
    className="font-medium text-gray-700 dark:text-white hover:text-indigo-600"
  >
    Accueil
  </Link>

  {/* Dropdown Événements */}
  <div className="relative flex items-center">
    <button
      onClick={() => setEventDropdown(!eventDropdown)}
      className="flex items-center gap-1 font-medium text-gray-700 dark:text-white hover:text-indigo-600"
    >
      Événements

      <ChevronDown
        size={16}
        className={`transition-transform duration-300 ${
          eventDropdown ? "rotate-180" : ""
        }`}
      />
    </button>

    {eventDropdown && (
      <div className="absolute top-10 left-0 w-56 rounded-2xl bg-white dark:bg-gray-800 dark:text-white shadow-xl border dark:border-gray-700 p-2">

        <Link
          to="/events"
          className="block rounded-xl px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Tous les événements
        </Link>

        <Link
          to="/mes-events"
          className="block rounded-xl px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Mes événements
        </Link>

        <Link
          to="/categories"
          className="block rounded-xl px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Catégories
        </Link>
      </div>
    )}
  </div>

  {/* Autres menus */}
  {NAV_ITEMS.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className="font-medium text-gray-700 dark:text-white hover:text-indigo-600"
    >
      {item.label}
    </Link>
  ))}
</div>

        {/* ACTIONS */}
     <div className="hidden lg:flex items-center gap-3 dark:text-white">

  <button onClick={toggleTheme} className="p-2 hover:text-indigo-600">
    {darkMode ? <Sun /> : <Moon />}
  </button>

  <Link to="/notifications" className="relative p-2 hover:text-indigo-600">
    <Bell />
  </Link>

  {token && role === "ORGANIZER" && (
    <button
      onClick={handleCreateEvent}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
    >
      <Plus size={16} />
      Créer
    </button>
  )}

  {/* Profil */}
  {token && (
    <div className="relative">

      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2"
      >
        {photo ? (
          <img
            src={photo}
            alt="profil"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <CircleUserRound
            size={38}
            className="text-gray-500 dark:text-gray-300"
          />
        )}
      </button>
       {!token && (
  <Link
    to="/login"
    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
    text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg"
  >
    Se connecter
  </Link>
)}
      {profileOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 overflow-hidden">

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <User size={18} />
            Mon profil
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={18} />
            Paramètres
          </Link>

          <hr className="dark:border-gray-700" />

          <button
  onClick={logout}
  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
>
  <LogOut size={18} />
  Déconnexion
</button>

        </div>
      )}
    </div>
  )}
</div>

        {/* MOBILE BUTTON */}
        <button className="lg:hidden dark:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
    </nav>
  );
}