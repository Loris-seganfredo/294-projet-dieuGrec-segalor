import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

// La partie après # est lue par Vue Router. GitHub Pages peut servir la même page même lors d’un accès direct à une fiche.
export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // Les routes viennent des fichiers de src/pages et reçoivent leur structure commune via setupLayouts.
  routes: setupLayouts(routes),
  // Restaurer le défilement lors d’un retour, ou repartir en haut sur une nouvelle page.
  scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
})
