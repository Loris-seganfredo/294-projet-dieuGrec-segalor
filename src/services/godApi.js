import api from '@/plugins/axios'

async function getGodsPage (page) {
  const response = await api.get('/gods', { params: { page } })
  const json = response.data

  if (!Array.isArray(json?.data) || json.data.some(god =>
    !god || !Number.isSafeInteger(god.id) || god.id <= 0 || typeof god.name !== 'string',
  )) {
    throw new TypeError(`The API returned invalid gods data (page ${page}).`)
  }

  return json
}

export async function getGods () {
  const firstPage = await getGodsPage(1)
  const gods = [...firstPage.data]
  const reportedPageCount = Number(firstPage.pagination?.pages)
  const pageCount = Number.isInteger(reportedPageCount) && reportedPageCount > 0
    ? reportedPageCount
    : 1

  // Return only the complete catalog, so a failed page cannot erase valid favorites.
  for (let page = 2; page <= pageCount; page += 1) {
    const nextPage = await getGodsPage(page)
    gods.push(...nextPage.data)
  }

  return gods
}
