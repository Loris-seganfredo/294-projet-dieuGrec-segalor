<template>
  <!-- Pied de page commun. Le texte est petit et centré. -->
  <footer class="text-center text-caption pa-3">
    <!-- getFullYear donne l’année actuelle. Le slot reçoit le nom du projet depuis default.vue. -->
    <span>© {{ new Date().getFullYear() }} <slot /></span>
  </footer>
</template>
