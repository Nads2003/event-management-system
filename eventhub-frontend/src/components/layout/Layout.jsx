import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { Outlet,useLocation } from "react-router-dom";
export default function Layout({ children }) {
  const location = useLocation();
  //detecte si l'url se termine par /events/:id/reservation
  const isReservationPage = /^\/events\/[^/]+\/reservation$/.test(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {!isReservationPage && <Footer />}
    </div>
  );
}