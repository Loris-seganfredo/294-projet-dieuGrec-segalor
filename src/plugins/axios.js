// Axios est l’outil qui envoie les demandes HTTP à l’API de l’école.
import axios from 'axios'

// Prendre l’adresse configurée dans VITE_API_URL si elle existe. Sinon, utiliser l’adresse de l’école.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apis.divtec.me/api/greek'

// Créer un seul client Axios pour que toutes les demandes utilisent les mêmes réglages.
const api = axios.create({
  // Axios ajoute cette adresse au début des chemins comme /gods.
  baseURL: API_BASE_URL,
  // Au bout de dix secondes sans réponse, arrêter la demande pour pouvoir proposer de réessayer.
  timeout: 10_000,
  // Les en-têtes accompagnent chaque demande. Ils donnent des indications à l’API.
  headers: {
    // Préciser que le format de données utilisé est le JSON.
    'Content-Type': 'application/json',
    // Demander la version anglaise des données.
    'Accept-Language': 'en',
  },
})

// Le service godApi peut importer cet outil prêt à l’emploi.
export default api
