export const NAV_ITEMS = [
  { label: "Réservations", path: "/mes-reservations", auth: true },
  { label: "Statistiques", path: "/statistiques", auth: true, roles: ["ORGANIZER"] },
  { label: "Mes billets", path: "/mes-billets", auth: true, roles: ["USER"] },
];