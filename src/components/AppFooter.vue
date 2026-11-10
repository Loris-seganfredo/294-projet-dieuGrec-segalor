<template>
  <footer class="text-center text-caption pa-3">
    <!-- L’année vient du navigateur et le nom du projet est fourni par le layout. -->
    <span>© {{ new Date().getFullYear() }} <slot /></span>
  </footer>
</template>
