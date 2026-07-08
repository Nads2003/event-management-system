import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth.service";
import { saveAuth, clearAuth, getAuth } from "../utils/auth.storage";

export function useAuth() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getAuth());

  // 🔐 LOGIN
const login = async (form) => {
  setLoading(true);

  try {
    const [response] = await Promise.all([
      loginUser(form),
      new Promise((resolve) => setTimeout(resolve, 1000)), // minimum 1 seconde
    ]);

    const { token, role, id } = response.data;

    saveAuth(token, role, id);
    setUser({ token, role, id });

    redirectByRole(role);
  } finally {
    setLoading(false);
  }
};

  // 📝 REGISTER
  const register = async (form) => {
    setLoading(true);

    try {
      if (form.password !== form.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas ❌");
      }

      const { confirmPassword, ...dataToSend } = form;

      await registerUser(dataToSend);

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    clearAuth();
    setUser(null);
    navigate("/login");
  };

  // 🎯 helper propre
  const redirectByRole = (role) => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "ORGANIZER") navigate("/creer-event");
    else navigate("/");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}