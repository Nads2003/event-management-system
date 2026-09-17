import { useState } from "react";
// composant hooks events
import { useEvents } from "../hooks/Event";
// composants découpés
import SearchFilterBar from "../components/SearchFilterBar";
import EventCard from "../components/EventCard";

export default function Events() {
  // ✅ state global des events
  const { events } = useEvents();
  const categories = [...new Set(events.map((e) => e.category))];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = events.filter((event) => {
    const matchSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "" || event.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div
      className="min-h-screen pt-27 px-6 lg:px-16 pb-5
      bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
    >
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Tous les événements
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Explore et réserve les meilleurs événements
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <SearchFilterBar
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />

      {/* EVENTS LIST (COLUMN STYLE) */}
      <div className="space-y-6">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}