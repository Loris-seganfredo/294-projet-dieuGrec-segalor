<template>
  <!-- Garder la même navigation en haut de chaque page. -->
  <AppHeader />
  <v-main>
    <!-- Afficher un avertissement si le navigateur n’arrive pas à lire ou sauvegarder les favoris. -->
    <v-alert
      v-if="godStore.favoritesError"
      class="ma-4"
      type="warning"
      variant="tonal"
    >
      {{ godStore.favoritesError }}
    </v-alert>
    <!-- Vue Router place ici le contenu de la page choisie par l’adresse. -->
    <router-view />
  </v-main>

  <!-- Fournir au pied de page le texte affiché sur toutes les pages. -->
  <AppFooter>Greek Gods</AppFooter>
  <!-- Afficher la confirmation pendant deux secondes, même si la carte de la dernière fiche favorite disparaît. -->
  <v-snackbar v-model="showSnackbar" color="primary" :timeout="2000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script setup>
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  // Lire l’erreur des favoris et récupérer le texte et l’état du message partagé par les pages.
  const godStore = useGodStore()
  const { showSnackbar, snackbarMessage } = useFavoriteFeedback()
</script>
