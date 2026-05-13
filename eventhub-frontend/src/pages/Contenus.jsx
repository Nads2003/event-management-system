import { useEffect, useState } from "react";
import{ FaUser,FaHeart } from "react-icons/fa"
import { NavLink } from "react-router-dom";
export default function Contenus(){
   const[contenus,setContenus]=useState([
        { id: 1,
         title: "Notre Fete",
         auter:"Sambatra",
        description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" },
        { id: 2,
         title: "Contenu 2",
         auter:"Fifaliako",
           description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" },
        { id: 3, 
        title: "Contenu 3",
        auter:"Fifah",
       description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" },
      {
        id:4,
        title:"contenu 4",
        auter:"Nads",
         description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" 
      },{
         id:5,
        title:"contenu 5",
        auter:"Ismael",
         description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" 
      },{
         id:6,
        title:"contenu 6",
        auter:"Fitiavanjanahary",
         description: "La fete d'indepence de le nation , on doit participer à cet evenement nous nous remerercions" },
    ]) ;   
    const [categories,setCategories]=useState([ {
            id:1,
            title:"Anniversaire"
        },
          {
            id:2,
            title:"Concept"
        },
          {
            id:3,
            title:"Formation"
        },
          {
            id:4,
            title:"Live"
        }])
        const [Tous,setTous]=useState('Tous')
  useEffect(()=>{
    console.log('sambatra')
    setTous("Bonbon")

  }
    
  )
   const ChangeCategorie=()=>{
    if (categories.length!=0){
      categories.filter(cat=>(
        setCategories(cat.title="nads")
      )

      )
    }
   }
   return (
    <div>
      <div className="flex items-center justify-between  mb-6 shadow-xl">
      <ul className="flex items-center gap-3 list-none flex-wrap p-6" >
        <li className="">
            <NavLink
            className={({isActive})=>
            isActive
            ?" bg-indigo-400 border border-indigo-400 rounded-lg text-white"
            :"text-slate-700"
            }
            >{Tous}</NavLink>
           
        </li>
       {categories.map(categorie => (
        
        <li key={categorie.id}>
      
        <button className="border border-indigo-400 rounded-lg"> { categorie.title}</button>
        </li>
      ))

      }
      </ul>
        <input type="text" placeholder=" recherche...." className="  w-2xl h-8 border border-indigo-500 shadow-2xl rounded-lg m-5" />
       </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-2xl">
           {contenus.map(contenu => (
               <div key={contenu.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                    <FaUser className="border border-red-400 rounded-full text-indigo-400 text-4xl" />
                    <span>{contenu.auter}</span>
                </div>
                <div className="p-5">
                    <h2 className="text-lg font-semibold">{contenu.title}</h2>
                   <p className="text-gray-600 p-2">{contenu.description}</p>
                </div>
                 <div className="flex items-center justify-between mx-6 mt-3 ">
                    <button className="bg-indigo-400 w-24 
                    h-8 rounded-lg border border-red-400 
                    shadow-xl text-lg" onClick={ChangeCategorie}> S'inscrire</button>
                    <FaHeart className="text-2xl text-red-400 border border-white" ></FaHeart>
                    
                </div>  
               </div>
           ))}
       </div>
    </div>
    
   );
}