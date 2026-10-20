<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()

  onMounted(async () => {
    await godStore.init()
  })
</script>
