# Event Management System

Une plateforme web moderne de gestion d’événements permettant aux utilisateurs de découvrir, réserver et gérer des événements facilement.

## Fonctionnalités

### Participant (Utilisateur)
- Consulter les événements disponibles
- Rechercher un événement
- Filtrer par catégorie
- Réserver un billet
- Consulter ses réservations
- Générer et télécharger son billet (QR code + PDF) une fois la réservation confirmée et payée
- Recevoir des notifications en temps réel (nouvel événement, réservation validée/refusée)
- Authentification / Connexion

### Organisateur
- Créer un événement
- Modifier un événement
- Supprimer un événement
- Gérer les types de billets (tarifs, quantités disponibles)
- Suivre les réservations de ses événements
- Recevoir une notification à chaque nouvelle réservation
- Consulter les statistiques de ses événements (revenus, billets vendus, top événements)

---

## Technologies utilisées

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React
- Recharts (statistiques)
- qrcode.react (génération QR code)
- jsPDF / html2canvas (export PDF des billets)

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
