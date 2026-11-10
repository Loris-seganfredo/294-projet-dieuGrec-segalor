<template>
  <!-- Page qui montre uniquement les divinités enregistrées avec le cœur. -->
  <v-container class="py-8">
    <!-- Le nombre dans le titre se met à jour quand un favori est ajouté ou retiré. -->
    <h1 class="text-h3 text-center mb-8">
      My favorites ({{ godStore.totalFavorites }})
    </h1>

    <!-- Le navigateur ne garde que les numéros des favoris. Attendre les fiches complètes avant de les afficher. -->
    <!-- La barre bouge pendant le chargement. Elle ne donne pas de pourcentage. -->
    <v-progress-linear
      v-if="godStore.isLoading || (!godStore.error && !godStore.hasLoaded)"
      aria-label="Loading favorites"
      color="primary"
      indeterminate
    />
    <!-- Si le catalogue ne peut pas être chargé, montrer le message d’erreur. -->
    <v-alert v-else-if="godStore.error" class="mb-6" type="error" variant="tonal">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <span>{{ godStore.error }}</span>
        <!-- Ce bouton réessaie de charger le catalogue en appelant la même fonction qu’au démarrage. -->
        <v-btn :loading="godStore.isLoading" variant="text" @click="godStore.init()">
          Try again
        </v-btn>
      </div>
    </v-alert>
    <!-- Si le catalogue est chargé et que la liste des favoris est vide, expliquer comment en ajouter un. -->
    <v-alert
      v-else-if="godStore.totalFavorites === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      You have no favorites yet.
      Click the heart on a god to add your first favorite!
    </v-alert>
    <!-- S’il reste des favoris, les afficher en grille. -->
    <v-row v-else>
      <!-- v-for crée une colonne par favori. Le numéro de la fiche permet à Vue de reconnaître chaque carte. -->
      <!-- Le nombre de cartes par ligne augmente quand l’écran s’élargit. -->
      <v-col
        v-for="god in godStore.getFavorites"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!-- Passer à la carte les données de la fiche et l’état de son cœur. -->
        <!-- Le clic sur le cœur est renvoyé à cette page, qui appelle la fonction commune de retrait ou d’ajout. -->
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
  // Réutiliser la même carte que sur la page d’accueil.
  import GodCard from '@/components/GodCard.vue'
  // Importer l’action du cœur et son message de confirmation.
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  // Les fiches et les favoris sont rangés dans le store, la mémoire commune du site.
  import { useGodStore } from '@/stores/godStore'

  // Utiliser le même store que sur la page d’accueil.
  const godStore = useGodStore()
  // Récupérer la fonction appelée lorsqu’on clique sur un cœur.
  const { toggleFavorite } = useFavoriteFeedback()
  // /favoris est une deuxième adresse pour cette page. Les anciens liens fonctionnent toujours.
  definePage({ alias: '/favoris' })
</script>
