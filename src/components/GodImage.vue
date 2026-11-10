<template>
  <!-- La clé recrée v-img si la source change. Le texte alternatif indique quand le portrait est indisponible. -->
  <v-img
    :key="src"
    :alt="isDefault ? `Greek temple illustration — portrait unavailable for ${name}` : name"
    cover
    :src="src"
    @error="imageFailed = true"
  />
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { defaultGodImage, godImageUrl } from '@/utils/imageUrl'

  const props = defineProps({
    image: { type: String, default: '' },
    name: { type: String, required: true },
  })
  // Utiliser l’illustration locale si le navigateur échoue à charger le portrait.
  const imageFailed = ref(false)
  const src = computed(() => imageFailed.value ? defaultGodImage : godImageUrl(props.image))
  const isDefault = computed(() => src.value === defaultGodImage)

  // Réinitialiser l’erreur pour laisser une nouvelle image se charger.
  watch(() => props.image, () => {
    imageFailed.value = false
  })
</script>
