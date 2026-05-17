import { Link } from "react-router-dom";
import { FaGlobe, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">E</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  EventMaster
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Gestion d'événements
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              Votre plateforme moderne pour découvrir, organiser et réserver des événements.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-4">
              Navigation
            </h4>

            <div className="space-y-3">
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                Accueil
              </Link>
              <Link to="/events" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                Événements
              </Link>
              <Link to="/guide" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                Guide
              </Link>
              <Link to="/login" className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600">
                Connexion
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <FaEnvelope />
                contact@eventmaster.com
              </p>

              <p className="flex items-center gap-2">
                <FaPhone />
                +261 34 00 000 00
              </p>

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Antananarivo, Madagascar
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-gray-800 dark:text-white mb-4">
              Réseaux
            </h4>

            <div className="flex gap-4 text-xl text-gray-600 dark:text-gray-300">
              <FaGlobe className="hover:text-indigo-600 cursor-pointer" />
              <FaGithub className="hover:text-gray-900 dark:hover:text-white cursor-pointer" />
              <FaTwitter className="hover:text-sky-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 text-center text-gray-500 dark:text-gray-400">
          © 2026 EventMaster — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}