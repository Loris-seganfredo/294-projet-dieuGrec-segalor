<template>
  <!-- Barre de navigation commune. Sur les petits écrans, le titre se cache pour laisser la place aux liens. -->
  <v-app-bar>
    <v-app-bar-title class="d-none d-sm-block">Greek Gods</v-app-bar-title>
    <nav aria-label="Main navigation" class="d-flex align-center px-1">
      <!-- exact rend le bouton Home actif seulement sur la page d’accueil. -->
      <v-btn
        class="px-2"
        exact
        prepend-icon="mdi-home"
        size="small"
        to="/"
      >Home</v-btn>
      <!-- Le bouton Favorites ouvre la liste et montre le compteur lu dans le store. -->
      <v-btn class="px-2" prepend-icon="mdi-heart" size="small" to="/favorites">
        Favorites ({{ godStore.totalFavorites }})
      </v-btn>
      <!-- Le lien About ouvre la présentation du projet. -->
      <v-btn class="px-2" prepend-icon="mdi-information-outline" size="small" to="/about">About</v-btn>
    </nav>
  </v-app-bar>
</template>

<script setup>
  import { useGodStore } from '@/stores/godStore'

  // Lire le nombre de favoris dans la mémoire commune du site.
  const godStore = useGodStore()
</script>
