# Gestion des Tâches d'une Équipe
Projet API Node.js (Express + MongoDB Atlas)

## URL de déploiement
**Base URL**  
`https://gestion-taches-rh1s.onrender.com`

---

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

---

## Documentation des routes API

### Authentification

#### Inscription
- **POST** `/api/auth/register`
- **Body** :
  ```json
  {
    "nom": "string",
    "email": "string",
    "password": "string",
    "role": "admin" | "user" (optionnel)
  }
  ```

#### Connexion
- **POST** `/api/auth/login`
- **Body** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** : `{ token, user }`

---

### Membres (protégé, nécessite le header `Authorization: Bearer <token>`)

#### Créer un membre
- **POST** `/api/members`
- **Body** :
  ```json
  {
    "nom": "string",
    "email": "string",
    "role": "chef" | "membre" (optionnel)
  }
  ```

#### Lister tous les membres
- **GET** `/api/members`

#### Récupérer un membre par ID
- **GET** `/api/members/:id`

#### Modifier un membre
- **PUT** `/api/members/:id`
- **Body** : identique à la création

#### Supprimer un membre
- **DELETE** `/api/members/:id`

---

### Tâches (protégé, nécessite le header `Authorization: Bearer <token>`)

#### Créer une tâche
- **POST** `/api/taches`
- **Body** :
  ```json
  {
    "titre": "string",
    "description": "string",
    "priorite": "élevée" | "moyenne" | "faible",
    "status": "en cours" | "terminée",
    "assigneA": "memberId" (optionnel),
    "dateEch": "YYYY-MM-DD"
  }
  ```

#### Lister toutes les tâches (pagination et filtre)
- **GET** `/api/taches?priorite=...&status=...&page=...&limit=...`

#### Modifier une tâche
- **PUT** `/api/taches/:id`
- **Body** : identique à la création

#### Supprimer une tâche
- **DELETE** `/api/taches/:id`

---

Pour chaque route protégée, ajoutez le header :