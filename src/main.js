// C’est le premier fichier JavaScript chargé par index.html. Il démarre le site.
// createApp est la fonction de Vue qui crée une application.
import { createApp } from 'vue'

// Importer la fonction qui installe les outils du site : Vuetify, le routeur et Pinia.
import { registerPlugins } from '@/plugins'

// App.vue est le composant qui contient toute l’application.
import App from './App.vue'

// Charger la feuille de style créée par Vite pour la police Roboto.
import 'unfonts.css'

// Créer l’application en prenant App.vue comme point de départ.
const app = createApp(App)

// Brancher les outils avant d’afficher les pages pour qu’elles puissent les utiliser.
registerPlugins(app)

// Placer le site dans la balise qui porte id="app" dans index.html.
app.mount('#app')
