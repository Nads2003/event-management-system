import ReservationList from "../components/ReservationList"
import { useReservation } from "../hooks/useReservation"


export default function MyReservations(){


    const {
    reservations,
    loading,
    error

} = useReservation();



    if(loading){

        return (

            <div className="p-10 text-center">
                Chargement...
            </div>

        )

    }



    if(error){

        return (

            <div className="p-10 text-center text-red-500">

                Erreur chargement réservation

            </div>

        )

    }



    return (

        <div className="
            container
            mx-auto
            px-6
            py-10
        ">


            <h1 className="
                text-3xl
                font-bold
                mb-8
            ">

                Mes réservations

            </h1>



            <ReservationList
                reservations={reservations}
            />


        </div>

    )

}