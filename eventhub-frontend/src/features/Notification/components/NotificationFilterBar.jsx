import { CheckCheck } from "lucide-react";

export default function NotificationFilterBar({ filter, setFilter, unreadCount, onMarkAllAsRead }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
        {[
          { key: "all", label: "Toutes" },
          { key: "unread", label: `Non lues${unreadCount ? ` (${unreadCount})` : ""}` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
              ${
                filter === tab.key
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {unreadCount > 0 && (
        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          <CheckCheck size={16} />
          Tout marquer comme lu
        </button>
      )}
    </div>
  );
}