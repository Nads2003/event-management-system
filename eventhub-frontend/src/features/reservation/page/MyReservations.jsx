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

        <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5
        bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">


            <h1 className="
                text-3xl
                font-bold
                mb-8
                dark:text-white
            ">

                Mes réservations

            </h1>



            <ReservationList
                reservations={reservations}
            />


        </div>

    )

}