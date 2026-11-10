import api from '@/plugins/axios'

// Récupérer et vérifier une seule page de l’API.
async function getGodsPage (page) {
  const response = await api.get('/gods', { params: { page } })
  const json = response.data

  // L’identifiant sert à la navigation et aux favoris, le nom à la recherche et au tri.
  if (!Array.isArray(json?.data) || json.data.some(god =>
    !god || !Number.isSafeInteger(god.id) || god.id <= 0 || typeof god.name !== 'string',
  )) {
    throw new TypeError(`The API returned invalid gods data (page ${page}).`)
  }

  return json
}

// Charger le catalogue complet à partir de la pagination annoncée par la première réponse.
export async function getGods () {
  const firstPage = await getGodsPage(1)
  const gods = [...firstPage.data]
  const reportedPageCount = Number(firstPage.pagination?.pages)
  // Une pagination absente ou invalide est traitée comme une réponse à une seule page.
  const pageCount = Number.isInteger(reportedPageCount) && reportedPageCount > 0
    ? reportedPageCount
    : 1

  // Si une page échoue, l’erreur remonte au store et la liste partielle n’est pas utilisée pour nettoyer les favoris.
  for (let page = 2; page <= pageCount; page += 1) {
    const nextPage = await getGodsPage(page)
    gods.push(...nextPage.data)
  }

  return gods
}
