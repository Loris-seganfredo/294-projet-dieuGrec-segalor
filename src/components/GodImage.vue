<template>
  <!-- Afficher le portrait ou une illustration de secours. alt décrit l’image à un lecteur d’écran. -->
  <!-- key renouvelle l’image si son adresse change. @error signale un échec de chargement. -->
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

  // Recevoir le nom et l’adresse du portrait. L’adresse peut être vide.
  const props = defineProps({
    image: { type: String, default: '' },
    name: { type: String, required: true },
  })

  // Choisir l’illustration si le portrait ne charge pas. isDefault sert à choisir le texte qui décrit l’image.
  const imageFailed = ref(false)
  const src = computed(() => imageFailed.value ? defaultGodImage : godImageUrl(props.image))
  const isDefault = computed(() => src.value === defaultGodImage)

  // Quand une autre adresse arrive, effacer l’ancienne erreur pour pouvoir essayer cette image.
  watch(() => props.image, () => {
    imageFailed.value = false
  })
</script>
