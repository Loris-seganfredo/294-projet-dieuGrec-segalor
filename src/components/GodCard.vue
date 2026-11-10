<template>
  <!-- La propriété to ouvre la fiche de la divinité au clic sur la carte. -->
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
    <!-- Le cœur expose son état avec aria-pressed. stop et prevent empêchent le clic d’ouvrir la fiche. -->
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

  // La page transmet la divinité à afficher et indique si elle est dans les favoris.
  defineProps({
    god: { type: Object, required: true },
    isFavorite: { type: Boolean, required: true },
  })
  // La carte signale le clic à la page, qui se charge de modifier le store.
  const emit = defineEmits(['toggle-favorite'])
</script>

<style scoped>
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}

/* Respecter la préférence de réduction des animations du navigateur. */
@media (prefers-reduced-motion: reduce) {
  .favorite-active {
    animation: none;
  }
}
</style>
