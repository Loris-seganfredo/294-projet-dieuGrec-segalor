<template>
  <v-app-bar>
    <!-- Masquer le titre sur petit écran pour laisser de la place aux liens. -->
    <v-app-bar-title class="d-none d-sm-block">Greek Gods</v-app-bar-title>
    <nav aria-label="Main navigation" class="d-flex align-center px-1">
      <!-- exact réserve l’état actif du lien d’accueil à la route /. -->
      <v-btn
        class="px-2"
        exact
        prepend-icon="mdi-home"
        size="small"
        to="/"
      >Home</v-btn>
      <!-- Le compteur suit les modifications du store sur toutes les pages. -->
      <v-btn class="px-2" prepend-icon="mdi-heart" size="small" to="/favorites">
        Favorites ({{ godStore.totalFavorites }})
      </v-btn>
      <v-btn class="px-2" prepend-icon="mdi-information-outline" size="small" to="/about">About</v-btn>
    </nav>
  </v-app-bar>
</template>

<script setup>
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()
</script>
