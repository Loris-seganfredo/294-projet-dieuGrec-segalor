import { defineStore } from 'pinia'
import { getGods } from '@/services/godApi'

export const useGodStore = defineStore('gods', {
  state: () => ({
    gods: [],
    categories: [],
    favorites: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
    favoritesError: null,
  }),

  getters: {
    totalGods: state => state.gods.length,
    totalFavorites: state => state.favorites.length,
    isFavorite: state => god => state.favorites.includes(god.id),
    getFavorites: state => state.favorites
      .map(id => state.gods.find(god => god.id === id))
      .filter(god => god !== undefined),

    getGodById: state => id => {
      return state.gods.find(god => String(god.id) === String(id))
    },
  },

  actions: {
    loadFavorites () {
      this.favoritesError = null
      try {
        const savedFavorites = localStorage.getItem('god_favorites')
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
        this.favorites = Array.isArray(favorites)
          ? [...new Set(favorites.filter(id => Number.isSafeInteger(id) && id > 0))]
          : []
      } catch {
        this.favoritesError = 'Favorites could not be restored from this browser.'
        this.favorites = []
      }
    },

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
      const index = this.favorites.indexOf(god.id)
      if (index === -1) {
        this.favorites.push(god.id)
      } else {
        this.favorites.splice(index, 1)
      }
      this.saveFavorites()
    },

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
      this.categories = [...new Set(gods.map(god => god.category).filter(Boolean))]
      this.cleanupFavorites()
    },

    async init () {
      if (this.isLoading || this.hasLoaded) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        // Restore first; clean obsolete IDs only after every API page succeeds.
        this.loadFavorites()
        await this.fetchGods()
        this.hasLoaded = true
      } catch (error) {
        this.error = error instanceof TypeError
          ? error.message
          : 'Unable to load the gods. Check your connection and try again.'
      } finally {
        this.isLoading = false
      }
    },
  },
})
