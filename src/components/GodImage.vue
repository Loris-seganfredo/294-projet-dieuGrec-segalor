<template>
  <!-- Ce composant affiche le portrait ou une illustration de secours. -->
  <!-- key force Vue à recréer l’image si son adresse change. cover remplit l’espace prévu. -->
  <!-- alt décrit le portrait ou l’illustration à un lecteur d’écran. @error se déclenche si l’image ne charge pas. -->
  <v-img
    :key="src"
    :alt="isDefault ? `Greek temple illustration — portrait unavailable for ${name}` : name"
    cover
    :src="src"
    @error="imageFailed = true"
  />
</template>

<script setup>
  // ref garde une valeur, computed recalcule un résultat et watch surveille un changement.
  import { computed, ref, watch } from 'vue'
  // Importer l’illustration de secours et la fonction qui prépare l’adresse d’un portrait.
  import { defaultGodImage, godImageUrl } from '@/utils/imageUrl'

  // Ce sont les données envoyées par la carte ou par la page de la fiche.
  const props = defineProps({
    // L’adresse est vide par défaut, car l’API ne fournit pas toujours de portrait.
    image: { type: String, default: '' },
    // Le nom est nécessaire pour décrire le portrait ou signaler qu’il manque.
    name: { type: String, required: true },
  })
  // Au départ, aucune erreur d’image n’a été détectée.
  const imageFailed = ref(false)
  // Si l’image a échoué, afficher le temple. Sinon, utiliser l’adresse préparée par godImageUrl.
  const src = computed(() => imageFailed.value ? defaultGodImage : godImageUrl(props.image))
  // Vérifier si l’image affichée est le temple pour choisir le bon texte alternatif.
  const isDefault = computed(() => src.value === defaultGodImage)

  // Si on reçoit une autre image, surveiller ce changement pour lui donner une nouvelle chance.
  watch(() => props.image, () => {
    // Effacer l’erreur qui concernait l’ancienne image.
    imageFailed.value = false
  })
</script>
