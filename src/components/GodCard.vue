<template>
  <!-- Construire le lien de la fiche avec le numéro de la divinité. Toute la carte est cliquable. -->
  <v-card class="h-100" hover rounded="lg" :to="`/gods/${god.id}`">
    <!-- Afficher le portrait avec le composant qui gère les images manquantes. -->
    <GodImage
      height="190"
      :image="god.image"
      :name="god.name"
    />
    <!-- Résumer la fiche avec son nom et sa catégorie. Ajouter l’origine quand elle est connue. -->
    <v-card-item>
      <v-card-title>{{ god.name }}</v-card-title>
      <v-card-subtitle class="text-medium-emphasis" :opacity="1">
        {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
      </v-card-subtitle>
    </v-card-item>
    <!-- Afficher la description reçue de l’API. -->
    <v-card-text class="text-medium-emphasis">
      {{ god.description }}
    </v-card-text>
    <!-- Placer le texte du lien à gauche et le bouton de favori à droite. -->
    <v-card-actions>
      <span class="text-primary">View profile</span>
      <v-spacer />
      <!-- L’icône et les attributs aria indiquent l’état du favori et l’action du bouton. -->
      <!-- stop et prevent empêchent le clic d’ouvrir la fiche. emit prévient la page que le cœur a été cliqué. -->
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

  // La page fournit les données de la divinité et indique si elle est en favori.
  defineProps({
    god: { type: Object, required: true },
    isFavorite: { type: Boolean, required: true },
  })

  // Déclarer le signal que la carte envoie à la page pour lui laisser le soin de modifier les favoris.
  const emit = defineEmits(['toggle-favorite'])
</script>

<style scoped>
/* Faire battre le cœur quand il devient plein. */
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}

/* Respecter le réglage de l’appareil si la personne préfère moins de mouvements. */
@media (prefers-reduced-motion: reduce) {
  .favorite-active {
    animation: none;
  }
}
</style>
