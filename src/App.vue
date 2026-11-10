<template>
  <!-- Vuetify entoure le site et lui applique son thème. Vue Router affiche ici la page liée à l’adresse. -->
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useGodStore } from '@/stores/godStore'

  // Accéder à la mémoire commune du catalogue et des favoris.
  const godStore = useGodStore()

  // Une fois le site affiché, lire les favoris sauvegardés et charger le catalogue.
  onMounted(async () => {
    await godStore.init()
  })
</script>

<style lang="scss">
// Charger les styles partagés : le battement du cœur et le contour de navigation au clavier.
@use '@/styles/favorites.scss';
@use '@/styles/accessibility.scss';
</style>
