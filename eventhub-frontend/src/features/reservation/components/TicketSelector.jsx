import { formatMoney } from "../utils/money";

export default function TicketSelector({

    tickets,

    quantities,

    increment,

    decrement

}) {

    return (

        <div className="space-y-5">

            {tickets.map(ticket=>(

                <div
                    key={ticket.id}
                    className="bg-white shadow rounded-2xl p-5 flex justify-between items-center"
                >

                    <div>

                        <h3 className="font-bold">

                            {ticket.type}

                        </h3>

                        <p>

                            {formatMoney(ticket.price)}

                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={()=>decrement(ticket.id)}
                        >
                            -
                        </button>

                        <span>

                            {quantities[ticket.id] || 0}

                        </span>

                        <button
                            onClick={()=>increment(ticket.id)}
                        >
                            +

                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

}