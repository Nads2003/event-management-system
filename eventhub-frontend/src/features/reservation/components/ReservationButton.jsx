export default function ReservationButton({

    reserve

}){

    return(

        <button

            onClick={reserve}

            className="
            mt-8 w-full py-4 
            rounded-2xl 
            bg-gradient-to-r from-indigo-600 to-purple-600
             text-white"

        >

            Confirmer la réservation

        </button>

    )

}