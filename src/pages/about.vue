<template>
  <!-- Cette page contient du texte de présentation écrit directement ici. -->
  <v-container class="py-8" style="max-width: 800px">
    <!-- Titre de la page À propos. -->
    <h1 class="text-h3 mb-6">About Greek Gods</h1>
    <!-- Premier paragraphe : présenter le catalogue et expliquer la recherche, le filtre et les fiches. -->
    <p class="text-body-1 mb-4">
      Discover the gods and goddesses of Greek mythology, their origins, powers and stories.
      Search by name, filter by category and click a card to explore a profile.
    </p>
    <!-- Deuxième paragraphe : expliquer comment enregistrer un favori et où il sera gardé. -->
    <p class="text-body-1 mb-4">
      Click a heart to save a favorite. Your favorites stay in this browser after you
      reload the page. They are not shared across browsers or devices.
    </p>
    <!-- Troisième paragraphe : présenter les outils du projet et la source des données. -->
    <p class="text-body-1 mb-4">
      This student project uses Vue, Vuetify, Pinia and the DIVTEC Greek mythology API.
      The catalog reflects the API's names and categories, including a few Roman deities.
      Development and testing were assisted by Codex.
    </p>
    <!-- Ce bouton ramène à l’accueil pour ouvrir le catalogue. -->
    <v-btn color="primary" prepend-icon="mdi-home" to="/">Explore the gods</v-btn>
  </v-container>
</template>
