// Point d’entrée de Vue, chargé par index.html.
import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

import App from './App.vue'

// Feuille générée par Vite pour charger la police Roboto.
import 'unfonts.css'

const app = createApp(App)

// Installer les plugins avant le montage pour que les composants y aient accès.
registerPlugins(app)

// Afficher l’application dans le conteneur défini dans index.html.
app.mount('#app')
