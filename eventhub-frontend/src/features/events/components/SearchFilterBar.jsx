import { Search } from "lucide-react";

export default function SearchFilterBar({
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      {/* Search */}
      <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/60 px-4 py-3 rounded-2xl shadow w-full">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un événement..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Categories */}
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/60 text-gray-700 dark:text-white "
      >
        <option value="">Toutes catégories</option>

        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}