import { Calendar, MapPin } from "lucide-react";

export default function ReservationHeader({ event }) {

    return (

        <div className="bg-white rounded-3xl shadow p-6 mb-8 dark:bg-indigo-900/40 dark:text-white">

            <h1 className="text-3xl font-bold">

                {event.title}

            </h1>

            <p className="mt-4 flex gap-2">

                <Calendar size={18}/>

                {new Date(event.startDate).toLocaleString()}

            </p>

            <p className="mt-2 flex gap-2">

                <MapPin size={18}/>

                {event.city}

            </p>

        </div>

    );

}