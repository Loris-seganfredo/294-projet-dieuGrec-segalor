<template>
  <v-card class="h-100" hover rounded="lg" :to="`/gods/${god.id}`">
    <GodImage
      height="190"
      :image="god.image"
      :name="god.name"
    />
    <v-card-item>
      <v-card-title>{{ god.name }}</v-card-title>
      <v-card-subtitle class="text-medium-emphasis" :opacity="1">
        {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="text-medium-emphasis">
      {{ god.description }}
    </v-card-text>
    <v-card-actions>
      <span class="text-primary">View profile</span>
      <v-spacer />
      <v-btn
        :aria-label="`${isFavorite ? 'Remove' : 'Add'} ${god.name} ${isFavorite ? 'from' : 'to'} favorites`"
        :aria-pressed="isFavorite"
        :class="{ 'favorite-active': isFavorite }"
        :color="isFavorite ? 'favorite' : 'secondary'"
        :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click.stop.prevent="emit('toggle-favorite', god)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import GodImage from '@/components/GodImage.vue'

  defineProps({
    god: { type: Object, required: true },
    isFavorite: { type: Boolean, required: true },
  })
  // Props flow down from the page; user actions are emitted back to it.
  const emit = defineEmits(['toggle-favorite'])
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
