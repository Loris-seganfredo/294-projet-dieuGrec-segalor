// Charger les adresses créées à partir de src/pages et l’outil qui ajoute la structure commune.
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

export default createRouter({
  // Vue lit la partie après #. GitHub Pages peut ainsi servir le site quand on recharge une fiche.
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // Associer chaque adresse à sa page avec la barre du haut et le pied de page.
  routes: setupLayouts(routes),
  // Retrouver la position de défilement lors d’un retour, ou partir du haut sur une nouvelle page.
  scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
})
