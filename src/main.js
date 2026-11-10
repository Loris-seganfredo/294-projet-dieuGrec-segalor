// Point de départ du site. Charger Vue, les outils du projet et le composant principal App.vue.
import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

import App from './App.vue'

// Charger la feuille de style qui fournit la police Roboto.
import 'unfonts.css'

// Créer l’application, installer ses outils, puis l’afficher dans la balise #app de index.html.
const app = createApp(App)

registerPlugins(app)

app.mount('#app')
