import { QRCodeSVG } from "qrcode.react";

export default function TicketCard({ ticket }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border dark:border-gray-700">
      <h3 className="font-bold text-lg dark:text-white">{ticket.eventTitle}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(ticket.eventStartDate).toLocaleString("fr-FR")}
      </p>
      <p className="text-sm mt-1 dark:text-gray-300">Type : {ticket.ticketType}</p>

      <div className="flex justify-center my-4">
        <QRCodeSVG value={ticket.qrCode} size={180} />
      </div>

      <p className="text-center text-xs text-gray-400 font-mono">
        {ticket.ticketNumber}
      </p>

      {ticket.isChecked && (
        <p className="text-center text-green-600 text-sm mt-2 font-medium">
          ✅ Déjà scanné
        </p>
      )}
    </div>
  );
}