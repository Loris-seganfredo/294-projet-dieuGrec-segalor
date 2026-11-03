import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

// Hash URLs work on GitHub Pages, including direct links and page reloads.
export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
  scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
})
