# Base de données - Victor la Fromagerie

## Configuration

Ce projet utilise **SQLite** avec **Prisma** comme ORM pour une base de données locale et persistante.

### Structure de la base de données

- **Fromages** : Catalogue des fromages avec prix, stock, disponibilité
- **Commandes** : Commandes clients avec informations de retrait
- **Items de commande** : Détails des fromages commandés

## Scripts disponibles

```bash
# Générer le client Prisma
npm run db:generate

# Appliquer le schéma à la base de données
npm run db:push

# Importer les données initiales
npm run db:seed

# Ouvrir l'interface d'administration Prisma Studio
npm run db:studio
```

## Utilisation

### Services disponibles

#### FromageService
- `getAll()` : Récupérer tous les fromages
- `getById(id)` : Récupérer un fromage par ID
- `getAvailable()` : Récupérer les fromages disponibles
- `getFeatured()` : Récupérer les fromages mis en avant
- `create(data)` : Créer un nouveau fromage
- `update(id, data)` : Mettre à jour un fromage
- `delete(id)` : Supprimer un fromage
- `updateStock(id, stock)` : Mettre à jour le stock

#### CommandeService
- `getAll()` : Récupérer toutes les commandes
- `getById(id)` : Récupérer une commande par ID
- `create(data)` : Créer une nouvelle commande
- `updateStatus(id, statut)` : Mettre à jour le statut
- `delete(id)` : Supprimer une commande
- `getByStatus(statut)` : Récupérer par statut

### Routes API

#### Fromages
- `GET /api/fromages` : Liste des fromages
- `POST /api/fromages` : Créer un fromage
- `GET /api/fromages/[id]` : Détails d'un fromage
- `PUT /api/fromages/[id]` : Modifier un fromage
- `DELETE /api/fromages/[id]` : Supprimer un fromage

#### Commandes
- `GET /api/commandes` : Liste des commandes
- `POST /api/commandes` : Créer une commande

## Fichiers importants

- `prisma/schema.prisma` : Schéma de la base de données
- `lib/db.ts` : Configuration du client Prisma
- `lib/seed.ts` : Script d'import des données
- `lib/services/` : Services pour interagir avec la BDD
- `dev.db` : Fichier de la base de données SQLite (généré automatiquement)

## Interface d'administration

Pour gérer les données via une interface graphique :

```bash
npm run db:studio
```

Cela ouvrira Prisma Studio dans votre navigateur à l'adresse `http://localhost:5555`. 