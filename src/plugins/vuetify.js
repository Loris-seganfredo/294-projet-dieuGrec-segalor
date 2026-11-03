/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
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
  defaults: {
    VTextField: { color: 'primary' },
    VSelect: { color: 'primary' },
  },
})
