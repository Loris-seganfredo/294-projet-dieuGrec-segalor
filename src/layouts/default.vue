<template>
  <!-- Ce fichier donne la structure commune du site. La barre de navigation vient en premier. -->
  <AppHeader />
  <!-- Cette zone contient ce qui change d’une page à l’autre. -->
  <v-main>
    <!-- Montrer l’avertissement uniquement si la lecture ou la sauvegarde des favoris a échoué. -->
    <v-alert
      v-if="godStore.favoritesError"
      class="ma-4"
      type="warning"
      variant="tonal"
    >
      {{ godStore.favoritesError }}
    </v-alert>
    <!-- Vue Router place ici l’accueil, les favoris, une fiche ou une autre page selon l’adresse. -->
    <router-view />
  </v-main>

  <!-- Le texte entre les deux balises remplit le slot du pied de page sur toutes les pages. -->
  <AppFooter>Greek Gods</AppFooter>
  <!-- Afficher le petit message d’ajout ou de retrait pendant 2 secondes. -->
  <!-- Il reste dans cette structure commune même quand la dernière carte de la page des favoris disparaît. -->
  <v-snackbar v-model="showSnackbar" color="primary" :timeout="2000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script setup>
  // Accéder au texte et à l’état du message que les pages peuvent déclencher.
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  // Accéder au store pour lire les erreurs liées aux favoris.
  import { useGodStore } from '@/stores/godStore'

  // Ouvrir le même store que celui utilisé dans les pages.
  const godStore = useGodStore()
  // v-model utilise showSnackbar pour ouvrir ou fermer le message. snackbarMessage donne le texte à afficher.
  const { showSnackbar, snackbarMessage } = useFavoriteFeedback()
</script>
