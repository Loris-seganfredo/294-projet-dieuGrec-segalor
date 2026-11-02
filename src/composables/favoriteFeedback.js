import { ref } from 'vue'

// Partagé pour garder la confirmation visible après la disparition d'une carte.
const showSnackbar = ref(false)
const snackbarMessage = ref('')

export function useFavoriteFeedback () {
  function notifyFavorite (wasFavorite) {
    snackbarMessage.value = wasFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris'
    showSnackbar.value = true
  }

  return { showSnackbar, snackbarMessage, notifyFavorite }
}
