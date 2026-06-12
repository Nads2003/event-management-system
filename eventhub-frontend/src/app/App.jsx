import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import OrganizerEvents from "../features/organizer/pages/EventOrganizer";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Events from "../features/events/pages/Event";
import EventDetail from "../features/events/pages/EventDetail";

function App() {
  return (
    <Routes>

      {/* AUTH (sans layout si tu veux clean UI) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* APP AVEC LAYOUT */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route
  path="/creer-event"
  element={<OrganizerEvents />}
/>
        <Route path="/events/:id" element={<EventDetail />} />
      </Route>

    </Routes>
  );
}

export default App;