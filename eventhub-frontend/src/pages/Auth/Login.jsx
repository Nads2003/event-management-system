export default function Login(){
    return(
        <div className="bg-white border border-indigo-400">
            <h3>Se connecter</h3>
            <div>
                <input type="text" placeholder="votre email" />
                <input type="text" placeholder="mot de passe" />
            </div>
            <div>
                <button>Connexion</button>
                <a href="">s'inscrire</a>
            </div>
        </div>
    )
}