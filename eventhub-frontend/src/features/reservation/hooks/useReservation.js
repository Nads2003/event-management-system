import { useEffect,useState } from "react";

import {
    getEvent,
    createReservation,
    getMyReservations

} from "../services/reservationService";



export function useReservation(id){


    // réservation liste

    const [reservations,setReservations] = useState([]);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState(null);



    // création réservation

    const [event,setEvent] = useState(null);

    const [quantities,setQuantities] = useState({});




    // récupérer event

    useEffect(()=>{


        if(!id) return;


        getEvent(id)

        .then(res=>{

            setEvent(res.data);

        })

        .catch(err=>{

            console.log(err);

        });


    },[id]);




    // récupérer mes réservations

    useEffect(()=>{


        async function loadReservations(){


            try {


                const response = await getMyReservations();


                setReservations(response.data);



            }catch(err){


                setError(err);


            }finally{


                setLoading(false);


            }

        }



        loadReservations();


    },[]);






    const increment=(ticketId)=>{


        setQuantities(prev=>({

            ...prev,

            [ticketId]:(prev[ticketId] || 0)+1

        }));

    };





    const decrement=(ticketId)=>{


        setQuantities(prev=>({

            ...prev,

            [ticketId]:Math.max(
                (prev[ticketId] || 0)-1,
                0
            )

        }));

    };






    const total = event?.tickets?.reduce((sum,t)=>{


        return sum + 
        Number(t.price) *
        (quantities[t.id] || 0);


    },0) || 0;






    const reserve = async(payment)=>{


        const items = Object.entries(quantities)

        .filter(([id,q])=>q>0)

        .map(([ticketId,quantity])=>({


            ticketId:Number(ticketId),

            quantity


        }));




        const data={


            eventId:Number(id),

            paymentMethod:payment.paymentMethod,

            items


        };




        const formData = new FormData();



        formData.append(

            "data",

            new Blob(

                [
                    JSON.stringify(data)
                ],

                {
                    type:"application/json"
                }

            )

        );



        formData.append(

            "proofImage",

            payment.proofImage

        );




        await createReservation(formData);



        alert("Réservation effectuée");


    };







    return{


        // liste

        reservations,

        loading,

        error,


        // création

        event,

        quantities,

        increment,

        decrement,

        total,

        reserve


    };


}