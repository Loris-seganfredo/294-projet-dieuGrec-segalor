<template>
  <!-- Le nom [...path].vue fait de cette page la réponse aux adresses inconnues. -->
  <v-container class="py-8 text-center">
    <h1 class="text-h3 mb-4">Page not found</h1>
    <p class="mb-6">The page you are looking for does not exist.</p>
    <!-- Proposer un lien vers /, l’adresse de l’accueil. -->
    <v-btn color="primary" prepend-icon="mdi-home" to="/">Back to home</v-btn>
  </v-container>
</template>
