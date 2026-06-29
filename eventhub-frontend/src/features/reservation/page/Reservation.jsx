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

        <div className="max-w-5xl mx-auto pt-28 pb-10 px-5">

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