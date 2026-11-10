<template>
  <!-- Barre du haut qui apparaît sur toutes les pages. -->
  <v-app-bar>
    <!-- Le titre disparaît sur les plus petits écrans pour laisser de la place aux trois boutons. -->
    <v-app-bar-title class="d-none d-sm-block">Greek Gods</v-app-bar-title>
    <!-- Regrouper les liens dans une zone de navigation nommée pour les lecteurs d’écran. -->
    <nav aria-label="Main navigation" class="d-flex align-center px-1">
      <!-- Le bouton Home ouvre l’adresse /. exact le montre comme actif seulement quand on est à l’accueil. -->
      <v-btn
        class="px-2"
        exact
        prepend-icon="mdi-home"
        size="small"
        to="/"
      >Home</v-btn>
      <!-- Le bouton Favorites ouvre la page des favoris. Son compteur se met à jour à chaque ajout ou retrait. -->
      <v-btn class="px-2" prepend-icon="mdi-heart" size="small" to="/favorites">
        Favorites ({{ godStore.totalFavorites }})
      </v-btn>
      <!-- Le bouton About ouvre la page qui présente le projet. -->
      <v-btn class="px-2" prepend-icon="mdi-information-outline" size="small" to="/about">About</v-btn>
    </nav>
  </v-app-bar>
</template>

<script setup>
  // Importer l’accès au store, qui est la mémoire commune du catalogue et des favoris.
  import { useGodStore } from '@/stores/godStore'

  // Lire le nombre de favoris directement dans ce store.
  const godStore = useGodStore()
</script>
