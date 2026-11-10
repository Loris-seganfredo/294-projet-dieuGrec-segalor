<template>
  <!-- Le nom [...path].vue indique que cette page reçoit toutes les adresses que le site ne reconnaît pas. -->
  <v-container class="py-8 text-center">
    <!-- Titre du message pour une page introuvable. -->
    <h1 class="text-h3 mb-4">Page not found</h1>
    <!-- Expliquer simplement pourquoi l’adresse ne mène nulle part. -->
    <p class="mb-6">The page you are looking for does not exist.</p>
    <!-- Le bouton avec l’icône de maison ramène à /, l’adresse de l’accueil. -->
    <v-btn color="primary" prepend-icon="mdi-home" to="/">Back to home</v-btn>
  </v-container>
</template>
