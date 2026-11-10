// Importer l’outil qui ajoute la barre du haut et le pied de page autour des pages.
import { setupLayouts } from 'virtual:generated-layouts'
// Importer le routeur et le mode d’adresses qui utilise le signe #.
import { createRouter, createWebHashHistory } from 'vue-router/auto'
// Cette liste d’adresses est créée automatiquement à partir des fichiers de src/pages.
import { routes } from 'vue-router/auto-routes'

// Le routeur relie une adresse à une page. Par exemple, /favorites ouvre la page des favoris.
export default createRouter({
  // La partie après # est lue par Vue dans le navigateur.
  // GitHub Pages peut donc ouvrir le même fichier, même quand on recharge directement une fiche.
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // Ajouter la structure commune à la liste des pages.
  routes: setupLayouts(routes),
  // Si le navigateur connaît l’ancienne position, y revenir. Pour une nouvelle page, commencer tout en haut.
  scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
})
