import { Link } from "react-router-dom";
import { Mail, Lock, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas ❌");
      return;
    }

    setLoading(true);

    try {
      // on enlève confirmPassword avant envoi backend
      const { confirmPassword, ...dataToSend } = form;

      const res = await registerUser(dataToSend);

      console.log("User créé :", res.data);
      alert("Inscription réussie 🎉");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-purple-50 via-white to-indigo-100
      dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <div
        className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <Calendar className="text-white" size={28} />
          </div>

          <h2 className="text-3xl font-bold mt-4">Créer un compte</h2>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              onChange={handleChange}
              placeholder="Prénom"
              className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
            />

            <input
              name="lastName"
              onChange={handleChange}
              placeholder="Nom"
              className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4" size={18} />
            <input
              name="email"
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-12 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-4" size={18} />
            <input
              name="phone"
              onChange={handleChange}
              placeholder="Téléphone"
              className="w-full pl-12 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4" size={18} />

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="w-full pl-12 pr-12 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        <div className="relative">
           <Lock className="absolute left-4 top-4" size={18} />

  <input
    name="confirmPassword"
    type={showConfirmPassword ? "text" : "password"}
    onChange={handleChange}
    placeholder="Confirmer le mot de passe"
    className="w-full pl-12 pr-12 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-4 text-gray-500"
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>

          {/* ROLE SELECT */}
          <select
            name="role"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
            <option value="USER">User</option>
            <option value="ORGANIZER">Organizer</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>

        {/* LOGIN */}
        <p className="text-center mt-6">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
