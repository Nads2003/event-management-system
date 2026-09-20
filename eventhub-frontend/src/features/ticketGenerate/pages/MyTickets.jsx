import { useState, useEffect } from "react";
import {
  getEligibleReservations,
  generateTickets,
  getMyTickets,
} from "../sevices/TicketGenerateService";
import TicketCard from "../components/TicketCard";

export default function MyTickets() {
  const [reservations, setReservations] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resReservations, resTickets] = await Promise.all([
        getEligibleReservations(),
        getMyTickets(),
      ]);
      setReservations(resReservations.data);
      setTickets(resTickets.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleGenerate = async (reservationId) => {
    setGeneratingId(reservationId);
    try {
      await generateTickets(reservationId);
      await fetchAll(); // rafraîchit la liste des tickets + statut "généré"
    } catch (err) {
      alert("Erreur lors de la génération du billet.");
    } finally {
      setGeneratingId(null);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen  p-6 pt-28 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

      {/* Réservations confirmées & payées, prêtes à générer le billet */}
      <section>
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Mes réservations confirmées
        </h2>
        {reservations.length === 0 && (
          <p className="text-gray-500">Aucune réservation confirmée pour le moment.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 border dark:border-gray-700 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold dark:text-white">{r.eventTitle}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(r.eventStartDate).toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  {r.reservationCode}
                </p>
              </div>

              {r.ticketsGenerated ? (
                <span className="text-green-600 text-sm font-medium">✅ Billet généré</span>
              ) : (
                <button
                  onClick={() => handleGenerate(r.id)}
                  disabled={generatingId === r.id}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {generatingId === r.id ? "Génération..." : "Générer mon billet"}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Billets déjà générés avec QR code */}
      <section>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Mes billets</h2>
        {tickets.length === 0 && (
          <p className="text-gray-500">Aucun billet généré pour le moment.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      </section>
    </div>
  );
}