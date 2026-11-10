// Vuetify fournit les éléments visuels du site et les couleurs des deux thèmes.
import { createVuetify } from 'vuetify'
// Charger les dessins des icônes comme le cœur, la maison et la loupe.
import '@mdi/font/css/materialdesignicons.css'

// Charger les styles de base pour que les boutons, les cartes et les grilles s’affichent correctement.
import 'vuetify/styles'

// Créer la configuration de Vuetify utilisée par toute l’application.
// Documentation de Vuetify : https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // system suit le réglage clair ou sombre choisi sur l’appareil.
    defaultTheme: 'system',
    // Les deux thèmes donnent une couleur différente aux mêmes noms, comme primary ou favorite.
    themes: {
      // Couleurs utilisées lorsque le fond du site est clair.
      light: {
        colors: {
          // Couleur principale pour les boutons, les liens et les éléments mis en avant.
          primary: '#8A4B00',
          // Couleur plus discrète, utilisée par exemple pour un cœur vide.
          secondary: '#475569',
          // Couleur du cœur plein quand une fiche est en favori.
          favorite: '#B71C1C',
          // Couleur des messages d’information, comme une recherche sans résultat.
          info: '#1565C0',
          // Couleur des avertissements, par exemple si les favoris ne peuvent pas être sauvegardés.
          warning: '#8A4B00',
          // Couleur des messages d’erreur, comme une panne de chargement.
          error: '#B00020',
        },
      },
      // Couleurs plus claires pour rester lisibles sur le fond sombre.
      dark: {
        colors: {
          // Couleur principale pour le thème sombre.
          primary: '#FFCA28',
          // Couleur secondaire pour le thème sombre.
          secondary: '#B0C4DE',
          // Couleur des favoris pour le thème sombre.
          favorite: '#EF9A9A',
          // Couleur des informations pour le thème sombre.
          info: '#90CAF9',
          // Couleur des avertissements pour le thème sombre.
          warning: '#FFCA28',
          // Couleur des erreurs pour le thème sombre.
          error: '#FFB4AB',
        },
      },
    },
  },
  // Appliquer une couleur par défaut aux champs sans la répéter dans chaque page.
  defaults: {
    // Les champs où on écrit, comme la recherche, utilisent primary.
    VTextField: { color: 'primary' },
    // Les listes de choix, comme celle des catégories, utilisent la même couleur.
    VSelect: { color: 'primary' },
  },
})
