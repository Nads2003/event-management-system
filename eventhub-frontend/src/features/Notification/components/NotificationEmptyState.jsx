import { BellOff } from "lucide-react";

export default function NotificationEmptyState({ filter }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-20 text-center dark:border-gray-700">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <BellOff className="text-gray-400" size={28} />
      </div>
      <p className="font-medium text-gray-700 dark:text-gray-200">
        {filter === "unread" ? "Aucune notification non lue" : "Aucune notification"}
      </p>
      <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
        Vous serez notifié ici des nouveautés concernant vos événements.
      </p>
    </div>
  );
}