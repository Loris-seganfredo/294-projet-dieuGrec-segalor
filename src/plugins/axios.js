import axios from 'axios'

// VITE_API_URL permet de viser une autre API depuis la configuration locale.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apis.divtec.me/api/greek'

// Le service du catalogue réutilise cette instance avec des réglages communs.
const api = axios.create({
  baseURL: API_BASE_URL,
  // Interrompre une requête après dix secondes pour permettre à l’interface de proposer un nouvel essai.
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

export default api
