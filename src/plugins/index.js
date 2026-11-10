// Regroupe les plugins installés par main.js avant le montage de Vue.

import router from '@/router'
import pinia from '@/stores'
import vuetify from './vuetify'

export function registerPlugins (app) {
  // Vuetify fournit les composants, Vue Router la navigation et Pinia l’état partagé.
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
