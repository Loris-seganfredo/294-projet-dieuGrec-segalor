<template>
  <!-- Ce conteneur de Vuetify entoure tout le site et applique le thème. -->
  <v-app>
    <!-- Vue Router choisit la structure et la page à afficher d’après l’adresse actuelle. -->
    <router-view />
  </v-app>
</template>

<script setup>
  // onMounted lance du code dès que le composant principal est en place sur la page.
  import { onMounted } from 'vue'
  // Accéder à la mémoire commune du catalogue et des favoris.
  import { useGodStore } from '@/stores/godStore'

  // Ouvrir le store de Pinia pour préparer les données du site.
  const godStore = useGodStore()

  // Démarrer le chargement une fois que le site est affiché.
  onMounted(async () => {
    // Demander au store de lire les favoris sauvegardés et de charger le catalogue.
    await godStore.init()
  })
</script>

<style lang="scss">
// Charger l’animation du cœur et les styles pour la navigation au clavier.
// Le battement du cœur des favoris est défini dans cette feuille.
@use '@/styles/favorites.scss';
// Ce fichier rend plus visible l’élément sélectionné au clavier.
@use '@/styles/accessibility.scss';
</style>
