<template>
  <!-- L’en-tête et le pied de page encadrent le contenu de chaque route. -->
  <AppHeader />
  <v-main>
    <!-- Avertir si les favoris ne peuvent pas être lus ou enregistrés dans le navigateur. -->
    <v-alert
      v-if="godStore.favoritesError"
      class="ma-4"
      type="warning"
      variant="tonal"
    >
      {{ godStore.favoritesError }}
    </v-alert>
    <!-- Afficher la page correspondant à la route active. -->
    <router-view />
  </v-main>

  <AppFooter>Greek Gods</AppFooter>
  <!-- Afficher ici le message partagé, même après la disparition de la dernière carte favorite. -->
  <v-snackbar v-model="showSnackbar" color="primary" :timeout="2000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script setup>
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()
  const { showSnackbar, snackbarMessage } = useFavoriteFeedback()
</script>
