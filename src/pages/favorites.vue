<template>
  <v-container class="py-8">
    <h1 class="text-h3 text-center mb-8">
      My favorites ({{ godStore.totalFavorites }})
    </h1>

    <v-progress-linear
      v-if="godStore.isLoading || (!godStore.error && !godStore.hasLoaded)"
      aria-label="Loading favorites"
      color="primary"
      indeterminate
    />
    <v-alert v-else-if="godStore.error" class="mb-6" type="error" variant="tonal">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <span>{{ godStore.error }}</span>
        <v-btn :loading="godStore.isLoading" variant="text" @click="godStore.init()">
          Try again
        </v-btn>
      </div>
    </v-alert>
    <v-alert
      v-else-if="godStore.totalFavorites === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      You have no favorites yet.
      Click the heart on a god to add your first favorite!
    </v-alert>
    <v-row v-else>
      <v-col
        v-for="god in godStore.getFavorites"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
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

  const godStore = useGodStore()
  const { toggleFavorite } = useFavoriteFeedback()
  definePage({ alias: '/favoris' })
</script>
