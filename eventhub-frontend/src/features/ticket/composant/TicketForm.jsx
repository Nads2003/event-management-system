import { useState } from "react";

export default function TicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    ticketType: "STANDARD",
    description: "",
    price: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });

    setForm({
      ticketType: "STANDARD",
      description: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  dark:bg-gray-900/80
  backdrop-blur-md p-6 rounded-2xl shadow-lg border
  border-gray-200 dark:border-gray-700
  space-y-5"
    >
      <h2 className="text-2xl font-bold mb-6">
        Ajouter un ticket
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <select
          value={form.ticketType}
          onChange={(e) =>
            setForm({
              ...form,
              ticketType: e.target.value,
            })
          }
          className="p-3 rounded-xl border bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
        >
          <option value="STANDARD">
            Public
          </option>

          <option value="VIP">
            VIP
          </option>

          <option value="VVIP">
            VVIP
          </option>
        </select>

        <input
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
          className="p-3 rounded-xl border bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Quantité"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
          className="p-3 rounded-xl border bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="p-3 rounded-xl border bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        className="mt-6 px-6 py-3 rounded-xl
        bg-gradient-to-r
        from-indigo-600
        to-purple-600
        text-white font-semibold"
      >
        Ajouter Ticket
      </button>
    </form>
  );
}