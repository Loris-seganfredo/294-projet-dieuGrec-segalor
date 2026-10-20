<template>
  <v-container class="py-8">
    <header class="text-center mb-8">
      <p class="text-overline text-amber-darken-3 mb-2">
        Mythologie grecque
      </p>
      <h1 class="text-h3 font-weight-bold mb-3">
        Les dieux grecs
      </h1>
      <p class="text-body-1 text-medium-emphasis mb-4">
        Découvrez les dieux, leurs récits et les symboles qui leur sont associés.
      </p>
      <v-chip
        v-if="!isLoading && !error"
        color="amber-darken-3"
        variant="tonal"
      >
        {{ totalGods }} dieux recensés
      </v-chip>
    </header>

    <div
      v-if="categories.length"
      class="d-flex justify-center flex-wrap ga-2 mb-6"
    >
      <v-chip
        v-for="category in categories"
        :key="category"
        size="small"
        variant="outlined"
      >
        {{ category }}
      </v-chip>
    </div>

    <v-progress-linear
      v-if="isLoading || (!error && gods.length === 0)"
      indeterminate
      color="amber-darken-3"
      class="mb-6"
      aria-label="Chargement des dieux"
    />

    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      class="mb-6"
    >
      {{ error }}
    </v-alert>

    <v-alert
      v-else-if="gods.length === 0"
      type="info"
      variant="tonal"
      class="mb-6"
    >
      Aucun dieu n’est disponible pour le moment.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="god in gods"
        :key="god.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :to="`/gods/${god.id}`"
          class="h-100"
          rounded="lg"
          hover
        >
          <v-img
            v-if="god.image"
            :src="godImageUrl(god.image)"
            :alt="god.name"
            height="190"
            cover
          />
          <v-card-item>
            <v-card-title>{{ god.name }}</v-card-title>
            <v-card-subtitle>
              {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
            </v-card-subtitle>
          </v-card-item>
          <v-card-text class="text-medium-emphasis">
            {{ god.description }}
          </v-card-text>
          <v-card-actions>
            <span class="text-amber-darken-3">Voir le portrait</span>
            <v-spacer />
            <v-icon icon="mdi-arrow-right" color="amber-darken-3" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useGodStore } from '@/stores/godStore'

  const API_ORIGIN = 'https://apis.divtec.me'
  const godStore = useGodStore()
  const { gods, categories, totalGods, isLoading, error } = storeToRefs(godStore)

  function godImageUrl(image) {
    return new URL(image, API_ORIGIN).toString()
  }
</script>
