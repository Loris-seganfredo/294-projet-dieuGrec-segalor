<template>
  <v-container class="py-8">
    <v-btn
      to="/"
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
    >
      Retour à la liste
    </v-btn>

    <v-progress-linear
      v-if="isLoading || (!error && gods.length === 0)"
      indeterminate
      color="amber-darken-3"
      class="mb-6"
      aria-label="Chargement du dieu"
    />

    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
    >
      {{ error }}
    </v-alert>

    <v-alert
      v-else-if="!god"
      type="warning"
      variant="tonal"
    >
      Ce dieu n’a pas été trouvé.
    </v-alert>

    <v-card
      v-else
      rounded="lg"
      class="overflow-hidden"
    >
      <v-row no-gutters>
        <v-col
          v-if="god.image"
          cols="12"
          md="5"
        >
          <v-img
            :src="godImageUrl(god.image)"
            :alt="god.name"
            height="100%"
            min-height="320"
            cover
          />
        </v-col>

        <v-col cols="12" :md="god.image ? 7 : 12">
          <v-card-text class="pa-6 pa-md-8">
            <p class="text-overline text-amber-darken-3 mb-1">
              {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
            </p>
            <h1 class="text-h3 font-weight-bold mb-4">
              {{ god.name }}
            </h1>
            <p class="text-body-1 mb-6">
              {{ god.description }}
            </p>

            <p v-if="god.abode" class="mb-6">
              <strong>Résidence :</strong> {{ god.abode }}
            </p>

            <section v-if="god.symbols?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Symboles</h2>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="symbol in god.symbols"
                  :key="symbol"
                  color="amber-darken-3"
                  variant="tonal"
                >
                  {{ symbol }}
                </v-chip>
              </div>
            </section>

            <section v-if="god.powers?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Pouvoirs</h2>
              <ul class="pl-5">
                <li v-for="power in god.powers" :key="power">{{ power }}</li>
              </ul>
            </section>

            <section v-if="god.stories?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Récits associés</h2>
              <ul class="pl-5">
                <li v-for="story in god.stories" :key="story">{{ story }}</li>
              </ul>
            </section>

            <v-divider class="my-5" />

            <div class="d-flex flex-wrap ga-6">
              <div v-if="god.parents?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Parents</h2>
                <p>{{ god.parents.join(', ') }}</p>
              </div>
              <div v-if="god.siblings?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Fratrie</h2>
                <p>{{ god.siblings.join(', ') }}</p>
              </div>
              <div v-if="god.spouse?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Époux ou épouse</h2>
                <p>{{ god.spouse.join(', ') }}</p>
              </div>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { useGodStore } from '@/stores/godStore'

  const API_ORIGIN = 'https://apis.divtec.me'
  const route = useRoute()
  const godStore = useGodStore()
  const { gods, isLoading, error } = storeToRefs(godStore)

  const god = computed(() => godStore.getGodById(route.params.id))

  function godImageUrl(image) {
    return new URL(image, API_ORIGIN).toString()
  }
</script>
