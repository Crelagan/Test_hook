# Test Hook React 2plse

Test Réalisé pour la société 2pulse dans un processus de recrutement. 
(Les etapes obligatoire ont été réalisé mais pas le bonus).

Temp de developpement : 1h30

Découverte de la notion de hook et de callback en Typescript, mais aussi découverte d'un typescript Strict dans le typage en utilisant le moins possible le type Any ou Unknokwn

Quelques amélioration sont possible (Notament quelques refacto, et une utilisation plus utile du callback.)
  - Des refacto notamment dans le app.tsx 
  - Des callback plus inteligent (avec une meilleur comprehension de leur utilité et de la puissance de leur utilisation)
  - un visuel un peu moins brut avec l'utilisation de bootstrap par exemple. 


## Enoncé du test

L'objectif de ce test est d'implémenter un **hook React personnalisé** nommé `useMutation` permettant d'effectuer des requêtes HTTP (POST, PUT, PATCH) avec **Axios**.

Ce hook doit être **flexible, typé en TypeScript** et proposer des fonctionnalités avancées telles que **la gestion d'état, l'annulation de requête et un mode promesse**.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir l'environnement suivant :

- **Node.js** >= 20
- **Vite** (pour le bundler)
- **React** avec **TypeScript**
- **Axios** (pour gérer les requêtes HTTP et les erreurs)

### API

L'Url API de test est : https://jsonplaceholder.typicode.com/posts

---

## 🎯 Fonctionnalités attendues

### ✅ 1. Gestion des méthodes HTTP

- Le hook doit **uniquement** supporter les méthodes suivantes (controle Typescript uniquement) :
  - **POST**
  - **PUT**
  - **PATCH**
- La méthode **POST** est celle utilisée par défaut si aucune méthode n'est spécifiée.

---

### 🎯 2. Gestion des callbacks

Le hook doit permettre l'exécution de **callbacks optionnels** afin de gérer les réponses et erreurs :

- `onSuccess(data: Data)`: Callback déclenché en cas de succès de la requête, recevant les données retournées.
- `onError(error: any)`: Callback déclenché si la requête échoue, recevant l'erreur retournée par Axios.

Ces callbacks permettent une gestion flexible des réponses côté application.

---

### ⏳ 3. Gestion de l'état de chargement (`isLoading`)

- Le hook doit exposer une variable `isLoading` indiquant si une requête est en cours.
- Cette valeur passe à `true` au début de l'exécution de la requête et redevient `false` une fois terminée (succès ou erreur).

---

### 🔄 4. Mode `toPromise` (Retour en promesse)

Le hook doit offrir un moyen de gérer les requêtes de manière **synchrone** grâce à **`async/await`**.  

👉 Cela permet aux développeurs de traiter les mutations de manière plus **déclarative**, sans dépendre uniquement des callbacks.

## 🎁 Bonus : Provider pour définir une `baseUrl`

Pour aller plus loin, vous pouvez implémenter un **Provider React** permettant de définir une `baseUrl` (exemple: https://jsonplaceholder.typicode.com ) globale pour toutes les requêtes effectuées avec `useMutation`.  

Cela permet :
- D'éviter de répéter l'URL de base dans chaque mutation.
- De centraliser la configuration des appels API

---
