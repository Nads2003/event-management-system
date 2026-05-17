import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Contenus from "./pages/Contenus";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


function App() {

  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/contenus" element={<Contenus />} />
      </Routes>
    </div>
  );
}

export default App;