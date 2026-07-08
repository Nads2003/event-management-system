import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";

export function useNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventDropdown, setEventDropdown] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  return {
    mobileOpen,
    setMobileOpen,
    eventDropdown,
    setEventDropdown,
    darkMode,
    toggleTheme,
  };
}