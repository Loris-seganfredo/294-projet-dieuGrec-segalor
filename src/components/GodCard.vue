<template>
  <!-- Cette carte résume une divinité dans le catalogue ou les favoris. -->
  <!-- Le numéro de la divinité forme l’adresse de sa fiche. Un clic sur la carte ouvre cette adresse. -->
  <v-card class="h-100" hover rounded="lg" :to="`/gods/${god.id}`">
    <!-- Afficher le portrait dans une zone haute de 190 pixels. Passer le nom pour le texte alternatif. -->
    <GodImage
      height="190"
      :image="god.image"
      :name="god.name"
    />
    <!-- Regrouper le nom et les informations courtes de la divinité. -->
    <v-card-item>
      <!-- Afficher le nom comme titre de la carte. -->
      <v-card-title>{{ god.name }}</v-card-title>
      <!-- Afficher la catégorie. Le point et l’origine ne s’affichent que si l’origine est connue. -->
      <v-card-subtitle class="text-medium-emphasis" :opacity="1">
        {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
      </v-card-subtitle>
    </v-card-item>
    <!-- Afficher la description reçue dans les données de la divinité. -->
    <v-card-text class="text-medium-emphasis">
      {{ god.description }}
    </v-card-text>
    <!-- La dernière ligne de la carte contient le texte « View profile » et le bouton en forme de cœur. -->
    <v-card-actions>
      <span class="text-primary">View profile</span>
      <!-- Remplir l’espace libre pour repousser le cœur à droite. -->
      <v-spacer />
      <!-- Le cœur est plein pour un favori et vide dans l’autre cas. Sa couleur et son animation suivent aussi cet état. -->
      <!-- aria-label décrit l’action et aria-pressed indique l’état du cœur à un lecteur d’écran. -->
      <!-- Au clic, stop empêche l’événement de remonter à la carte et prevent annule l’ouverture du lien. -->
      <!-- emit envoie le clic à la page avec la divinité concernée. -->
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
  // Réutiliser le composant qui remplace les portraits manquants.
  import GodImage from '@/components/GodImage.vue'

  // defineProps liste les informations envoyées par la page à la carte.
  defineProps({
    // god est l’ensemble des informations de la divinité. required indique que la carte en a besoin.
    god: { type: Object, required: true },
    // isFavorite vaut vrai ou faux selon que cette divinité est en favori.
    isFavorite: { type: Boolean, required: true },
  })
  // defineEmits déclare le signal que la carte peut envoyer à la page quand on clique sur le cœur.
  const emit = defineEmits(['toggle-favorite'])
</script>

<style scoped>
/* Le style scoped s’applique à cette carte. L’animation fait battre le cœur pendant 0,6 seconde. */
.favorite-active {
  animation: heartbeat 0.6s ease-in-out;
}

/* Si la personne a demandé moins de mouvements, désactiver le battement du cœur. */
@media (prefers-reduced-motion: reduce) {
  .favorite-active {
    animation: none;
  }
}
</style>
