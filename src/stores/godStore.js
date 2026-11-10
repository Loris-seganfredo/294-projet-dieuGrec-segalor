import { defineStore } from 'pinia'
import { getGods } from '@/services/godApi'

// Le store est la mémoire commune du site. L’accueil, les fiches et les favoris lisent les mêmes données.
export const useGodStore = defineStore('gods', {
  // Les listes commencent vides. Un favori est gardé par son numéro, sans recopier toute sa fiche.
  state: () => ({
    gods: [],
    categories: [],
    favorites: [],

    // isLoading indique l’attente et hasLoaded indique que le catalogue est prêt.
    // Deux messages séparés servent à signaler une erreur de catalogue ou de sauvegarde des favoris.
    isLoading: false,
    hasLoaded: false,
    error: null,
    favoritesError: null,
  }),

  // Les getters lisent le store. Ici, on compte les fiches et les favoris ou on vérifie si un numéro est en favori.
  getters: {
    totalGods: state => state.gods.length,
    totalFavorites: state => state.favorites.length,
    isFavorite: state => god => state.favorites.includes(god.id),

    // Retrouver les fiches dans l’ordre des numéros sauvegardés. Ignorer les numéros sans fiche.
    getFavorites: state => state.favorites
      .map(id => state.gods.find(god => god.id === id))
      .filter(god => god !== undefined),

    // L’adresse donne un numéro sous forme de texte. String permet de le comparer au numéro de l’API.
    getGodById: state => id => {
      return state.gods.find(god => String(god.id) === String(id))
    },
  },

  // Les actions chargent ou modifient les données. Dans ces fonctions, this désigne le store.
  actions: {
    // Relire les favoris que le navigateur conserve même après avoir fermé le site.
    loadFavorites () {
      this.favoritesError = null
      try {
        // JSON.parse retransforme le texte sauvegardé en liste. Si rien n’est enregistré, partir d’une liste vide.
        const savedFavorites = localStorage.getItem('god_favorites')
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
        // Garder seulement les numéros entiers positifs. Set retire les doublons.
        this.favorites = Array.isArray(favorites)
          ? [...new Set(favorites.filter(id => Number.isSafeInteger(id) && id > 0))]
          : []
      } catch {
        // Si la lecture échoue, avertir l’utilisateur et repartir sans favoris.
        this.favoritesError = 'Favorites could not be restored from this browser.'
        this.favorites = []
      }
    },

    // Transformer les numéros en texte avec JSON.stringify pour les sauvegarder dans le navigateur.
    saveFavorites () {
      try {
        localStorage.setItem('god_favorites', JSON.stringify(this.favorites))
        this.favoritesError = null
      } catch {
        // Si la sauvegarde échoue, les favoris restent en mémoire tant qu’on ne recharge pas le site.
        this.favoritesError = 'Browser storage is unavailable. Favorites will only last for this session.'
      }
    },

    // Le clic sur le cœur ajoute ou retire une fiche. Un clic avec un numéro invalide est ignoré.
    toggleFavorite (god) {
      if (!Number.isSafeInteger(god?.id) || god.id <= 0) {
        return
      }
      // indexOf renvoie -1 si le numéro est absent. Dans ce cas on l’ajoute, sinon on le retire.
      const index = this.favorites.indexOf(god.id)
      if (index === -1) {
        this.favorites.push(god.id)
      } else {
        this.favorites.splice(index, 1)
      }
      // Sauvegarder la liste après le changement.
      this.saveFavorites()
    },

    // Une fois le catalogue complet, enlever les favoris dont la fiche a disparu.
    // Enregistrer seulement si au moins un numéro a été retiré.
    cleanupFavorites () {
      const initialCount = this.favorites.length
      this.favorites = this.favorites.filter(id => this.gods.some(god => god.id === id))
      if (this.favorites.length !== initialCount) {
        this.saveFavorites()
      }
    },

    // Attendre que le service ait chargé toutes les pages avant de remplacer le catalogue.
    async fetchGods () {
      const gods = await getGods()
      this.gods = gods
      // Prendre les catégories des fiches, enlever les valeurs vides et les doublons, puis nettoyer les favoris.
      this.categories = [...new Set(gods.map(god => god.category).filter(Boolean))]
      this.cleanupFavorites()
    },

    // Cette action démarre le chargement ou le relance après un échec. Elle évite les demandes en double.
    async init () {
      if (this.isLoading || this.hasLoaded) {
        return
      }

      // Afficher l’attente et effacer l’erreur précédente avant de commencer.
      this.isLoading = true
      this.error = null

      try {
        // Restaurer les favoris, puis attendre le catalogue complet. hasLoaded passe à vrai après un succès.
        this.loadFavorites()
        await this.fetchGods()
        this.hasLoaded = true
      } catch (error) {
        // Afficher le problème précis si les données sont invalides, ou proposer de réessayer si la demande a échoué.
        this.error = error instanceof TypeError
          ? error.message
          : 'Unable to load the gods. Check your connection and try again.'
      } finally {
        // finally s’exécute dans les deux cas. On peut alors masquer l’attente.
        this.isLoading = false
      }
    },
  },
})
