import axios from 'axios'

// Utiliser l’adresse VITE_API_URL si elle est définie. Sinon, utiliser l’API de l’école.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apis.divtec.me/api/greek'

// Toutes les demandes passent par ce client Axios. Il ajoute la même adresse de base à chaque chemin.
const api = axios.create({
  baseURL: API_BASE_URL,
  // Arrêter la demande si elle prend plus de dix secondes pour permettre un nouvel essai.
  timeout: 10_000,
  // Indiquer à l’API le format JSON et demander les données en anglais.
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
})

export default api
