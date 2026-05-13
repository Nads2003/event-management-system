import { NavLink,Link } from "react-router-dom";

export default function Navbar(){
    return (
    <div className=" fixed top-0 left-0 bg-white w-full z-50 p-2 ">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-indigo-500">EventHub</h1>
        <ul className="hidden md:flex items-center gap-4">
          <li>
            <NavLink 
            to="/"
            end
            className={({isActive})=>
            isActive
            ? "text-indigo-400 font-bold border-b-2 border-indigo-400"
            :"text-gray-600"
            } >Accueil</NavLink>
          </li>
          <li><NavLink 
           to="/evenement"
           className={({isActive})=>
            isActive
           ? "text-indigo-400 font-bold border-b-2 border-indigo-400"
           :"text-gray-600"  
        }
          >Evanement</NavLink></li>
          <li>
            <NavLink 
           to="/historique"
           className={({isActive})=>
            isActive
           ? "text-indigo-400 font-bold border-b-2 border-indigo-400"
           :"text-gray-600"  
        }
          >Historique</NavLink>
          </li>
          <li>
            <NavLink 
           to="/Billet"
           className={({isActive})=>
            isActive
           ? "text-indigo-400 font-bold border-b-2 border-indigo-400"
           :"text-gray-600"  
        }
          >Billet</NavLink>
          </li>
        </ul>
      <button className="bg-indigo-500 text-white py-2 px-4 rounded"> 
        <Link
        to="/connexion"
        >Se connecter</Link> </button>
      </div>
    </div>
    );
   
}