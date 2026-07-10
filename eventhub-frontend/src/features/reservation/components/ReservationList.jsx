import ReservationCard from "./ReservationCard";


export default function ReservationList({reservations}){


    if(reservations.length===0){

        return (

            <p className="text-center text-gray-500">
                Aucune réservation trouvée
            </p>

        )

    }



    return (

        <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
        ">


            {
                reservations.map(reservation=>(

                    <ReservationCard
                        key={reservation.id}
                        reservation={reservation}
                    />

                ))
            }


        </div>

    )

}