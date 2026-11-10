// ref crée une valeur surveillée par Vue. nextTick permet d’attendre la prochaine mise à jour de l’écran.
import { nextTick, ref } from 'vue'
// Le store connaît les favoris et sait les modifier.
import { useGodStore } from '@/stores/godStore'

// Ces deux valeurs sont partagées par toutes les pages. Le petit message reste visible même si une carte disparaît.
// Au départ, le message est caché.
const showSnackbar = ref(false)
// Ce texte sera rempli après un clic sur un cœur.
const snackbarMessage = ref('')

// Les pages appellent cette fonction pour utiliser le même message et la même action.
export function useFavoriteFeedback () {
  // Ouvrir la mémoire commune des divinités et des favoris.
  const godStore = useGodStore()

  // Cette fonction change le favori, puis affiche un petit message de confirmation.
  async function toggleFavorite (god) {
    // Vérifier si la divinité était déjà dans les favoris avant de les modifier.
    const wasFavorite = godStore.isFavorite(god)
    // Demander au store d’ajouter ou de retirer cette divinité.
    godStore.toggleFavorite(god)

    // Fermer le message s’il est déjà affiché. Cela permet de relancer son temps d’affichage à chaque clic.
    showSnackbar.value = false
    // Choisir le message de retrait si la fiche était en favori, ou le message d’ajout sinon.
    snackbarMessage.value = wasFavorite ? 'Removed from favorites' : 'Added to favorites'
    // Attendre que Vue applique la fermeture du message.
    await nextTick()
    // Afficher le nouveau message.
    showSnackbar.value = true
  }

  // Donner aux pages l’accès au texte, à l’état ouvert ou fermé et à la fonction appelée au clic.
  return { showSnackbar, snackbarMessage, toggleFavorite }
}
