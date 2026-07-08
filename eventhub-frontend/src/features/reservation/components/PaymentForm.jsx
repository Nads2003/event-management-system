import { useState } from "react";

export default function PaymentForm({ onChange }) {

    const [paymentMethod, setPaymentMethod] = useState("");
    const [proofImage, setProofImage] = useState(null);


    const handleMethod = (e) => {

        const value = e.target.value;

        setPaymentMethod(value);

        onChange({
            paymentMethod:value,
            proofImage
        });

    };


    const handleImage = (e)=>{

        const file = e.target.files[0];

        setProofImage(file);


        onChange({
            paymentMethod,
            proofImage:file
        });

    };


    return (

        <div className="mt-8 bg-white rounded-2xl shadow p-6
        dark:bg-indigo-900/40 dark:text-white">


            <h2 className="text-2xl font-bold mb-4">
                Paiement
            </h2>


            <label className="block mb-2">
                Mode de paiement
            </label>


            <select

                value={paymentMethod}

                onChange={handleMethod}

                className="w-full p-3 rounded-xl border"

            >

                <option value="">
                    Choisir un mode
                </option>

                <option value="MVOLA">
                    MVOLA
                </option>


                <option value="ORANGE_MONEY">
                    Orange Money
                </option>


                <option value="AIRTEL_MONEY">
                    Airtel Money
                </option>


            </select>



            <label className="block mt-5 mb-2">

                Preuve de paiement

            </label>


            <input

                type="file"

                accept="image/*"

                onChange={handleImage}

                className="w-full"

            />


        </div>

    );

}