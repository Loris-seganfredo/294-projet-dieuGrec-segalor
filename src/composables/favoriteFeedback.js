import { nextTick, ref } from 'vue'
import { useGodStore } from '@/stores/godStore'

// Ces valeurs sont partagées par les pages et le layout, qui affiche le message même si la carte disparaît.
const showSnackbar = ref(false)
const snackbarMessage = ref('')

export function useFavoriteFeedback () {
  const godStore = useGodStore()

  async function toggleFavorite (god) {
    // Lire l’état avant le clic pour choisir le message qui décrit la modification.
    const wasFavorite = godStore.isFavorite(god)
    godStore.toggleFavorite(god)

    // Laisser Vue fermer le message avant de le rouvrir pour relancer son délai.
    showSnackbar.value = false
    snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    await nextTick()
    showSnackbar.value = true
  }

  return { showSnackbar, snackbarMessage, toggleFavorite }
}
