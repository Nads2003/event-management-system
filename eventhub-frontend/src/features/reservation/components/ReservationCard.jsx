export default function ReservationCard({reservation}){

    // 1. Dictionnaires de traduction pour les enums
    const RESERVATION_STATUS_FR = {
    PENDING: "En attente",
    CONFIRMED: "Confirmé",
    CANCELLED: "Annulé"
}

   const PAYMENT_STATUS_FR = {
    PENDING: "En attente",
    PAID: "Payé",
    FAILED: "Échoué"
};
    return (

        <div className="
            bg-white 
            rounded-xl 
            shadow-md 
            p-5
            border
         dark:bg-gray-900/80 text-gray-300">



            <div className="flex justify-between">

                <h2 className="text-xl font-bold">
                    {reservation.event.title}
                </h2>


                <span className="
                    px-3 
                    py-1 
                    rounded-full 
                    bg-yellow-100
                    text-yellow-700
                ">
                    {RESERVATION_STATUS_FR[reservation.status] || reservation.status}
                </span>


            </div>



            <p className="text-gray-600 mt-2 dark:text-gray-300">

                Code réservation :
                <b>
                    {reservation.reservationCode}
                </b>

            </p>



            <p className="mt-2">

                Montant total :
                <span className="font-bold">
                    {reservation.totalAmount} Ar
                </span>

            </p>



            <div className="mt-4">

                <h3 className="font-semibold">
                    Tickets
                </h3>


                {
                    reservation.items.map(item=>(

                        <div 
                            key={item.id}
                            className="
                            flex 
                            justify-between
                            text-sm
                            mt-2
                            "
                        >

                            <span>
                                {item.ticket.ticketType}
                            </span>


                            <span>
                                x{item.quantity}
                            </span>


                        </div>

                    ))
                }

            </div>



            {
                reservation.payment && (

                    <div className="mt-4 border-t pt-3">


                        <p>
                            Paiement :
                            <b>
                                 {PAYMENT_STATUS_FR[reservation.payment.status] || reservation.payment.status}
                            </b>
                        </p>


                    </div>

                )
            }


        </div>

    )

}