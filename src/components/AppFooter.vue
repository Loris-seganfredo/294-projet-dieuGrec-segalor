<template>
  <!-- Pied de page commun. Le texte est petit, centré et entouré d’un peu d’espace. -->
  <footer class="text-center text-caption pa-3">
    <!-- getFullYear lit l’année actuelle. On n’a pas besoin de la changer chaque année dans le code. -->
    <!-- slot laisse une place pour le nom du projet que le fichier default.vue envoie ici. -->
    <span>© {{ new Date().getFullYear() }} <slot /></span>
  </footer>
</template>
