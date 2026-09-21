import { useState } from "react";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Ticket,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---------- DONNÉES SIMULÉES (à remplacer par l'API plus tard) ----------

const kpiData = [
  {
    label: "Revenus totaux",
    value: "4 250 000 Ar",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "Billets vendus",
    value: "1 284",
    change: "+8.2%",
    trend: "up",
    icon: Ticket,
    color: "from-indigo-500 to-purple-600",
  },
  {
    label: "Événements actifs",
    value: "23",
    change: "-2.1%",
    trend: "down",
    icon: Calendar,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Participants",
    value: "3 891",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
];

const revenueByMonth = [
  { month: "Jan", revenue: 320000 },
  { month: "Fév", revenue: 410000 },
  { month: "Mar", revenue: 380000 },
  { month: "Avr", revenue: 520000 },
  { month: "Mai", revenue: 610000 },
  { month: "Juin", revenue: 480000 },
  { month: "Juil", revenue: 720000 },
  { month: "Août", revenue: 690000 },
  { month: "Sep", revenue: 850000 },
];

const ticketsByCategory = [
  { name: "Concert", value: 420, color: "#6366f1" },
  { name: "Conférence", value: 280, color: "#8b5cf6" },
  { name: "Sport", value: 195, color: "#ec4899" },
  { name: "Festival", value: 310, color: "#f59e0b" },
  { name: "Autre", value: 79, color: "#10b981" },
];

const reservationsByStatus = [
  { status: "Confirmées", count: 890 },
  { status: "En attente", count: 210 },
  { status: "Annulées", count: 74 },
];

const topEvents = [
  { name: "Festival Madajazzcar", tickets: 340, revenue: "1 200 000 Ar" },
  { name: "Conférence Tech Antananarivo", tickets: 210, revenue: "630 000 Ar" },
  { name: "Concert Rary Raymond", tickets: 185, revenue: "555 000 Ar" },
  { name: "Match All Star", tickets: 160, revenue: "480 000 Ar" },
  { name: "Salon de l'entrepreneuriat", tickets: 142, revenue: "426 000 Ar" },
];

// ---------- COMPOSANT ----------

export default function Statistics() {
  const [period, setPeriod] = useState("year");

  return (
    <div className="min-h-screen p-6 pt-28 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Statistiques</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Vue d'ensemble de vos performances
            </p>
          </div>

          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border dark:border-gray-700 w-fit">
            {[
              { key: "week", label: "Semaine" },
              { key: "month", label: "Mois" },
              { key: "year", label: "Année" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  period === p.key
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${kpi.color} flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      kpi.trend === "up"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {kpi.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold dark:text-white">{kpi.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
              </div>
            );
          })}
        </div>

        {/* GRAPHIQUES LIGNE 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Revenus par mois */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-indigo-600" />
              <h2 className="font-semibold dark:text-white">Évolution des revenus</h2>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} Ar`, "Revenus"]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition par catégorie */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border dark:border-gray-700 shadow-sm">
            <h2 className="font-semibold mb-4 dark:text-white">Billets par catégorie</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={ticketsByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {ticketsByCategory.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {ticketsByCategory.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs dark:text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRAPHIQUES LIGNE 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Réservations par statut */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border dark:border-gray-700 shadow-sm">
            <h2 className="font-semibold mb-4 dark:text-white">Réservations par statut</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={reservationsByStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="status" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top événements */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border dark:border-gray-700 shadow-sm">
            <h2 className="font-semibold mb-4 dark:text-white">Top événements</h2>
            <div className="space-y-3">
              {topEvents.map((e, i) => (
                <div
                  key={e.name}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm dark:text-white">{e.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {e.tickets} billets vendus
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">
                    {e.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}