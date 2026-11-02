<template>
  <v-card class="h-100" hover rounded="lg">
    <v-img
      v-if="god.image"
      :alt="god.name"
      cover
      height="190"
      :src="godImageUrl(god.image)"
    />
    <v-card-item>
      <v-card-title>{{ god.name }}</v-card-title>
      <v-card-subtitle>
        {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="text-medium-emphasis">
      {{ god.description }}
    </v-card-text>
    <v-card-actions>
      <v-btn color="amber-darken-3" :to="`/gods/${god.id}`" variant="text">
        Voir le portrait
      </v-btn>
      <v-spacer />
      <v-btn
        :aria-label="`${godStore.isFavorite(god) ? 'Retirer' : 'Ajouter'} ${god.name} ${godStore.isFavorite(god) ? 'des' : 'aux'} favoris`"
        :aria-pressed="godStore.isFavorite(god)"
        :class="{ 'favorite-active': godStore.isFavorite(god) }"
        :color="godStore.isFavorite(god) ? 'red-darken-2' : 'grey'"
        :icon="godStore.isFavorite(god) ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click.stop.prevent="handleToggleFavorite"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  const props = defineProps({
    god: { type: Object, required: true },
  })
  const godStore = useGodStore()
  const { notifyFavorite } = useFavoriteFeedback()

  function handleToggleFavorite () {
    const wasFavorite = godStore.isFavorite(props.god)
    godStore.toggleFavorite(props.god)
    notifyFavorite(wasFavorite)
  }

  function godImageUrl (image) {
    return new URL(image, 'https://apis.divtec.me').toString()
  }
</script>

<style scoped>
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .favorite-active {
    animation: none;
  }
}
</style>
