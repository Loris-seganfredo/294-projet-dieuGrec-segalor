import { defineStore } from 'pinia'

const GODS_API_URL = 'https://apis.divtec.me/api/greek/gods'

async function fetchGodsPage(page) {
  const url = new URL(GODS_API_URL)
  url.searchParams.set('page', String(page))

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Impossible de charger les dieux (HTTP ${response.status}, page ${page})`)
  }

  const json = await response.json()

  if (!Array.isArray(json.data)) {
    throw new Error(`La réponse de l’API ne contient pas une liste de dieux valide (page ${page})`)
  }

  return json
}

export const useGodStore = defineStore('gods', {
  state: () => ({
    gods: [],
    categories: [],
    isLoading: false,
    hasLoaded: false,
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
    },

    async init() {
      if (this.isLoading || this.hasLoaded) return

      this.isLoading = true
      this.error = null

      try {
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
