export default function ReservationCard({ 
    reservation, 
    isOrganizer = false, 
    onValidate, 
    onCancel,
    validating = false,
    canceling = false
}) {
    const RESERVATION_STATUS_FR = {
        PENDING: "En attente",
        CONFIRMED: "Confirmé",
        CANCELLED: "Annulé"
    };

    const PAYMENT_STATUS_FR = {
        PENDING: "En attente",
        PAID: "Payé",
        FAILED: "Échoué"
    };

    // Couleurs du statut de réservation
    const reservationStatusClass = {
        PENDING: `
            bg-yellow-100 text-yellow-700
            dark:bg-yellow-500/20 dark:text-yellow-300
        `,
        CONFIRMED: `
            bg-green-100 text-green-700
            dark:bg-green-500/20 dark:text-green-300
        `,
        CANCELLED: `
            bg-red-100 text-red-700
            dark:bg-red-500/20 dark:text-red-300
        `
    };

    // Couleurs du statut de paiement
    const paymentStatusClass = {
        PENDING: `
            bg-yellow-100 text-yellow-700
            dark:bg-yellow-500/20 dark:text-yellow-300
        `,
        PAID: `
            bg-green-100 text-green-700
            dark:bg-green-500/20 dark:text-green-300
        `,
        FAILED: `
            bg-red-100 text-red-700
            dark:bg-red-500/20 dark:text-red-300
        `
    };

    const isPending = reservation.status === 'PENDING';
    const isBeingProcessed = validating || canceling;

    return (
        <div className="
            bg-white
            dark:bg-gray-900
            text-gray-800
            dark:text-gray-100
            rounded-2xl
            shadow-md
            hover:shadow-xl
            border
            border-gray-200
            dark:border-gray-700
            p-5
            transition-all
            duration-300
            flex
            flex-col
        ">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                ">
                    {reservation.event?.title || 'Événement'}
                </h2>

                <span
                    className={`
                        inline-flex
                        items-center
                        justify-center
                        w-fit
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${reservationStatusClass[reservation.status] || `
                            bg-gray-100 text-gray-700
                            dark:bg-gray-700 dark:text-gray-200
                        `}
                    `}
                >
                    {RESERVATION_STATUS_FR[reservation.status] || reservation.status}
                </span>
            </div>

            {/* USER INFO - Pour les organisateurs */}
            {isOrganizer && reservation.user && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Client
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {reservation.user.firstName} {reservation.user.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {reservation.user.email}
                    </p>
                </div>
            )}

            {/* CODE RESERVATION */}
            <div className="
                mt-4
                p-3
                rounded-xl
                bg-gray-50
                dark:bg-gray-800/70
                border
                border-gray-200
                dark:border-gray-700
            ">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Code réservation
                </p>
                <p className="
                    mt-1
                    font-semibold
                    text-gray-900
                    dark:text-white
                    break-all
                ">
                    {reservation.reservationCode}
                </p>
            </div>

            {/* MONTANT */}
            <div className="
                flex
                justify-between
                items-center
                mt-4
                pb-4
                border-b
                border-gray-200
                dark:border-gray-700
            ">
                <span className="text-gray-600 dark:text-gray-400">
                    Montant total
                </span>
                <span className="
                    text-lg
                    font-bold
                    text-indigo-600
                    dark:text-indigo-400
                ">
                    {reservation.totalAmount} Ar
                </span>
            </div>

            {/* TICKETS */}
            <div className="mt-4 flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        Tickets
                    </h3>
                    <span className="
                        text-xs
                        px-2
                        py-1
                        rounded-lg
                        bg-gray-100
                        text-gray-600
                        dark:bg-gray-800
                        dark:text-gray-400
                    ">
                        {reservation.items?.length || 0} type(s)
                    </span>
                </div>

                <div className="space-y-2">
                    {reservation.items?.map(item => (
                        <div
                            key={item.id}
                            className="
                                flex
                                justify-between
                                items-center
                                p-3
                                rounded-xl
                                bg-gray-50
                                dark:bg-gray-800/60
                                border
                                border-gray-100
                                dark:border-gray-700
                            "
                        >
                            <span className="
                                text-sm
                                font-medium
                                text-gray-700
                                dark:text-gray-200
                            ">
                                {item.ticket?.ticketType || 'Ticket'}
                            </span>
                            <span className="
                                text-sm
                                font-semibold
                                text-gray-500
                                dark:text-gray-400
                            ">
                                ×{item.quantity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* PAIEMENT */}
            {reservation.payment && (
                <div className="
                    mt-5
                    pt-4
                    border-t
                    border-gray-200
                    dark:border-gray-700
                ">
                    <div className="flex items-center justify-between">
                        <span className="
                            text-sm
                            text-gray-600
                            dark:text-gray-400
                        ">
                            Paiement
                        </span>
                        <span
                            className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${paymentStatusClass[reservation.payment.status] || `
                                    bg-gray-100 text-gray-700
                                    dark:bg-gray-700 dark:text-gray-200
                                `}
                            `}
                        >
                            {PAYMENT_STATUS_FR[reservation.payment.status] || reservation.payment.status}
                        </span>
                    </div>
                </div>
            )}

            {/* ACTIONS POUR ORGANISATEUR */}
            {isOrganizer && isPending && (
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <button
                        onClick={() => onValidate(reservation.id)}
                        disabled={isBeingProcessed}
                        className={`
                            flex-1
                            px-4
                            py-2
                            rounded-lg
                            font-semibold
                            transition-colors
                            duration-200
                            ${isBeingProcessed 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700'}
                            text-white
                        `}
                    >
                        {validating ? 'Validation...' : 'Valider'}
                    </button>
                    <button
                        onClick={() => onCancel(reservation.id)}
                        disabled={isBeingProcessed}
                        className={`
                            flex-1
                            px-4
                            py-2
                            rounded-lg
                            font-semibold
                            transition-colors
                            duration-200
                            ${isBeingProcessed 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700'}
                            text-white
                        `}
                    >
                        {canceling ? 'Annulation...' : 'Refuser'}
                    </button>
                </div>
            )}

            {/* STATUT POUR ORGANISATEUR (réservations traitées) */}
            {isOrganizer && !isPending && (
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Statut: {RESERVATION_STATUS_FR[reservation.status] || reservation.status}
                    </div>
                </div>
            )}
        </div>
    );
}