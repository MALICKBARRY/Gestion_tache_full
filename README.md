# Gestion des Tâches d'une Équipe
Projet API Node.js (Express + MongoDB Atlas)

## Installation
1. Copier `.env.example` en `.env` et remplir `MONGO_URI` et `JWT_SECRET`
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur en dev :
   ```bash
   npm run dev
   ```

## Routes principales
- POST /api/auth/register
- POST /api/auth/login
- POST /api/members
- GET /api/members
- POST /api/tasks
- GET /api/tasks

(Les routes `/api/members` et `/api/tasks` sont protégées et nécessitent un header Authorization: Bearer <token>)
