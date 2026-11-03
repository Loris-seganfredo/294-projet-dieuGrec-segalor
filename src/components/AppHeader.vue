<template>
  <v-app-bar>
    <v-app-bar-title class="d-none d-sm-block">Greek Gods</v-app-bar-title>
    <nav aria-label="Main navigation" class="d-flex align-center px-1">
      <v-btn
        class="px-2"
        exact
        prepend-icon="mdi-home"
        size="small"
        to="/"
      >Home</v-btn>
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
