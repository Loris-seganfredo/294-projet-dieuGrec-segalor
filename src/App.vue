<template>
  <v-app>
    <!-- Vue Router affiche ici la structure commune et la page liée à l’URL. -->
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()

  // Initialiser le catalogue et les favoris au montage du composant racine.
  onMounted(async () => {
    await godStore.init()
  })
</script>

<style lang="scss">
// Charger les styles partagés par toutes les pages.
@use '@/styles/favorites.scss';
@use '@/styles/accessibility.scss';
</style>
