import { useState } from "react";

export default function EventForm({ onSubmit }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    capacity: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl space-y-4"
    >

      <input
        name="title"
        placeholder="Titre"
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
      />

      <input
        name="location"
        placeholder="Lieu"
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800"
      />

      <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
        Ajouter événement
      </button>
    </form>
  );
}