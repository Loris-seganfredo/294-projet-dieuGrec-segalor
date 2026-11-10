<template>
  <v-container class="py-8">
    <!-- Le titre affiche le nombre de favoris. Il change à chaque ajout ou retrait. -->
    <h1 class="text-h3 text-center mb-8">
      My favorites ({{ godStore.totalFavorites }})
    </h1>

    <!-- Le navigateur garde les numéros des favoris. Attendre le catalogue pour retrouver leurs fiches. -->
    <v-progress-linear
      v-if="godStore.isLoading || (!godStore.error && !godStore.hasLoaded)"
      aria-label="Loading favorites"
      color="primary"
      indeterminate
    />
    <!-- Si le catalogue ne charge pas, afficher l’erreur et proposer de réessayer. -->
    <v-alert v-else-if="godStore.error" class="mb-6" type="error" variant="tonal">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <span>{{ godStore.error }}</span>
        <v-btn :loading="godStore.isLoading" variant="text" @click="godStore.init()">
          Try again
        </v-btn>
      </div>
    </v-alert>
    <!-- Si la liste est vide, expliquer qu’un clic sur un cœur ajoute un favori. -->
    <v-alert
      v-else-if="godStore.totalFavorites === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      You have no favorites yet.
      Click the heart on a god to add your first favorite!
    </v-alert>
    <!-- Quand des favoris existent, afficher une colonne par fiche. La grille s’adapte à la largeur de l’écran. -->
    <v-row v-else>
      <v-col
        v-for="god in godStore.getFavorites"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!-- Réutiliser la carte de l’accueil. Son cœur déclenche ici la même action d’ajout ou de retrait. -->
        <GodCard
          :god="god"
          :is-favorite="godStore.isFavorite(god)"
          @toggle-favorite="toggleFavorite"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import GodCard from '@/components/GodCard.vue'
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  // Lire les favoris dans le store et utiliser l’action commune du cœur.
  const godStore = useGodStore()
  const { toggleFavorite } = useFavoriteFeedback()
  // L’ancienne adresse /favoris ouvre la même page que /favorites.
  definePage({ alias: '/favoris' })
</script>
