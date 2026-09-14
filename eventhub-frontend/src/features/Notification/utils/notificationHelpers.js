export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffH = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffH / 24);

  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffH < 24) return `Il y a ${diffH} h`;
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} j`;

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: diffDays > 365 ? "numeric" : undefined,
  });
}

export function groupByDate(notifications) {
  const groups = { today: [], yesterday: [], week: [], older: [] };
  const now = new Date();

  notifications.forEach((n) => {
    const date = new Date(n.createdAt);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) groups.today.push(n);
    else if (diffDays === 1) groups.yesterday.push(n);
    else if (diffDays < 7) groups.week.push(n);
    else groups.older.push(n);
  });

  return groups;
}

export const NOTIFICATION_TYPE_CONFIG = {
  event: { color: "indigo", icon: "Calendar" },
  message: { color: "blue", icon: "MessageSquare" },
  success: { color: "green", icon: "CheckCircle2" },
  warning: { color: "amber", icon: "AlertTriangle" },
  system: { color: "gray", icon: "Info" },
};