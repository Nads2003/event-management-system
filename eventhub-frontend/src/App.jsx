import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contenus from "./pages/Contenus";
import Navbar from "./pages/Navbar";
import Login from "./pages/Auth/Login";

function App() {

  return (
    <div className="bg-white p-5 rounded-lg shadow-md  h-full">
      <Navbar/>
      <Routes>
        <Route path="/"element={<Home />}/>
        <Route path="/event" element={<Contenus />}/>
        <Route path="/connexion"element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;