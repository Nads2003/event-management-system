import { useState } from 'react';
import ReservationList from "../components/ReservationList";
import { useReservation } from "../hooks/useReservation";
import { useAuth } from "../hooks/useAuth"; // Assurez-vous d'avoir ce hook

export default function MyReservations() {
    const { user } = useAuth(); // Récupérer l'utilisateur connecté
    const isOrganizer = user?.role === 'ORGANIZER';
    console.log(isOrganizer)
    
    const [validatingId, setValidatingId] = useState(null);
    const [cancelingId, setCancelingId] = useState(null);

    const {
        reservations,
        loading,
        error,
        validateReservation,
        cancelReservation,
        refreshReservations
    } = useReservation(isOrganizer);

    const handleValidate = async (reservationId) => {
        setValidatingId(reservationId);
        try {
            await validateReservation(reservationId);
            // Optionnel: afficher une notification de succès
        } catch (err) {
            // Optionnel: afficher une notification d'erreur
            console.error('Validation failed:', err);
        } finally {
            setValidatingId(null);
        }
    };

    const handleCancel = async (reservationId) => {
        setCancelingId(reservationId);
        try {
            await cancelReservation(reservationId);
            // Optionnel: afficher une notification de succès
        } catch (err) {
            // Optionnel: afficher une notification d'erreur
            console.error('Cancellation failed:', err);
        } finally {
            setCancelingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Chargement...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5 flex items-center justify-center">
                <div className="text-center text-red-500 dark:text-red-400">
                    <p className="text-lg font-semibold">Erreur</p>
                    <p>{error}</p>
                    <button 
                        onClick={refreshReservations}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5
            bg-gradient-to-br from-indigo-50 via-white to-purple-100
            dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold dark:text-white">
                    {isOrganizer ? 'Réservations de mes événements' : 'Mes réservations'}
                </h1>
                <button 
                    onClick={refreshReservations}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                    Actualiser
                </button>
            </div>

            <ReservationList 
                reservations={reservations}
                isOrganizer={isOrganizer}
                onValidate={handleValidate}
                onCancel={handleCancel}
                validatingId={validatingId}
                cancelingId={cancelingId}
            />
        </div>
    );
}