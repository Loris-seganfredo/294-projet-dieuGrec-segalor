import { nextTick, ref } from 'vue'
import { useGodStore } from '@/stores/godStore'

// La visibilité et le texte du message sont partagés. La confirmation reste affichée si une carte disparaît.
const showSnackbar = ref(false)
const snackbarMessage = ref('')

// Les pages utilisent cette fonction pour retrouver la même action de favori et le même message.
export function useFavoriteFeedback () {
  const godStore = useGodStore()

  async function toggleFavorite (god) {
    // Vérifier l’état du cœur avant de changer les favoris pour savoir quel message afficher.
    const wasFavorite = godStore.isFavorite(god)
    godStore.toggleFavorite(god)

    // Fermer l’ancien message, puis préparer le texte de confirmation pour l’ajout ou le retrait.
    showSnackbar.value = false
    snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    // Attendre que Vue ferme le message avant de le rouvrir. Cela relance son délai d’affichage.
    await nextTick()
    showSnackbar.value = true
  }

  return { showSnackbar, snackbarMessage, toggleFavorite }
}
