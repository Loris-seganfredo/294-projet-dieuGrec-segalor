import { defineStore } from 'pinia'
import { getGods } from '@/services/godApi'

// Source de données commune au catalogue, aux fiches et aux favoris.
export const useGodStore = defineStore('gods', {
  state: () => ({
    gods: [],
    categories: [],
    // Conserver les identifiants pour retrouver les fiches dans le catalogue.
    favorites: [],
    // Distinguer une requête en cours d’un catalogue déjà chargé avec succès.
    isLoading: false,
    hasLoaded: false,
    error: null,
    // Une erreur de stockage des favoris est indépendante d’une panne de l’API.
    favoritesError: null,
  }),

  // Les getters lisent ou dérivent des données à partir de l’état du store.
  getters: {
    totalGods: state => state.gods.length,
    totalFavorites: state => state.favorites.length,
    isFavorite: state => god => state.favorites.includes(god.id),
    // Retrouver chaque fiche à partir de son identifiant, dans l’ordre des favoris.
    getFavorites: state => state.favorites
      .map(id => state.gods.find(god => god.id === id))
      .filter(god => god !== undefined),

    // L’URL fournit un identifiant texte alors que l’API fournit un nombre.
    getGodById: state => id => {
      return state.gods.find(god => String(god.id) === String(id))
    },
  },

  actions: {
    // Restaurer les favoris propres à ce navigateur.
    loadFavorites () {
      this.favoritesError = null
      try {
        const savedFavorites = localStorage.getItem('god_favorites')
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
        // Écarter les identifiants invalides et supprimer les doublons du tableau sauvegardé.
        this.favorites = Array.isArray(favorites)
          ? [...new Set(favorites.filter(id => Number.isSafeInteger(id) && id > 0))]
          : []
      } catch {
        this.favoritesError = 'Favorites could not be restored from this browser.'
        this.favorites = []
      }
    },

    // Sérialiser le tableau en JSON car localStorage stocke du texte.
    saveFavorites () {
      try {
        localStorage.setItem('god_favorites', JSON.stringify(this.favorites))
        this.favoritesError = null
      } catch {
        this.favoritesError = 'Browser storage is unavailable. Favorites will only last for this session.'
      }
    },

    toggleFavorite (god) {
      if (!Number.isSafeInteger(god?.id) || god.id <= 0) {
        return
      }
      // Ajouter l’identifiant s’il est absent ou retirer celui qui est déjà présent.
      const index = this.favorites.indexOf(god.id)
      if (index === -1) {
        this.favorites.push(god.id)
      } else {
        this.favorites.splice(index, 1)
      }
      this.saveFavorites()
    },

    // Retirer les identifiants absents du catalogue et enregistrer uniquement si la liste a changé.
    cleanupFavorites () {
      const initialCount = this.favorites.length
      this.favorites = this.favorites.filter(id => this.gods.some(god => god.id === id))
      if (this.favorites.length !== initialCount) {
        this.saveFavorites()
      }
    },

    async fetchGods () {
      const gods = await getGods()
      this.gods = gods
      // Dériver les catégories disponibles en écartant les valeurs vides et les doublons.
      this.categories = [...new Set(gods.map(god => god.category).filter(Boolean))]
      this.cleanupFavorites()
    },

    async init () {
      // Éviter de lancer une deuxième requête pendant ou après un chargement réussi.
      if (this.isLoading || this.hasLoaded) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // Restaurer les favoris avant le chargement. Leur nettoyage intervient dans fetchGods après réception de toutes les pages.
        this.loadFavorites()
        await this.fetchGods()
        this.hasLoaded = true
      } catch (error) {
        this.error = error instanceof TypeError
          ? error.message
          : 'Unable to load the gods. Check your connection and try again.'
      } finally {
        // Terminer le chargement dans les deux cas pour permettre un nouvel essai après une erreur.
        this.isLoading = false
      }
    },
  },
})
