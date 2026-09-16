// hooks/useReservation.js
import { useState, useEffect } from "react";
import { getEvent, createReservation } from "../services/reservationService";

export function useReservation(eventId) {
    const [event, setEvent] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvent(eventId)
            .then((res) => setEvent(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [eventId]);

    const increment = (ticketId) =>
        setQuantities((q) => ({ ...q, [ticketId]: (q[ticketId] || 0) + 1 }));

    const decrement = (ticketId) =>
        setQuantities((q) => ({ ...q, [ticketId]: Math.max((q[ticketId] || 0) - 1, 0) }));

    const total = event?.tickets?.reduce(
        (sum, t) => sum + (quantities[t.id] || 0) * t.price,
        0
    ) || 0;

    const reserve = async (payment) => {
    const items = Object.entries(quantities)
        .filter(([, qty]) => qty > 0)
        .map(([ticketId, quantity]) => ({ ticketId: Number(ticketId), quantity }));

    const data = {
        eventId: Number(eventId),
        items,
        paymentMethod: payment.paymentMethod,
    };

    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (payment.proofImage) {
        formData.append("proofImage", payment.proofImage);
    }

    return createReservation(formData);
};

    return { event, quantities, increment, decrement, total, reserve, loading };
}