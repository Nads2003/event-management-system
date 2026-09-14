import { Bell } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import NotificationList from "../components/NotificationList";
import NotificationFilterBar from "../components/NotificationFilterBar";
import NotificationSkeleton from "../components/NotificationSkeleton";
import NotificationEmptyState from "../components/NotificationEmptyState";

export default function NotificationPage() {
  const {
    notifications,
    loading,
    error,
    filter,
    setFilter,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600">
            <Bell className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Restez informé de l'actualité de vos événements
            </p>
          </div>
        </div>

        <NotificationFilterBar
          filter={filter}
          setFilter={setFilter}
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
        />

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <NotificationEmptyState filter={filter} />
        ) : (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onRemove={removeNotification}
          />
        )}
      </div>
    </div>
  );
}