# Gestion des Tâches d'une Équipe
Application complète de gestion des tâches avec API Node.js et interface React

## 🚀 URL de déploiement
**Backend API** : `https://gestion-taches-rh1s.onrender.com`

## 📁 Structure du projet
```
Gest_Taches_Equips/
├── backend/        # API Node.js + Express + MongoDB
└── frontend/       # Interface React + Tailwind CSS
```

## 🛠️ Technologies

### Backend
- **Node.js** + Express.js
- **MongoDB Atlas** (base de données)
- **JWT** (authentification)
- **Bcrypt** (hashage des mots de passe)
- **Joi** (validation des données)
- **Helmet** + CORS (sécurité)

### Frontend
- **React 19** + Vite
- **Tailwind CSS** (styling)
- **React Router** (navigation)
- **Axios** (API calls)
- **Lucide React** (icônes)

## 🚀 Installation et démarrage

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Fonctionnalités

### ✅ Authentification
- Inscription et connexion sécurisées
- Gestion des rôles (admin/user)
- Sessions JWT

### 📊 Dashboard
- Statistiques en temps réel
- Vue d'ensemble des tâches
- Métriques de l'équipe

### 📝 Gestion des Tâches
- CRUD complet des tâches
- Priorités (élevée, moyenne, faible)
- Statuts (en cours, terminée)
- Assignation aux membres
- Filtrage et pagination
- Gestion des échéances

### 👥 Gestion des Membres
- CRUD des membres d'équipe
- Rôles (chef, membre)
- Auto-assignation des tâches aux chefs

## 🔗 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Membres (protégé)
- `GET /api/members` - Liste des membres
- `POST /api/members` - Créer un membre
- `PUT /api/members/:id` - Modifier un membre
- `DELETE /api/members/:id` - Supprimer un membre

### Tâches (protégé)
- `GET /api/taches` - Liste des tâches (avec filtres)
- `POST /api/taches` - Créer une tâche
- `PUT /api/taches/:id` - Modifier une tâche
- `DELETE /api/taches/:id` - Supprimer une tâche

## 🔐 Authentification
Toutes les routes protégées nécessitent le header :
```
Authorization: Bearer <token>
```

## 🎨 Interface utilisateur
- Design moderne et responsive
- Navigation intuitive
- Modales pour les formulaires
- Filtres et recherche
- Indicateurs visuels (couleurs par priorité/statut)

## 📱 Responsive Design
L'interface s'adapte automatiquement aux différentes tailles d'écran (mobile, tablette, desktop).

## 🔧 Configuration

### Variables d'environnement (backend)
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
```

### Configuration API (frontend)
Modifiez `frontend/src/services/api.js` pour changer l'URL de l'API.

## 🚀 Déploiement
- **Backend** : Déployé sur Render
- **Frontend** : Prêt pour déploiement (Vercel, Netlify, etc.)

## 📄 Documentation
- Voir `backend/README.md` pour les détails de l'API
- Voir `frontend/README.md` pour les détails de l'interface