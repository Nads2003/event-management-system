import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

export default function TicketCard({ ticket }) {
  const ticketRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, Math.min(imgHeight, pageHeight - 20));
      pdf.save(`billet-${ticket.ticketNumber}.pdf`);
    } catch (err) {
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={ticketRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border dark:border-gray-700"
      >
        <h3 className="font-bold text-lg dark:text-white">{ticket.eventTitle}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(ticket.eventStartDate).toLocaleString("fr-FR")}
        </p>
        <p className="text-sm mt-1 dark:text-gray-300">Type : {ticket.ticketType}</p>

        <hr className="my-3 dark:border-gray-700" />

        <div className="text-sm dark:text-gray-300 space-y-0.5">
          <p className="font-medium dark:text-white">
            {ticket.buyerFirstName} {ticket.buyerLastName}
          </p>
          <p className="text-gray-500 dark:text-gray-400">{ticket.buyerEmail}</p>
        </div>

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

      <button
        onClick={handleDownloadPdf}
        disabled={downloading}
        className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
      >
        <Download size={16} />
        {downloading ? "Génération..." : "Télécharger en PDF"}
      </button>
    </div>
  );
}