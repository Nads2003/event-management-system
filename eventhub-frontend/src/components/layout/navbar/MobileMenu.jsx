import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  Plus,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { NAV_ITEMS } from "./navbar.data";

export default function MobileMenu({
  mobileOpen,
  setMobileOpen,
  darkMode,
  toggleTheme,
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const { logout } = useAuth();

  if (!mobileOpen) return null;

  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 px-6 py-5 space-y-2 border-t dark:border-gray-700">

      {/* Accueil */}
      <Link
        to="/"
        onClick={() => setMobileOpen(false)}
        className="block py-2 dark:text-white"
      >
        Accueil
      </Link>

      {/* Événements */}
      <Link
        to="/events"
        onClick={() => setMobileOpen(false)}
        className="block py-2 dark:text-white"
      >
        Tous les événements
      </Link>

      <Link
        to="/mes-events"
        onClick={() => setMobileOpen(false)}
        className="block py-2 dark:text-white"
      >
        Mes événements
      </Link>

      {/* Menus supplémentaires */}
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className="block py-2 dark:text-white"
        >
          {item.label}
        </Link>
      ))}

      <hr className="dark:border-gray-700" />

      {/* Notifications */}
      <Link
        to="/notifications"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-2 py-2 dark:text-white"
      >
        <Bell size={18} />
        Notifications
      </Link>

      {/* Créer */}
      {token && role === "ORGANIZER" && (
        <Link
          to="/creer-event"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-xl"
        >
          <Plus size={18} />
          Créer un événement
        </Link>
      )}

      {/* Connexion */}
      {!token && (
        <Link
          to="/login"
          onClick={() => setMobileOpen(false)}
          className="block text-center bg-indigo-600 text-white py-3 rounded-xl"
        >
          Se connecter
        </Link>
      )}

      {/* Profil */}
      {token && (
        <>
          <Link
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2 dark:text-white"
          >
            <User size={18} />
            Mon profil
          </Link>

          <Link
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 py-2 dark:text-white"
          >
            <Settings size={18} />
            Paramètres
          </Link>

          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="w-full flex items-center gap-2 py-2 text-red-600"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </>
      )}

      <hr className="dark:border-gray-700" />

      <button
        onClick={toggleTheme}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border dark:border-gray-700 dark:text-white"
      >
        {darkMode ? <Sun /> : <Moon />}
        {darkMode ? "Mode clair" : "Mode sombre"}
      </button>
    </div>
  );
}