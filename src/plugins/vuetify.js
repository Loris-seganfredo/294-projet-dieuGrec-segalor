// Configuration des composants et des thèmes Vuetify.
import { createVuetify } from 'vuetify'
// Charger les icônes mdi-* utilisées dans les boutons et les styles de Vuetify.
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // Choisir le thème clair ou sombre selon la préférence du système.
    defaultTheme: 'system',
    // Les composants utilisent les mêmes noms de couleurs dans les deux thèmes.
    themes: {
      light: {
        colors: {
          primary: '#8A4B00',
          secondary: '#475569',
          favorite: '#B71C1C',
          info: '#1565C0',
          warning: '#8A4B00',
          error: '#B00020',
        },
      },
      dark: {
        colors: {
          primary: '#FFCA28',
          secondary: '#B0C4DE',
          favorite: '#EF9A9A',
          info: '#90CAF9',
          warning: '#FFCA28',
          error: '#FFB4AB',
        },
      },
    },
  },
  // Couleur commune pour les champs de recherche et de sélection.
  defaults: {
    VTextField: { color: 'primary' },
    VSelect: { color: 'primary' },
  },
})
