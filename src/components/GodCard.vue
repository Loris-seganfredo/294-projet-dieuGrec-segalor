<template>
  <v-card class="h-100" hover rounded="lg" :to="`/gods/${god.id}`">
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
      <span class="text-amber-darken-3">View profile</span>
      <v-spacer />
      <v-btn
        :aria-label="`${isFavorite ? 'Remove' : 'Add'} ${god.name} ${isFavorite ? 'from' : 'to'} favorites`"
        :aria-pressed="isFavorite"
        :class="{ 'favorite-active': isFavorite }"
        :color="isFavorite ? 'red-darken-2' : 'grey'"
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click.stop.prevent="handleToggleFavorite"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'
  import { godImageUrl } from '@/utils/imageUrl'

  const props = defineProps({
    god: { type: Object, required: true },
  })
  const godStore = useGodStore()
  const isFavorite = computed(() => godStore.isFavorite(props.god))
  const { notifyFavorite } = useFavoriteFeedback()

  function handleToggleFavorite () {
    const wasFavorite = godStore.isFavorite(props.god)
    godStore.toggleFavorite(props.god)
    notifyFavorite(wasFavorite)
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
