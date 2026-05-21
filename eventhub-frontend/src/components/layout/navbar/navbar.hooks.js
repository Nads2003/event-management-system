import { useState } from "react";

export function useNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    document.documentElement.classList.toggle("dark", newMode);
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