import {
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { formatRelativeTime } from "../utils/notificationHelpers";
import { useNavigate } from "react-router-dom";

const ICONS = {
  event: Calendar,
  message: MessageSquare,
  success: CheckCircle2,
  warning: AlertTriangle,
  system: Info,
};

const COLOR_STYLES = {
  event: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
  message: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  success: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  system: "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300",
};

export default function NotificationItem({ notification, onMarkAsRead, onRemove }) {
  const navigate = useNavigate();
  const Icon = ICONS[notification.type] || Info;
  const colorClass = COLOR_STYLES[notification.type] || COLOR_STYLES.system;

  const handleClick = () => {
    if (!notification.read) onMarkAsRead(notification.id);

    switch (notification.type) {
      case "EVENT_CREATED":
        navigate(`/events/${notification.event?.id}`);
        break;
      case "RESERVATION_CREATED":
        navigate(`/mes-events`); // organizer va voir ses réservations en attente
        break;
      case "RESERVATION_VALIDATED":
      case "RESERVATION_CANCELLED":
        navigate(`/mes-reservations`); // user va voir le statut de sa réservation
        break;
      default:
        break;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex gap-4 rounded-2xl border p-4 transition-all duration-200 cursor-pointer
        ${
          notification.read
            ? "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
            : "bg-indigo-50/60 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20 hover:shadow-md"
        }
        hover:border-gray-200 dark:hover:border-gray-700`}
    >
      {!notification.read && (
        <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-indigo-600" />
      )}

      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClass}`}>
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm ${notification.read ? "font-medium text-gray-700 dark:text-gray-200" : "font-semibold text-gray-900 dark:text-white"}`}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
          )}
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {notification.message}
        </p>

        <span className="mt-2 inline-block text-xs text-gray-400 dark:text-gray-500">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(notification.id);
        }}
        className="absolute right-3 top-3 rounded-full p-1 text-gray-300 opacity-0 transition-opacity
          hover:bg-gray-100 hover:text-gray-500 group-hover:opacity-100
          dark:hover:bg-gray-800 dark:text-gray-600"
        aria-label="Supprimer"
      >
        <X size={16} />
      </button>
    </div>
  );
}