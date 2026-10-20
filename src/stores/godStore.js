import { defineStore } from 'pinia'

const GODS_API_URL = 'https://apis.divtec.me/api/greek/gods'

export const useGodStore = defineStore('gods', {
  state: () => ({
    gods: [],
    categories: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    totalGods: (state) => state.gods.length,

    getGodById: (state) => (id) => {
      return state.gods.find(god => String(god.id) === String(id))
    },
  },

  actions: {
    async fetchGods() {
      const response = await fetch(GODS_API_URL)

      if (!response.ok) {
        throw new Error(`Impossible de charger les dieux (HTTP ${response.status})`)
      }

      const json = await response.json()

      if (!Array.isArray(json.data)) {
        throw new Error('La réponse de l’API ne contient pas de liste de dieux valide')
      }

      this.gods = json.data
      this.categories = [...new Set(json.data.map(god => god.category).filter(Boolean))]
    },

    async init() {
      this.isLoading = true
      this.error = null

      try {
        await this.fetchGods()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Une erreur est survenue'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
