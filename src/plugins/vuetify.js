// Charger Vuetify, ses styles de base et les icônes utilisées dans les boutons.
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

export default createVuetify({
  theme: {
    // Suivre le réglage clair ou sombre de l’appareil.
    defaultTheme: 'system',
    // Les deux thèmes utilisent les mêmes noms de couleurs pour les boutons, les cœurs et les messages.
    // Chaque couleur est choisie pour rester lisible sur le fond du thème.
    themes: {
      // Palette pour un fond clair.
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
      // Palette pour un fond sombre.
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
  // Appliquer la couleur principale aux champs de recherche et aux listes de choix.
  defaults: {
    VTextField: { color: 'primary' },
    VSelect: { color: 'primary' },
  },
})
