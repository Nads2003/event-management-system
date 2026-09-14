import NotificationItem from "./NotificationItem";
import { groupByDate } from "../utils/notificationHelpers";

const SECTION_LABELS = {
  today: "Aujourd'hui",
  yesterday: "Hier",
  week: "Cette semaine",
  older: "Plus ancien",
};

export default function NotificationList({ notifications, onMarkAsRead, onRemove }) {
  const groups = groupByDate(notifications);

  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([key, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={key}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {SECTION_LABELS[key]}
            </h3>
            <div className="space-y-3">
              {items.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onMarkAsRead={onMarkAsRead}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}