import { nextTick, ref } from 'vue'

// Keep feedback visible even when removing the last favorite unmounts its card.
const showSnackbar = ref(false)
const snackbarMessage = ref('')

export function useFavoriteFeedback () {
  async function notifyFavorite (wasFavorite) {
    // Restart the snackbar timeout when several hearts are clicked quickly.
    showSnackbar.value = false
    snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    await nextTick()
    showSnackbar.value = true
  }

  return { showSnackbar, snackbarMessage, notifyFavorite }
}
