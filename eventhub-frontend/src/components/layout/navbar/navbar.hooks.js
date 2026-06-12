import { useState, useEffect } from "react";

export function useNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return {
    mobileOpen,
    setMobileOpen,
    eventDropdown,
    setEventDropdown,
    darkMode,
    toggleTheme,
  };
}