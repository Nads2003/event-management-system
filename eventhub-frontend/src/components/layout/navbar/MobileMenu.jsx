import { Link } from "react-router-dom";
import { Sun, Moon, Plus } from "lucide-react";
import { NAV_ITEMS } from "./navbar.data";

export default function MobileMenu({
  mobileOpen,
  setMobileOpen,
  darkMode,
  toggleTheme,
}) {
  if (!mobileOpen) return null;

  return (
    <div className="lg:hidden bg-white dark:bg-gray-900 px-6 py-5 space-y-4">

      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className="block dark:text-white"
        >
          {item.label}
        </Link>
      ))}

      <button onClick={toggleTheme} className="w-full flex items-center justify-center gap-2">
        {darkMode ? <Sun /> : <Moon />}
        Theme
      </button>

      <Link
        to="/creer-event"
        onClick={() => setMobileOpen(false)}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl"
      >
        <Plus /> Créer
      </Link>
    </div>
  );
}