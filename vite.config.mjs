// Ces outils de Node.js servent à retrouver le dossier src à partir de l’adresse de ce fichier.
import { fileURLToPath, URL } from 'node:url'
// Ce module permet à Vite de lire les fichiers .vue.
import Vue from '@vitejs/plugin-vue'
// Ce module rend certaines fonctions disponibles sans écrire leur import à chaque fois.
import AutoImport from 'unplugin-auto-import/vite'
// Ce module charge la police du site.
import Fonts from 'unplugin-fonts/vite'
// Ce module retrouve certains composants automatiquement par leur nom.
import Components from 'unplugin-vue-components/vite'
// Cette liste indique quelles fonctions du routeur peuvent être importées automatiquement.
import { VueRouterAutoImports } from 'unplugin-vue-router'
// Ce module crée les adresses du site d’après les noms des fichiers dans src/pages.
import VueRouter from 'unplugin-vue-router/vite'
// defineConfig aide à écrire les réglages attendus par Vite.
import { defineConfig } from 'vite'

// Ce module ajoute la structure commune autour des pages.
import Layouts from 'vite-plugin-vue-layouts-next'
// Ce module relie Vuetify à Vite et prépare les chemins vers les images et autres fichiers.
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Vite prépare et lance le site en local. Il prépare aussi les fichiers pour le publier.
// Documentation de Vite : https://vitejs.dev/config/
export default defineConfig({
  // L’adresse de base est / en local. Sur GitHub Pages, elle contient le nom du dépôt.
  base: process.env.VITE_BASE_URL ?? '/',
  // Activer les outils supplémentaires dont Vite a besoin pour préparer ce projet.
  plugins: [
    // Lire les fichiers de src/pages pour créer les adresses du site.
    VueRouter(),
    // Lire src/layouts pour trouver la structure à mettre autour des pages.
    Layouts(),
    // Transformer les fichiers .vue en code lisible par le navigateur.
    Vue({
      // Vite peut aussi retrouver les images indiquées dans les balises Vuetify.
      template: { transformAssetUrls },
    }),
    // Brancher Vuetify pour utiliser ses composants et ses styles.
    Vuetify({
      // Retrouver automatiquement les composants Vuetify utilisés, par exemple v-btn.
      autoImport: true,
      styles: {
        // Lire ce fichier si le projet veut personnaliser des réglages Sass de Vuetify.
        configFile: 'src/styles/settings.scss',
      },
    }),
    // Retrouver les composants du projet comme AppHeader quand leur nom est utilisé dans une page.
    Components(),
    // Configurer le chargement de la police du texte.
    Fonts({
      google: {
        families: [{
          // Utiliser la police Roboto fournie par Google Fonts.
          name: 'Roboto',
          // Charger plusieurs épaisseurs de texte, du plus fin au plus gras.
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    // Choisir les fonctions que Vite peut importer automatiquement.
    AutoImport({
      imports: [
        // Autoriser les fonctions de Vue, comme ref et computed.
        'vue',
        // Autoriser les fonctions de navigation de Vue Router.
        VueRouterAutoImports,
        {
          // Autoriser ces deux fonctions qui servent à créer et lire le store Pinia.
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      // Générer une liste que le vérificateur ESLint peut utiliser pour reconnaître ces noms.
      eslintrc: {
        enabled: true,
      },
      // Permettre aussi ces imports dans la partie qui décrit l’affichage des fichiers Vue.
      vueTemplate: true,
    }),
  ],
  // Exclure ces modules de la préparation à l’avance des dépendances en mode développement.
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  // Remplacer process.env par un objet vide dans le code destiné au navigateur.
  define: { 'process.env': {} },
  resolve: {
    // Le raccourci @ pointe vers src. Il évite de remonter les dossiers avec plusieurs ../.
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    // Permettre à Vite de chercher ces types de fichiers si l’import ne donne pas d’extension.
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  // En développement, ouvrir le site sur le port 3000 de l’ordinateur.
  server: {
    port: 3000,
  },
  // Choisir le compilateur qui transforme les styles Sass et SCSS en CSS pour le navigateur.
  css: {
    preprocessorOptions: {
      // Utiliser le compilateur moderne pour les fichiers Sass.
      sass: {
        api: 'modern-compiler',
      },
      // Utiliser le même compilateur pour les fichiers SCSS.
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
