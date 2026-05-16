import { Link } from "react-router-dom";
import { User, Mail, Lock, Phone, Calendar } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-purple-50 via-white to-indigo-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 transition-all duration-500">

      <div className="w-full max-w-lg
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl rounded-3xl shadow-2xl
        border border-white/50 dark:border-gray-700 p-8 transition-all">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Calendar className="text-white" size={28} />
          </div>

          <h2 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">
            Créer un compte
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Rejoignez la plateforme EventMaster
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">

          {/* First / Last name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              className="p-4 rounded-2xl
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:bg-white dark:focus:bg-gray-700
              border border-transparent focus:border-indigo-500
              outline-none transition"
            />

            <input
              type="text"
              placeholder="Nom"
              className="p-4 rounded-2xl
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:bg-white dark:focus:bg-gray-700
              border border-transparent focus:border-indigo-500
              outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 rounded-2xl
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:bg-white dark:focus:bg-gray-700
              border border-transparent focus:border-indigo-500
              outline-none transition"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Téléphone"
              className="w-full pl-12 pr-4 py-4 rounded-2xl
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:bg-white dark:focus:bg-gray-700
              border border-transparent focus:border-indigo-500
              outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full pl-12 pr-4 py-4 rounded-2xl
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:bg-white dark:focus:bg-gray-700
              border border-transparent focus:border-indigo-500
              outline-none transition"
            />
          </div>

          {/* Button */}
          <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition">
            S'inscrire
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}