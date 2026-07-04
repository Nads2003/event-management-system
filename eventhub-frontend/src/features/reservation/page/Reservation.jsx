import { useParams } from "react-router-dom";
import { useReservation } from "../hooks/useReservation";

import ReservationHeader from "../components/ReservationHeader";
import TicketSelector from "../components/TicketSelector";
import ReservationSummary from "../components/ReservationSummary";
import ReservationButton from "../components/ReservationButton";

export default function ReservationPage() {

    const { id } = useParams();

    const {
        event,
        quantities,
        increment,
        decrement,
        total,
        reserve
    } = useReservation(id);

    if (!event) return <p>Chargement...</p>;

    return (

        <div className="min-h-screen pt-28 px-6 lg:px-20 pb-5
        bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

            <ReservationHeader event={event} />

            <TicketSelector
                tickets={event.tickets}
                quantities={quantities}
                increment={increment}
                decrement={decrement}
            />

            <ReservationSummary total={total} />

            <ReservationButton
                reserve={reserve}
            />

        </div>

    );

}