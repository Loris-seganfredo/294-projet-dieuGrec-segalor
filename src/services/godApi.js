// Utiliser Axios, l’outil qui envoie nos demandes à l’API avec les réglages du projet.
import api from '@/plugins/axios'

// L’API envoie le catalogue en plusieurs morceaux appelés pages. Cette fonction en demande un seul.
async function getGodsPage (page) {
  // GET demande des données sans les modifier. params ajoute le numéro de page à l’adresse.
  const response = await api.get('/gods', { params: { page } })
  // Axios donne aussi des détails sur la demande. On prend ici le contenu envoyé par l’API.
  const json = response.data

  // On attend une liste dans data. some vérifie si au moins une fiche de la liste est invalide.
  if (!Array.isArray(json?.data) || json.data.some(god =>
    // Une fiche doit exister, avoir un numéro entier positif et un nom sous forme de texte.
    !god || !Number.isSafeInteger(god.id) || god.id <= 0 || typeof god.name !== 'string',
  )) {
    // Arrêter le chargement et indiquer dans le message le numéro de la page qui pose problème.
    throw new TypeError(`The API returned invalid gods data (page ${page}).`)
  }

  // Renvoyer les fiches de cette page et les informations sur le nombre de pages.
  return json
}

// Cette fonction rassemble toutes les pages pour renvoyer un seul catalogue.
export async function getGods () {
  // La première réponse contient des fiches et indique combien de pages l’API propose.
  const firstPage = await getGodsPage(1)
  // Les trois points copient les fiches dans une nouvelle liste.
  const gods = [...firstPage.data]
  // Lire le nombre de pages et le convertir en nombre. ?. accepte que l’information soit absente.
  const reportedPageCount = Number(firstPage.pagination?.pages)
  // Si le nombre de pages manque ou n’est pas un entier positif, utiliser uniquement la première page.
  const pageCount = Number.isInteger(reportedPageCount) && reportedPageCount > 0
    ? reportedPageCount
    : 1

  // Commencer à la page 2, puisque la page 1 est déjà chargée.
  // Si une demande échoue, la fonction s’arrête. Le store ne reçoit jamais un catalogue incomplet.
  for (let page = 2; page <= pageCount; page += 1) {
    // Attendre le résultat de la page actuelle avant de demander la suivante.
    const nextPage = await getGodsPage(page)
    // Ajouter toutes les fiches de cette page à la fin de la liste.
    gods.push(...nextPage.data)
  }

  // Toutes les pages ont répondu. Renvoyer le catalogue complet au store.
  return gods
}
