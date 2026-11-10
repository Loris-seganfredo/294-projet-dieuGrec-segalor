<template>
  <!-- Cette page présente le projet. Son texte est écrit ici, indépendamment du catalogue. -->
  <v-container class="py-8" style="max-width: 800px">
    <h1 class="text-h3 mb-6">About Greek Gods</h1>
    <!-- Expliquer ce que le visiteur peut explorer avec la recherche, le filtre et les fiches. -->
    <p class="text-body-1 mb-4">
      Discover the gods and goddesses of Greek mythology, their origins, powers and stories.
      Search by name, filter by category and click a card to explore a profile.
    </p>
    <!-- Présenter le cœur et préciser que les favoris sont gardés dans ce navigateur. -->
    <p class="text-body-1 mb-4">
      Click a heart to save a favorite. Your favorites stay in this browser after you
      reload the page. They are not shared across browsers or devices.
    </p>
    <!-- Présenter les outils utilisés et la source des données. -->
    <p class="text-body-1 mb-4">
      This student project uses Vue, Vuetify, Pinia and the DIVTEC Greek mythology API.
      The catalog reflects the API's names and categories, including a few Roman deities.
      Development and testing were assisted by Codex.
    </p>
    <!-- Ramener le visiteur au catalogue. -->
    <v-btn color="primary" prepend-icon="mdi-home" to="/">Explore the gods</v-btn>
  </v-container>
</template>
