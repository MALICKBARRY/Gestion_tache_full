# Frontend - Gestion des Tâches d'Équipe

Interface utilisateur React pour l'API de gestion des tâches.

## Technologies utilisées
- **React 19** avec Vite
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling
- **Axios** pour les appels API
- **Lucide React** pour les icônes

## Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

## Fonctionnalités

### Authentification
- Inscription et connexion
- Gestion des sessions avec JWT
- Routes protégées

### Dashboard
- Vue d'ensemble des statistiques
- Tâches récentes
- Métriques de l'équipe

### Gestion des Tâches
- Créer, modifier, supprimer des tâches
- Filtrage par priorité et statut
- Assignation aux membres
- Gestion des échéances

### Gestion des Membres
- Ajouter des membres d'équipe
- Définir les rôles (chef/membre)
- Modifier les informations

## Configuration

L'API backend est configurée sur : `https://gestion-taches-rh1s.onrender.com/api`

Pour changer l'URL de l'API, modifiez le fichier `src/services/api.js`.

## Structure du projet

```
src/
├── components/     # Composants réutilisables
├── contexts/       # Contextes React (Auth)
├── pages/          # Pages de l'application
├── services/       # Services API
└── utils/          # Utilitaires
```