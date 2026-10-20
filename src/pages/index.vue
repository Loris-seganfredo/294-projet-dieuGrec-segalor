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
        v-if="hasLoaded && !error"
        color="amber-darken-3"
        variant="tonal"
      >
        {{ totalGods }} dieux recensés
      </v-chip>
    </header>

    <div
      v-if="categories.length > 0"
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
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Chargement des dieux"
      class="mb-6"
      color="amber-darken-3"
      indeterminate
    />

    <v-alert
      v-else-if="error"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <span>{{ error }}</span>
        <v-btn
          :loading="isLoading"
          variant="text"
          @click="godStore.init()"
        >
          Réessayer
        </v-btn>
      </div>
    </v-alert>

    <v-alert
      v-else-if="gods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Aucun dieu n’est disponible pour le moment.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="god in gods"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card
          class="h-100"
          hover
          rounded="lg"
          :to="`/gods/${god.id}`"
        >
          <v-img
            v-if="god.image"
            :alt="god.name"
            cover
            height="190"
            :src="godImageUrl(god.image)"
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
            <v-icon color="amber-darken-3" icon="mdi-arrow-right" />
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
  const { gods, categories, totalGods, isLoading, hasLoaded, error } = storeToRefs(godStore)

  function godImageUrl (image) {
    return new URL(image, API_ORIGIN).toString()
  }
</script>
