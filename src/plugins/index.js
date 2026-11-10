// Ce fichier branche dans Vue les outils dont le site a besoin.

// Le routeur choisit quelle page afficher selon l’adresse.
import router from '@/router'
// Pinia permet aux pages de partager les mêmes données.
import pinia from '@/stores'
// Vuetify fournit les boutons, les cartes et les autres éléments visuels.
import vuetify from './vuetify'

// main.js appelle cette fonction juste avant d’afficher le site.
export function registerPlugins (app) {
  // Chaque appel à use installe un outil sur la même application.
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
