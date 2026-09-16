import { useState } from "react";

export default function PaymentForm({ onChange }) {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [proofImage, setProofImage] = useState(null);

    const handleMethod = (e) => {
        const value = e.target.value;

        setPaymentMethod(value);

        onChange({
            paymentMethod: value,
            proofImage
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        setProofImage(file);

        onChange({
            paymentMethod,
            proofImage: file
        });
    };

    return (
        <div className="mt-8 bg-white rounded-2xl shadow p-6
            dark:bg-gray-900
            text-gray-800
            dark:text-gray-100">

            <h2 className="text-2xl font-bold mb-4">
                Paiement
            </h2>

            <label className="block mb-2">
                Mode de paiement
            </label>

            <select
                value={paymentMethod}
                onChange={handleMethod}
                className="
                    w-full p-3 rounded-xl border
                    bg-white text-gray-900
                    border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500

                    dark:bg-gray-800
                    dark:text-white
                    dark:border-gray-600
                "
            >
                <option
                    value=""
                    className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                >
                    Choisir un mode
                </option>

                <option
                    value="MVOLA"
                    className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                >
                    MVOLA
                </option>

                <option
                    value="ORANGE_MONEY"
                    className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                >
                    Orange Money
                </option>

                <option
                    value="AIRTEL_MONEY"
                    className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
                >
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
                className="
                    w-full
                    text-gray-700
                    dark:text-gray-200
                    file:mr-4
                    file:py-2
                    file:px-4
                    file:rounded-lg
                    file:border-0
                    file:bg-gradient-to-r from-indigo-600 to-purple-600
                    file:text-white
                    hover:file:bg-gradient-to-r from-indigo-600 to-purple-600
                "
            />
        </div>
    );
}