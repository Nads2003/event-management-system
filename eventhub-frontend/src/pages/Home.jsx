import Contenus from "./Contenus";
export default function Home() {
  return (
    <div className="p-9 ">
      <div className="p-6 rounded-lg bg-gray-50">
      <p className="text-center ">
        Bienvenue dans EventHub 🎉
        Nous sommes ravis de vous accueillir sur notre plateforme de gestion d'événements.
        Que vous organisiez une conférence, un atelier, un concert ou tout autre type d'événement, EventHub est là pour vous aider à gérer tous les aspects de votre événement de manière efficace et sans stress.
      </p>
      </div>
      <Contenus></Contenus>
      
    </div>
  );
}