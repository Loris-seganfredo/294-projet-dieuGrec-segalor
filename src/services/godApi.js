import api from '@/plugins/axios'

// L’API envoie le catalogue par morceaux. On demande ici un seul morceau en donnant son numéro.
async function getGodsPage (page) {
  const response = await api.get('/gods', { params: { page } })
  const json = response.data

  // Vérifier que la réponse contient une liste et que chaque fiche a un numéro entier positif et un nom.
  // Si un morceau est invalide, on arrête le chargement et on indique son numéro.
  if (!Array.isArray(json?.data) || json.data.some(god =>
    !god || !Number.isSafeInteger(god.id) || god.id <= 0 || typeof god.name !== 'string',
  )) {
    throw new TypeError(`The API returned invalid gods data (page ${page}).`)
  }

  return json
}

// Rassembler tous les morceaux du catalogue avant de renvoyer le résultat au store.
export async function getGods () {
  // La première réponse contient des fiches et le nombre total de pages.
  const firstPage = await getGodsPage(1)
  const gods = [...firstPage.data]
  const reportedPageCount = Number(firstPage.pagination?.pages)
  // S’il manque un nombre de pages valable, utiliser uniquement la première page.
  const pageCount = Number.isInteger(reportedPageCount) && reportedPageCount > 0
    ? reportedPageCount
    : 1

  // Attendre et ajouter les pages suivantes une par une. Si une demande échoue, aucune liste incomplète n’est renvoyée.
  for (let page = 2; page <= pageCount; page += 1) {
    const nextPage = await getGodsPage(page)
    gods.push(...nextPage.data)
  }

  return gods
}
