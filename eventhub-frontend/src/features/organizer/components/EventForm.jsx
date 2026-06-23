import { useState } from "react";

export default function EventForm({ onSubmit }) {
   // ✅ state global des events
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
     formData.append("startDate",form.startDate);
     formData.append("endDate",form.endDate);
     form.media.forEach((m) => {
       formData.append("files", m.file);
       formData.append("types", m.type);
     });
 
     await onSubmit(formData);
 
    setForm({
   title: "",
   description: "",
   startDate: now,
   endDate: now,
   address: "",
   city: "",
   category: "CONCERT",
   eventype: "GRATUIT",

   capacity: "",
   media: [],
 });
 
   } catch (error) {
     console.log(error);
   }
 };

  return (
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
  );
}