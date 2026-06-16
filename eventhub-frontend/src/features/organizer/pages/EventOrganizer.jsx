import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";
import { useOrganizerEvents } from "../hooks/useOrganizerEvents";

export default function EventOrganizer() {
  const { events, addEvent, removeEvent } =
    useOrganizerEvents();

  const handleCreateEvent = async (formData) => {
    await addEvent(formData);
  };

  return (
       <div className="p-6 mt-20 min-h-screen 
bg-gradient-to-br from-indigo-50 via-white to-purple-100
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <EventForm onSubmit={handleCreateEvent} />

      <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={removeEvent}
          />
        ))}
      </div>
    </div>
  );
}