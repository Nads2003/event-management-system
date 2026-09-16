//reservation/hooks/useMyReservations.js
import { useState, useEffect } from 'react';
import { getMyReservations, validateReservation, cancelReservation } from '../services/reservationService';

export function useMyReservations(isOrganizer = false) {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            setError(null);
            const role = isOrganizer ? 'ORGANIZER' : 'USER';
            const response = await getMyReservations(role);
            setReservations(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors du chargement des réservations');
            console.error('Error fetching reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, [isOrganizer]);

    const handleValidateReservation = async (reservationId) => {
        try {
            setLoading(true);
            const response = await validateReservation(reservationId);
            // Mettre à jour la liste des réservations
            setReservations(prev => 
                prev.map(r => r.id === reservationId ? response.data : r)
            );
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la validation');
            console.error('Error validating reservation:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async (reservationId) => {
        try {
            setLoading(true);
            const response = await cancelReservation(reservationId);
            // Mettre à jour la liste des réservations
            setReservations(prev => 
                prev.map(r => r.id === reservationId ? response.data : r)
            );
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'annulation');
            console.error('Error canceling reservation:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        reservations,
        loading,
        error,
        validateReservation: handleValidateReservation,
        cancelReservation: handleCancelReservation,
        refreshReservations: fetchReservations
    };
}