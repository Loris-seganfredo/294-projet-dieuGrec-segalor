<template>
  <v-app-bar>
    <v-app-bar-title>Mythologie grecque</v-app-bar-title>
    <v-btn exact prepend-icon="mdi-home" to="/">Accueil</v-btn>
    <v-btn prepend-icon="mdi-heart" to="/favoris">
      Favoris ({{ godStore.totalFavorites }})
    </v-btn>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
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
