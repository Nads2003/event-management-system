import { Link } from "react-router-dom";
import { Menu, X, Calendar, Bell, Plus, ChevronDown, Sun, Moon } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { NAV_ITEMS } from "./navbar.data";
import { useNavbar } from "./navbar.hooks";

export default function Navbar() {
  const {
    mobileOpen,
    setMobileOpen,
    eventDropdown,
    setEventDropdown,
    darkMode,
    toggleTheme,
  } = useNavbar();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b shadow-lg">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <Calendar className="text-white" />
          </div>
          <h1 className="font-bold text-xl dark:text-white">EventMaster</h1>
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
      <div className="absolute top-10 left-0 w-56 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border dark:border-gray-700 p-2">

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

          <button onClick={toggleTheme} className="p-2">
            {darkMode ? <Sun /> : <Moon />}
          </button>

          <Link to="/notifications" className="relative p-2">
            <Bell />
          </Link>

          <Link
            to="/creer-event"
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            <Plus size={16} /> Créer
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
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