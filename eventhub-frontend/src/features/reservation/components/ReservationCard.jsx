export default function ReservationCard({reservation}){


    return (

        <div className="
            bg-white 
            rounded-xl 
            shadow-md 
            p-5
            border
        ">


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
                    {reservation.status}
                </span>


            </div>



            <p className="text-gray-600 mt-2">

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
                                {reservation.payment.status}
                            </b>
                        </p>


                    </div>

                )
            }


        </div>

    )

}