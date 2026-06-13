import { useState } from "react";
import { useOrganizerEvents } from "../hooks/useOrganizerEvents";
//pour le carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function EventOrganizer() {
  // ✅ state global des events
const { events, addEvent, removeEvent } = useOrganizerEvents();
const now = new Date().toISOString().slice(0, 16);
// ✅ state local du formulaire
const [form, setForm] = useState({
  title: "",
  description: "",
  startDate: now,
  endDate: now,
  address: "",
  city: "",
  category: "CONCERT",
  eventype:"GRATUIT",
  price: "",
  capacity: "",
  media: [],
});

  // ✅ MEDIA devient FILE
  const [media, setMedia] = useState({
    file: null,
    type: "IMAGE",
  });
//fonction générique pour tous les inputs
const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => {
    const updated = {
      ...prev,
      [name]: value,
    };

    // si gratuit → prix vide
    if (name === "eventype" && value === "GRATUIT") {
      updated.price = "";
    }

    // si date fin < date début
    if (
      name === "startDate" &&
      updated.endDate < value
    ) {
      updated.endDate = value;
    }

    return updated;
  });
};
// ✅ format date FR
const formatEventDate = (date) => {
  return new Date(date).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
console.log(form);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("category", form.category);
    formData.append("capacity", form.capacity);
    formData.append("eventType", form.eventype);
    formData.append("price", form.price);
    formData.append("startDate",form.startDate);
    formData.append("endDate",form.endDate);
    form.media.forEach((m) => {
      formData.append("files", m.file);
      formData.append("types", m.type);
    });

    await addEvent(formData);

   setForm({
  title: "",
  description: "",
  startDate: now,
  endDate: now,
  address: "",
  city: "",
  category: "CONCERT",
  eventype: "GRATUIT",
  price: "",
  capacity: "",
  media: [],
});

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="p-6 mt-24 min-h-screen
bg-gradient-to-br from-indigo-50 via-white to-purple-100
dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Organisateur
      </h1>

      {/* FORM */}
     <form
  onSubmit={handleSubmit}
   className="bg-white/80 dark:bg-gray-900/80
  backdrop-blur-md p-6 rounded-2xl shadow-lg border
  border-gray-200 dark:border-gray-700
  space-y-5"
>
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
    Créer un événement
  </h2>

  {/* GRID INPUTS */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

  {/* TITLE */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Titre
    </label>

    <input
      name="title"
      value={form.title}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* CATEGORY */}
  <div className="flex flex-col">
   <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Catégorie
    </label>

    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    >
      <option value="CONCERT">Concert</option>
      <option value="SPORT">Sport</option>
      <option value="CONFERENCE">Conférence</option>
      <option value="FORMATION">Formation</option>
      <option value="CULTURE">Culture</option>
      <option value="FESTIVAL">Festival</option>
      <option value="GAMING">Gaming</option>
      <option value="AUTRES">Autres</option>
    </select>
  </div>

  {/* TYPE */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Type d'événement
    </label>

    <select
      name="eventype"
      value={form.eventype}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    >
      <option value="GRATUIT">GRATUIT</option>
      <option value="PAYANT">PAYANT</option>
    </select>
  </div>

  {/* PRICE */}
{/* PRICE */}
<div className="flex flex-col dark:text-white">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
    Prix
  </label>

  <input
    type="number"
    name="price"
    value={form.price}
    onChange={handleChange}
    readOnly={form.eventype === "GRATUIT"}
    placeholder={
      form.eventype === "GRATUIT"
        ? "Événement gratuit"
        : "Entrer le prix"
    }
    className={`w-full px-4 py-2 border rounded-lg outline-none transition  dark:bg-gray-800
    ${
      form.eventype === "GRATUIT"
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "focus:ring-2 focus:ring-indigo-500"
    }`}
  />
</div>

  {/* ADDRESS */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Adresse
    </label>

    <input
      name="address"
      value={form.address}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* CITY */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Ville
    </label>

    <input
      name="city"
      value={form.city}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* CAPACITY */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
      Capacité
    </label>

    <input
      name="capacity"
      value={form.capacity}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
    />


</div>
<div className="flex flex-col">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
    Date de début
  </label>

  <input
    type="datetime-local"
    name="startDate"
    value={form.startDate}
    onChange={handleChange}
    min={now}
    className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
  />
</div>

<div className="flex flex-col">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
    Date de fin
  </label>

  <input
    type="datetime-local"
    name="endDate"
    value={form.endDate}
    onChange={handleChange}
    min={form.startDate}
    className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
  />
</div>
  </div>
<div className="flex flex-col md:col-span-3">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
    Description
  </label>

  <textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    rows={5}
        className="w-full px-4 py-2 border rounded-lg outline-none
bg-white dark:bg-gray-800
text-gray-800 dark:text-white
border-gray-300 dark:border-gray-700
focus:ring-2 focus:ring-indigo-500"
  
  />
</div>
 

  {/* MEDIA BOX */}
   <div className="border rounded-xl p-4
bg-gray-50 dark:bg-gray-800/60
border-gray-200 dark:border-gray-700
space-y-3">
    <h3 className="font-medium text-gray-700 dark:text-gray-200">Médias</h3>

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
      className="bg-white dark:bg-gray-900
rounded-3xl overflow-hidden shadow-lg
border border-gray-100 dark:border-gray-700"
    >
      <div className="relative overflow-hidden">
        
      {/* MEDIA CAROUSEL */}
{ev.media?.length > 0 ? (
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: 3000 }}
    spaceBetween={0}
    slidesPerView={1}
    className="h-64"
  >
    {ev.media.map((m, i) => (
      <SwiperSlide key={i}>
        {m.type === "IMAGE" ? (
          <img
            src={`http://localhost:8080${m.url}`}
            alt=""
            className="h-64 w-full object-cover"
          />
        ) : (
          <video
            src={`http://localhost:8080${m.url}`}
            className="h-64 w-full object-cover"
            controls
          />
        )}
      </SwiperSlide>
    ))}
  </Swiper>
) : (
  <div className="h-44 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
    Aucun média
  </div>
  
)}
  <span
    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-20 
    ${
      ev.type === "GRATUIT"
        ? "bg-green-500 text-white"
        : "bg-yellow-400 text-black"
    }`}
  >
    {ev.type === "GRATUIT"
      ? "🎉 Gratuit"
      : `💰 ${ev.price.toLocaleString("fr-FR")} Ar`}
  </span>
  </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between dark:text-gray-400" >
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {ev.title}
            </h2>
                        
            <p className="text-sm text-gray-500 mt-1  dark:text-gray-200">
              📍 {ev.location}
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-200">
  🏙️ {ev.city}
</p>

<p className="text-sm text-gray-500  dark:text-gray-200">
  🛣️ {ev.address}
</p>

<span className="inline-block mt-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full ">
  {ev.category}
</span>
          </div>

          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full ">
            {ev.capacity} places
          </span>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-3  dark:text-gray-200" >
          {ev.description}
        </p>
         <p className="text-sm text-gray-500 mt-2  dark:text-gray-200">
  📅 {formatEventDate(ev.startDate)} au{" "}
  {formatEventDate(ev.endDate)}
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
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition font-medium  dark:text-gray-200"
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