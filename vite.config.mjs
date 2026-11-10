import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Fonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

import Layouts from 'vite-plugin-vue-layouts-next'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Vite prépare les fichiers du projet pour le développement et la publication.
export default defineConfig({
  // Sur GitHub Pages, le site est dans un dossier au nom du dépôt. Cette adresse aide à retrouver les fichiers.
  base: process.env.VITE_BASE_URL ?? '/',
  plugins: [
    // Créer les routes depuis src/pages et leurs structures communes depuis src/layouts.
    VueRouter(),
    Layouts(),
    // Transformer les fichiers .vue et préparer les chemins des ressources utilisées dans les composants.
    Vue({
      template: { transformAssetUrls },
    }),
    // Charger les composants Vuetify utilisés et lire le fichier de réglages Sass du projet.
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    // Retrouver les composants du projet par leur nom, comme AppHeader.
    Components(),
    // Charger Roboto avec plusieurs épaisseurs, du texte fin au texte gras.
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    // Rendre certaines fonctions de Vue, du routeur et de Pinia disponibles sans répéter les imports.
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      // Donner à ESLint la liste des noms ajoutés automatiquement.
      eslintrc: {
        enabled: true,
      },
      // Autoriser aussi ces fonctions dans le modèle d’affichage des fichiers Vue.
      vueTemplate: true,
    }),
  ],
  // Laisser ces modules en dehors de la préparation à l’avance des dépendances en développement.
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  // Prévoir un objet vide pour process.env dans le code destiné au navigateur.
  define: { 'process.env': {} },
  resolve: {
    // Le raccourci @ pointe vers src. Vite peut aussi essayer les extensions listées plus bas.
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
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
  // Utiliser le port 3000 pour ouvrir le site en local.
  server: {
    port: 3000,
  },
  // Transformer les feuilles Sass et SCSS en CSS avec le compilateur moderne.
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
