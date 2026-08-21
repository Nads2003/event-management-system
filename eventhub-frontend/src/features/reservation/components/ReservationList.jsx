import ReservationCard from "./ReservationCard";

export default function ReservationList({ 
    reservations, 
    isOrganizer = false, 
    onValidate, 
    onCancel,
    validatingId = null,
    cancelingId = null
}) {
    if (!reservations || reservations.length === 0) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                {isOrganizer 
                    ? 'Aucune réservation pour vos événements' 
                    : 'Aucune réservation trouvée'}
            </p>
        );
    }

    return (
        <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
        ">
            {reservations.map(reservation => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    isOrganizer={isOrganizer}
                    onValidate={onValidate}
                    onCancel={onCancel}
                    validating={validatingId === reservation.id}
                    canceling={cancelingId === reservation.id}
                />
            ))}
        </div>
    );
}