# Event Management System

Une plateforme web moderne de gestion d’événements permettant aux utilisateurs de découvrir, réserver et gérer des événements facilement.

## Fonctionnalités

### Utilisateur
- Consulter les événements disponibles
- Rechercher un événement
- Filtrer par catégorie
- Réserver un billet
- Consulter ses réservations
- Authentification / Connexion

### Administrateur
- Ajouter un événement
- Modifier un événement
- Supprimer un événement
- Gérer les utilisateurs
- Suivre les réservations

---

## Technologies utilisées

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL

---

## Installation

### 1. Cloner le projet

```bash
git clone <ton-lien-github>
cd event-management-system
```

---

## Configuration Backend

Créer :

`src/main/resources/application-local.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eventhub
spring.datasource.username=postgres
spring.datasource.password=your_password
```

Ajouter dans `.gitignore`

```gitignore
src/main/resources/application-local.properties
```

---

## Lancer le backend

```bash
cd eventhub-backend
mvn spring-boot:run
```

Backend disponible sur :

```text
http://localhost:8080
```

---

## Lancer le frontend

```bash
cd eventhub-frontend
npm install
npm run dev
```

Frontend disponible sur :

```text
http://localhost:5173
```

---

## Structure du projet

```text
event-management-system/
│
├── eventhub-frontend/
└── eventhub-backend/
```

---

## Captures d’écran

Ajouter ici les captures de ton application.

---

## Auteur

Sambatra Fifa
Développeur Full Stack