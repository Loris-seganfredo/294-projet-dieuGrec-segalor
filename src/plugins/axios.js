import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apis.divtec.me/api/greek'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

export default api
