import { useEffect,useState } from "react";
import {

    getEvent,

    createReservation

} from "../services/reservationService";

export function useReservation(id){

    const[event,setEvent]=useState();

    const[quantities,setQuantities]=useState({});

    useEffect(()=>{

        getEvent(id)

        .then(res=>setEvent(res.data));

    },[id]);

    const increment=(ticketId)=>{

        setQuantities(prev=>({

            ...prev,

            [ticketId]:(prev[ticketId]||0)+1

        }));

    };

    const decrement=(ticketId)=>{

        setQuantities(prev=>({

            ...prev,

            [ticketId]:Math.max((prev[ticketId]||0)-1,0)

        }));

    };

    const total=event?.tickets.reduce((sum,t)=>{

        return sum+t.price*(quantities[t.id]||0);

    },0)||0;

    const reserve=async()=>{

        const items=Object.entries(quantities)

        .filter(([id,q])=>q>0)

        .map(([ticketId,quantity])=>({

            ticketId:Number(ticketId),

            quantity

        }));

        await createReservation({

            eventId:Number(id),

            items

        });

        alert("Réservation effectuée");

    };

    return{

        event,

        quantities,

        increment,

        decrement,

        total,

        reserve

    };

}