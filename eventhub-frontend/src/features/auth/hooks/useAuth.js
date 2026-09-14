// auth/hooks/useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth.service";
import { saveAuth, clearAuth, getAuth } from "../utils/auth.storage";

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Récupérer l'utilisateur depuis le stockage au chargement
  useEffect(() => {
    const loadUser = () => {
      try {
        const authData = getAuth();
        console.log('🔍 useAuth - Auth data from storage:', authData);
        
        if (authData && authData.token) {
          // Utiliser directement les données du storage
          const userData = {
            id: authData.id,
            role: authData.role,
            token: authData.token
          };
          
          // Essayer de décoder le token pour plus d'informations
          try {
            const payload = JSON.parse(atob(authData.token.split('.')[1]));
            console.log('📦 useAuth - Decoded token payload:', payload);
            
            // Ajouter plus d'informations si disponibles
            if (payload.firstName) userData.firstName = payload.firstName;
            if (payload.lastName) userData.lastName = payload.lastName;
            if (payload.email || payload.sub) userData.email = payload.email || payload.sub;
            if (payload.userId) userData.id = payload.userId;
            
            // Si le rôle n'est pas dans le storage mais dans le payload
            if (!userData.role && payload.role) {
              let role = payload.role;
              if (Array.isArray(role)) role = role[0];
              if (role && role.startsWith('ROLE_')) role = role.substring(5);
              userData.role = role;
              // Mettre à jour le storage
              localStorage.setItem('role', role);
            }
            
          } catch (error) {
            console.error('❌ useAuth - Error decoding token:', error);
          }
          
          console.log('👤 useAuth - User loaded:', userData);
          setUser(userData);
        } else {
          console.log('ℹ️ useAuth - No auth data found');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ useAuth - Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // 🔐 LOGIN
  const login = async (form) => {
    setLoading(true);
    try {
      console.log('🔑 useAuth - Attempting login...');
      const response = await loginUser(form);
      const { token, role, id } = response.data;
      
      console.log('✅ useAuth - Login response:', { token: token?.substring(0, 20) + '...', role, id });
      
      // Sauvegarder dans le storage
      saveAuth(token, role, id);
      
      // Créer l'objet utilisateur
      const userData = { token, role, id };
      
      // Décoder le token pour plus d'informations
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.firstName) userData.firstName = payload.firstName;
        if (payload.lastName) userData.lastName = payload.lastName;
        if (payload.email || payload.sub) userData.email = payload.email || payload.sub;
      } catch (e) {
        console.error('❌ useAuth - Error decoding token after login:', e);
      }
      
      console.log('👤 useAuth - User set after login:', userData);
      setUser(userData);
      
      redirectByRole(role);
    } catch (error) {
      console.error('❌ useAuth - Login error:', error);
      throw error;
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
    } catch (error) {
      console.error('❌ useAuth - Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    console.log('🚪 useAuth - Logging out');
    clearAuth();
    setUser(null);
    navigate("/");
  };

  // 🎯 helper propre
  const redirectByRole = (role) => {
    console.log('🔀 useAuth - Redirecting by role:', role);
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
    isAuthenticated: !!user && !!user.token,
    isOrganizer: user?.role === 'ORGANIZER',
    isAdmin: user?.role === 'ADMIN'
  };
}