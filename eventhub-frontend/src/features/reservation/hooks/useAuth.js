// hooks/useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Décoder le token JWT pour obtenir les infos utilisateur
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    id: payload.userId,
                    email: payload.sub,
                    role: payload.role,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                });
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    return { user, loading };
}