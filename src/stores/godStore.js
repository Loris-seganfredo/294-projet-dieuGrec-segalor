// Pinia permet de créer une mémoire commune pour toutes les pages. Cette mémoire s’appelle un store.
import { defineStore } from 'pinia'
// Cette fonction va chercher le catalogue dans l’API de l’école.
import { getGods } from '@/services/godApi'

// L’accueil, la page des favoris et les fiches lisent tous les mêmes données dans ce store.
export const useGodStore = defineStore('gods', {
  // state contient les données de départ. Les listes commencent vides et les erreurs sont effacées.
  state: () => ({
    // Liste de toutes les divinités reçues de l’API.
    gods: [],
    // Liste des catégories proposées par le filtre de l’accueil.
    categories: [],
    // Chaque favori est enregistré avec son identifiant, le numéro unique de sa fiche.
    favorites: [],
    // Passe à vrai pendant le chargement pour afficher une barre ou des cartes d’attente.
    isLoading: false,
    // Passe à vrai dès que tout le catalogue est arrivé.
    hasLoaded: false,
    // Contient le texte à afficher si le catalogue ne peut pas être chargé.
    error: null,
    // Contient un autre message si le navigateur ne peut pas lire ou sauvegarder les favoris.
    favoritesError: null,
  }),

  // Les getters répondent à des questions sur les données, par exemple « combien de favoris ? ».
  getters: {
    // length donne le nombre d’éléments de la liste.
    totalGods: state => state.gods.length,
    // Compter les identifiants enregistrés dans les favoris.
    totalFavorites: state => state.favorites.length,
    // includes vérifie si le numéro de la divinité se trouve déjà dans les favoris.
    isFavorite: state => god => state.favorites.includes(god.id),
    // La page des favoris a besoin des fiches complètes. On les retrouve dans l’ordre des numéros sauvegardés.
    getFavorites: state => state.favorites
      // Pour chaque numéro, find cherche la fiche qui porte le même numéro.
      .map(id => state.gods.find(god => god.id === id))
      // Enlever les résultats vides si un numéro n’a plus de fiche.
      .filter(god => god !== undefined),

    // La fiche reçoit son numéro depuis l’adresse, par exemple « 1 » dans /gods/1.
    getGodById: state => id => {
      // Convertir les deux numéros en texte pour pouvoir les comparer.
      return state.gods.find(god => String(god.id) === String(id))
    },
  },

  // Les actions chargent ou changent les données du store. this désigne ce store.
  actions: {
    // Au démarrage, retrouver les favoris sauvegardés dans ce navigateur.
    // Effacer le message de la tentative précédente avant de relire les favoris.
    loadFavorites () {
      this.favoritesError = null
      try {
        // localStorage est une petite mémoire que le navigateur garde après avoir fermé la page.
        const savedFavorites = localStorage.getItem('god_favorites')
        // Les favoris sont stockés sous forme de texte. JSON.parse les retransforme en liste.
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
        // Si le texte contient une liste, garder les numéros entiers positifs. Set retire les doublons.
        this.favorites = Array.isArray(favorites)
          ? [...new Set(favorites.filter(id => Number.isSafeInteger(id) && id > 0))]
          : []
      } catch {
        // Si la lecture ou la conversion échoue, afficher un avertissement et repartir avec une liste vide.
        this.favoritesError = 'Favorites could not be restored from this browser.'
        this.favorites = []
      }
    },

    // Enregistrer les favoris après un changement pour les retrouver au prochain chargement.
    saveFavorites () {
      try {
        // JSON.stringify transforme la liste en texte, le seul format accepté par localStorage.
        localStorage.setItem('god_favorites', JSON.stringify(this.favorites))
        // L’enregistrement a réussi. On peut enlever l’avertissement.
        this.favoritesError = null
      } catch {
        // Si le navigateur refuse d’enregistrer, les favoris restent utilisables tant que cette page reste ouverte.
        this.favoritesError = 'Browser storage is unavailable. Favorites will only last for this session.'
      }
    },

    // Le clic sur le cœur ajoute la fiche aux favoris ou l’enlève si elle y est déjà.
    toggleFavorite (god) {
      // Ignorer le clic si la divinité n’a pas de numéro entier positif. Le signe ?. évite une erreur si god est vide.
      if (!Number.isSafeInteger(god?.id) || god.id <= 0) {
        return
      }
      // indexOf donne la position du numéro dans la liste. Il renvoie -1 si le numéro est absent.
      const index = this.favorites.indexOf(god.id)
      if (index === -1) {
        // Numéro absent : push l’ajoute à la fin de la liste.
        this.favorites.push(god.id)
      } else {
        // Numéro présent : splice enlève un seul élément à cette position.
        this.favorites.splice(index, 1)
      }
      // Enregistrer la liste qui vient de changer.
      this.saveFavorites()
    },

    // Faire le ménage dans les favoris après avoir reçu le catalogue complet.
    cleanupFavorites () {
      // Garder le nombre de favoris avant le nettoyage pour voir si quelque chose a été retiré.
      const initialCount = this.favorites.length
      // Pour chaque numéro, some vérifie si au moins une fiche porte ce numéro.
      this.favorites = this.favorites.filter(id => this.gods.some(god => god.id === id))
      // Si le nombre a baissé, sauvegarder la liste mise à jour.
      if (this.favorites.length !== initialCount) {
        this.saveFavorites()
      }
    },

    // Charger les fiches et préparer les catégories du filtre.
    async fetchGods () {
      // await attend la fin de toutes les demandes à l’API avant de passer à la ligne suivante.
      const gods = await getGods()
      // Mettre les fiches reçues dans le store pour que les pages puissent les lire.
      this.gods = gods
      // map prend la catégorie de chaque fiche, filter enlève les valeurs vides et Set retire les doublons.
      this.categories = [...new Set(gods.map(god => god.category).filter(Boolean))]
      // Le catalogue est complet. On peut maintenant enlever les numéros qui ne correspondent plus à une fiche.
      this.cleanupFavorites()
    },

    // Préparer le catalogue au démarrage du site ou après un clic sur « Try again ».
    async init () {
      // S’arrêter si une demande est déjà en cours ou si le catalogue a déjà été chargé.
      if (this.isLoading || this.hasLoaded) {
        return
      }

      // Indiquer à l’interface que le chargement commence.
      this.isLoading = true
      // Effacer l’ancienne erreur si l’utilisateur relance le chargement.
      this.error = null

      try {
        // Lire les favoris sauvegardés avant de demander le catalogue.
        this.loadFavorites()
        // Attendre que toutes les fiches soient chargées.
        await this.fetchGods()
        // Si on arrive ici, le catalogue a été chargé sans erreur.
        this.hasLoaded = true
      } catch (error) {
        // Montrer le message précis si les données sont invalides, sinon afficher un message qui invite à réessayer.
        this.error = error instanceof TypeError
          ? error.message
          : 'Unable to load the gods. Check your connection and try again.'
      } finally {
        // finally s’exécute dans tous les cas. On peut enlever l’indicateur d’attente, même si la demande a échoué.
        this.isLoading = false
      }
    },
  },
})
