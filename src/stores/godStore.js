import { defineStore } from 'pinia'
import api from '@/plugins/axios'

async function fetchGodsPage (page) {
  const response = await api.get('/gods', {
    params: { page },
  })

  const json = response.data

  if (!Array.isArray(json.data)) {
    throw new TypeError(`La réponse de l'API ne contient pas une liste de dieux valide (page ${page})`)
  }

  return json
}

export const useGodStore = defineStore('gods', {
  state: () => ({
    gods: [],
    categories: [],
    favorites: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
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
      try {
        const savedFavorites = localStorage.getItem('god_favorites')
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : []
        this.favorites = Array.isArray(favorites)
          ? [...new Set(favorites.filter(id => Number.isInteger(id) && id > 0))]
          : []
      } catch (error) {
        console.error('Erreur lors du chargement des favoris :', error)
        this.favorites = []
      }
    },

    saveFavorites () {
      try {
        localStorage.setItem('god_favorites', JSON.stringify(this.favorites))
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris :', error)
      }
    },

    toggleFavorite (god) {
      // findIndex() fait partie des méthodes à pratiquer à l'étape 15.
      // eslint-disable-next-line unicorn/prefer-array-index-of
      const index = this.favorites.findIndex(id => id === god.id)
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
      const firstPage = await fetchGodsPage(1)
      const gods = [...firstPage.data]
      const reportedPageCount = Number(firstPage.pagination?.pages)
      const pageCount = Number.isInteger(reportedPageCount) && reportedPageCount > 0
        ? reportedPageCount
        : 1

      for (let page = 2; page <= pageCount; page += 1) {
        const nextPage = await fetchGodsPage(page)
        gods.push(...nextPage.data)
      }

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
        // Restaurer avant le chargement ; nettoyer seulement après la dernière page.
        this.loadFavorites()
        await this.fetchGods()
        this.hasLoaded = true
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
