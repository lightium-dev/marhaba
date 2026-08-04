# Marhba

Application mobile d'authentification complète — Express + PostgreSQL + Expo Router.

Un utilisateur crée un compte, se connecte, et accède à un écran d'accueil personnalisé. Le projet démontre un circuit d'authentification complet avec double protection des routes (backend et frontend).

## Prérequis

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (pour PostgreSQL)
- L'application [Expo Go](https://expo.dev/go) installée sur votre téléphone

## Installation — Backend

```bash
cd backend
npm install
cp .env.example .env
```

Depuis la racine du projet, démarrer la base de données PostgreSQL :

```bash
docker compose up -d
```

Puis démarrer le serveur :

```bash
cd backend
npm run dev
```

Le serveur tourne sur `http://localhost:5000`.

## Installation — Mobile

```bash
cd mobile
npm install
npx expo start
```

Scannez le QR code affiché avec l'application **Expo Go** sur votre téléphone (assurez-vous que votre téléphone est connecté au même réseau Wi-Fi que votre ordinateur).

> L'URL de l'API backend est détectée automatiquement via l'hôte du serveur de développement Expo (`services/api.js`) — aucune configuration manuelle d'adresse IP n'est nécessaire.

> ⚠️ Le backend doit être démarré **avant** de lancer l'application mobile.

## Endpoints de l'API

| Méthode | Route | Protection | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Publique | Inscription (hash du mot de passe, retourne un JWT) |
| POST | `/api/auth/login` | Publique | Connexion (vérifie le hash, retourne un JWT) |
| GET | `/api/auth/me` | 🔒 `authenticate` | Retourne les infos de l'utilisateur connecté |

## Stack technique

**Backend** — Node.js, Express, PostgreSQL, Sequelize, bcrypt, jsonwebtoken, Zod, dotenv

**Frontend** — Expo, Expo Router, Axios, Zustand, expo-secure-store

**Outils** — Postman, Git/GitHub, Docker, Jira
