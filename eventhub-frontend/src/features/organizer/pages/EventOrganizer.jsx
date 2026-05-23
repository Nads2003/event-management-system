import { useState } from "react";
import { useOrganizerEvents } from "../hooks/useOrganizerEvents";

export default function EventOrganizer() {
  const { events, addEvent, removeEvent } = useOrganizerEvents();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    media: [],
  });

  // ✅ MEDIA devient FILE
  const [media, setMedia] = useState({
    file: null,
    type: "IMAGE",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ajouter fichier (PC)
const addMedia = () => {
  if (!media.file) return;

  const previewUrl = URL.createObjectURL(media.file);

setForm((prev) => ({
  ...prev,
  media: [...prev.media, media],
}));

  setMedia({ file: null, type: "IMAGE" });
};

  // ✅ submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("capacity", form.capacity);

    form.media.forEach((m) => {
      formData.append("files", m.file);
      formData.append("types", m.type);
    });

    await addEvent(formData);

    setForm({
      title: "",
      description: "",
      location: "",
      capacity: "",
      media: [],
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-6 mt-24">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Organisateur
      </h1>

      {/* FORM */}
     <form
  onSubmit={handleSubmit}
  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border space-y-5"
>
  <h2 className="text-xl font-semibold text-gray-800">
    Créer un événement
  </h2>

  {/* GRID INPUTS */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      name="title"
      placeholder="Titre de l'événement"
      value={form.title}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />

    <input
      name="location"
      placeholder="Lieu"
      value={form.location}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />

    <input
      name="capacity"
      placeholder="Capacité"
      value={form.capacity}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />

    <input
      name="description"
      placeholder="Description"
      value={form.description}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  </div>

  {/* MEDIA BOX */}
  <div className="border rounded-xl p-4 bg-gray-50 space-y-3">
    <h3 className="font-medium text-gray-700">Médias</h3>

    <div className="flex flex-col md:flex-row gap-3 items-center">
     <input
  type="file"
  multiple
  accept="image/*,video/*"
  onChange={(e) => {
    const files = Array.from(e.target.files);

    const medias = files.map((file) => ({
      file,
      type: file.type.startsWith("video")
        ? "VIDEO"
        : "IMAGE",
      preview: URL.createObjectURL(file),
    }));

    setForm((prev) => ({
      ...prev,
      media: [...prev.media, ...medias],
    }));
  }}
  className="hidden"
  id="mediaUpload"
/>
<label
  htmlFor="mediaUpload"
  className="cursor-pointer flex items-center justify-center border-2 border-dashed border-indigo-300 rounded-2xl p-8 hover:bg-indigo-50 transition"
>
  <div className="text-center">
    <p className="text-indigo-600 font-semibold">
      📸 Ajouter images ou vidéos
    </p>

    <p className="text-sm text-gray-500 mt-1">
      JPG, PNG, MP4...
    </p>
  </div>
</label>

      <select
        value={media.type}
        onChange={(e) =>
          setMedia({ ...media, type: e.target.value })
        }
        className="px-3 py-2 border rounded-lg"
      >
        <option value="IMAGE">IMAGE</option>
        <option value="VIDEO">VIDEO</option>
      </select>
    </div>

    {/* preview media */}
{form.media.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
    {form.media.map((m, i) => (
      <div
        key={i}
        className="relative group rounded-2xl overflow-hidden shadow-lg"
      >
        {m.type === "IMAGE" ? (

  <img
    src={m.preview}
    className="w-full h-40 object-cover"
    alt=""
  />
) : (
  <video
    src={m.preview}
    className="w-full h-40 object-cover"
    controls
  />
)}
    

        {/* DELETE */}
        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              media: prev.media.filter(
                (_, index) => index !== i
              ),
            }))
          }
          className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}
  </div>

  {/* SUBMIT */}
  <button
    type="submit"
    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
  >
    Créer l'événement
  </button>
</form>

      {/* LIST */}
  <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
  {events.map((ev) => (
    <div
      key={ev.id}
      className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300"
    >
      {/* MEDIA */}
      {ev.media?.length > 0 ? (
        <div className="grid grid-cols-2 gap-1 bg-gray-100">
          {ev.media.slice(0, 4).map((m, i) =>
            m.type === "IMAGE" ? (
              <img
                key={i}
                src={m.url}
                alt=""
                className="h-44 w-full object-cover hover:scale-105 transition duration-300"
              />
            ) : (
              <video
                key={i}
                src={m.url}
                className="h-44 w-full object-cover"
                controls
              />
            )
          )}
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
          Aucun média
        </div>
      )}

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {ev.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              📍 {ev.location}
            </p>
          </div>

          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            {ev.capacity} places
          </span>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-3">
          {ev.description}
        </p>

        {/* ACTIONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                "Voulez-vous vraiment supprimer cet événement ?"
              );

              if (confirmDelete) {
                removeEvent(ev.id);
              }
            }}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition font-medium"
          >
            Supprimer
          </button>

          <button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition font-medium"
          >
            Voir
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}