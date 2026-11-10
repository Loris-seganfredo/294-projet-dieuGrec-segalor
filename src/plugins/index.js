import router from '@/router'
import pinia from '@/stores'
import vuetify from './vuetify'

// Brancher les trois outils dans la même application avant d’afficher le site.
// Vuetify fournit les éléments visuels, le routeur choisit la page et Pinia partage les données.
export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
