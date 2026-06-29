import { formatMoney } from "../utils/money";

export default function ReservationSummary({ total }) {

    return (

        <div className="mt-8 bg-indigo-50 rounded-2xl p-5">

            <h2 className="text-2xl font-bold">

                Total

            </h2>

            <h1 className="text-4xl mt-2">

                {formatMoney(total)}

            </h1>

        </div>

    );

}