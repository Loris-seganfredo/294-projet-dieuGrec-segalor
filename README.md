# 🌐 Mon Projet Vue.js & Vuetify

## Étape 17 — Favoris et persistance dans le projet des dieux grecs

La séquence 5 est transposée aux dieux grecs : un cœur permet d'ajouter ou
de retirer un dieu des favoris depuis les cartes et les fiches détaillées.
La page **Mes favoris** est accessible depuis le menu.

- Site : https://loris-seganfredo.github.io/294-projet-dieuGrec-segalor/
- Favoris : https://loris-seganfredo.github.io/294-projet-dieuGrec-segalor/favoris/

### Checklist de réalisation

- [x] `favorites` est un tableau d'IDs dans `src/stores/godStore.js`.
- [x] `toggleFavorite(god)` ajoute ou retire un ID, puis sauvegarde.
- [x] `saveFavorites()` utilise `JSON.stringify()` et la clé `god_favorites`.
- [x] `loadFavorites()` utilise `JSON.parse()` et est appelée dans `init()`.
- [x] `isFavorite(god)` pilote l'icône, la couleur et l'état accessible du cœur.
- [x] `getFavorites` retrouve les objets complets et écarte les objets absents.
- [x] Le cœur utilise `@click.stop.prevent` et ne déclenche pas la navigation.
- [x] `GodCard.vue` est réutilisé sur l'accueil et dans `favoris.vue`.
- [x] La page favoris affiche un compteur et une alerte lorsque la liste est vide.
- [x] Les favoris sont restaurés après rechargement de la page.
- [x] Les confirmations d'ajout et de retrait disparaissent après deux secondes.
- [x] Le retrait du dernier favori laisse sa confirmation visible.

Les essais sur la version publiée ont vérifié l'ajout de Zeus, sa présence
après rechargement de la page favoris, puis son retrait et l'état vide.
L'animation `heartbeat`, le compteur et l'absence de navigation au clic sur
le cœur ont également été vérifiés. Aucune erreur ni avertissement n'a été
relevé dans la console pendant ces essais. La compilation et ESLint sur les
fichiers modifiés passent ; le lint global contient encore des problèmes
de mise en forme préexistants dans d'autres fichiers.

### Points à expliquer à l'oral

- Les IDs sont stables et évitent de sauvegarder des copies périmées des dieux.
- `localStorage` conserve du texte dans le navigateur utilisé. Il ne synchronise
  pas les appareils et ne remplace pas une base de données.
- `JSON.stringify()` convertit le tableau en texte ; `JSON.parse()` le restaure.
- `isFavorite` est un getter qui retourne une fonction prenant un dieu en argument.
- `getFavorites` utilise `find()` pour retrouver chaque dieu et `filter()` pour
  exclure les résultats `undefined`.
- Le pattern toggle ajoute l'ID avec `push()` ou le retire avec `splice()`.
- `.stop` bloque la propagation du clic ; `.prevent` annule son comportement
  par défaut. Dans ce projet, le lien « Voir le portrait » est séparé du cœur.
- Le nettoyage des IDs obsolètes attend la fin du chargement de toutes les pages
  de l'API, afin de ne pas supprimer un favori encore en cours de chargement.

La réalisation et les vérifications des étapes 12 à 17 ont été assistées par
Codex. Les éléments ci-dessus décrivent le code et les contrôles effectués,
sans présumer de la compréhension personnelle de l'élève.

## 1. 🎨 Présentation du projet

### Concept
- API choisie et pourquoi  
- Public cible  
- Objectifs de l’application  

### Fonctionnalités principales
- Affichage d’une liste d’éléments (via API)
- Recherche / Tri / Filtres
- Vue détail
- Fonctionnalité interactive (favoris, watchlist, paramètres…)
- Persistance locale (favoris ou préférences)

### Aperçu visuel
_(Capture d’écran de l’application)_  
`![Screenshot de l’application](img/screenshot.png)`

---

## 2. 📚 Parcours d'apprentissage

### Ressources utilisées
#### Documentation & tutos
- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Vuetify Docs](https://vuetifyjs.com/en/components/all/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Public APIs List](https://github.com/public-apis/public-apis)
- Autres ressources...

#### Progression
- Semaine 1 : ...
- Semaine 2 : ...
- Semaine 3 : ...
- Semaine 4 : ...
- ...

---

## 3. 🛠️ Outils et méthodologie

### Environnement de développement
- **IDE** : VS Code / WebStorm / Autre
- **Versioning** : Git + GitHub
- **Dépendances principales** : Vue 3, Vuetify 3, Pinia, Axios/Fetch
- **Gestion API Keys** : `.env` + `.env.example`

### Installation & Run
- Cloner le repo :...
- Installer :... 
- Lancer :...
- Variables d’environnement : copier `.env.example` → `.env` et compléter les clés nécessaires  

### Méthodologie
- Découpage en composants réutilisables
- Props & Emits clairs
- Store global avec Pinia
- Commits réguliers et explicites
- Tests manuels (UI, persistance, erreurs API)
- ...

### Choix techniques
- API sélectionnée :  
- Justification du choix :  
- Endpoints utilisés :  
- Limites/quotas connus :  

### Architecture (Descriptif + schéma simple + data-flow)
- `App.vue` : layout principal  
- `views/` : pages (liste, détail, favoris)  
- ...
Outils utiles : Figma / Draw.io / ...

**Data-flow résumé :**  
- Vue déclenche un **event utilisateur** → composant appelle une fonction du **store** → ...

---

## 4. 🧪 Tests et validation

### Tests techniques
- ✅ Appels API fonctionnels  
- ✅ Persistance vérifiée après refresh (localStorage)  
- ✅ Navigation entre les vues OK  
- ...

### Tests d’UX
- Navigation intuitive  
- Recherche/filtre/tri faciles à comprendre  
- Feedback utilisateur (loading, erreurs, vide)  
- ...

### Tests d’accessibilité
- Contraste couleurs (Vuetify par défaut)  
- Labels et placeholders corrects  
- Navigation clavier possible  
- Focus visible  
- ...

### Tests d’erreurs & fallback
- API down → **mock fallback** affiché (fichier local ou données simulées)  
- Liste vide → message clair affiché  
- Recherche sans résultat → affichage “Aucun élément trouvé”  
- ...

---

## 5. 🤖 Usage d’intelligence artificielle

**⚠️ TRANSPARENCE OBLIGATOIRE** : Si vous utilisez une IA, vous DEVEZ :

### IA utilisée
- **Nom** : ChatGPT / Claude / GitHub Copilot / Autre  
- **Version** : _(ex. GPT-4)_  
- **Contexte** : Aide ponctuelle / Génération de code / Debugging  

### Utilisation détaillée
**Domaines d'aide :**
- Aide au code général : X%
- Génération de snippets Vue/Vuetify : X%  
- Aide à la structuration du projet : X%
- Debugging : X%  
- Recherche d’idées : X%  

**Compréhension et adaptation**
- Expliquer ce que fait le code généré  
- Dire comment il a été adapté au projet  

### Parties codées manuellement
- Composants principaux : X% personnel  
- Store & persistance : X% personnel  
- Routing & navigation : X% personnel  
- Tests & validation : 100% personnel  

### Apprentissage personnel
- Ce que j’ai appris grâce à l’IA  
- Comment elle m’a aidé à progresser  

---

## 6. 🎯 Bilan personnel

### Ce que j’ai appris
- Compétences techniques acquises  
- Découvertes surprenantes  
- Concepts difficiles maîtrisés  

### Difficultés rencontrées
- Problèmes techniques et solutions trouvées  
- Moments de blocage et dépassement  
- Aide reçue et sources  

### Réussites et fiertés
- Aspects du projet dont je suis fier  
- Progrès constatés depuis le début  
- Envies de développement futur  

### Améliorations possibles
- Ce que j’ajouterais avec plus de temps  
- Fonctionnalités bonus envisagées  
- Compétences à approfondir  

---

## 7. 📚 Références & Sources
- Documentation de l’API : [Nom de l’API](https://...)  
- Tutos clés utilisés : ...  
- Usage de l’IA : voir section ci-dessus  
- Autres ressources utiles : ...
