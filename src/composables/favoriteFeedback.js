import { nextTick, ref } from 'vue'
import { useGodStore } from '@/stores/godStore'

// Keep feedback visible even when removing the last favorite unmounts its card.
const showSnackbar = ref(false)
const snackbarMessage = ref('')

export function useFavoriteFeedback () {
  const godStore = useGodStore()

  async function toggleFavorite (god) {
    const wasFavorite = godStore.isFavorite(god)
    godStore.toggleFavorite(god)

    // Restart the snackbar timeout when several hearts are clicked quickly.
    showSnackbar.value = false
    snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    await nextTick()
    showSnackbar.value = true
  }

  return { showSnackbar, snackbarMessage, toggleFavorite }
}
