<template>
  <AppHeader />
  <v-main>
    <v-alert
      v-if="godStore.favoritesError"
      class="ma-4"
      type="warning"
      variant="tonal"
    >
      {{ godStore.favoritesError }}
    </v-alert>
    <router-view />
  </v-main>

  <AppFooter>Explore Greek mythology, one story at a time.</AppFooter>
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
