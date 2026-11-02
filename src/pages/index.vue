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
      <v-chip class="ml-2" color="red-darken-2" prepend-icon="mdi-heart" variant="tonal">
        {{ godStore.totalFavorites }} favori{{ godStore.totalFavorites > 1 ? 's' : '' }}
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

    <v-row class="mb-4">
      <v-col cols="12" md="4" sm="6">
        <v-text-field
          v-model="searchQuery"
          clearable
          density="compact"
          hide-details
          label="Rechercher un dieu"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" md="4" sm="6">
        <v-select
          v-model="selectedCategory"
          clearable
          density="compact"
          hide-details
          :items="categories"
          label="Filtrer par catégorie"
          prepend-inner-icon="mdi-filter"
          variant="outlined"
        />
      </v-col>
      <v-col class="d-flex align-center" cols="12" md="4">
        <v-btn
          :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
          variant="outlined"
          @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="isLoading || (!error && !hasLoaded)">
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader
          height="350"
          type="image, article"
        />
      </v-col>
    </v-row>
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

    <v-alert
      v-else-if="sortedGods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      Aucun dieu ne correspond à votre recherche.
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="god in sortedGods"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <GodCard :god="god" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import GodCard from '@/components/GodCard.vue'
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()
  const { gods, categories, totalGods, isLoading, hasLoaded, error } = storeToRefs(godStore)
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortOrder = ref('asc')

  const filteredByCategory = computed(() => {
    if (!selectedCategory.value) return gods.value
    return gods.value.filter(god => god.category === selectedCategory.value)
  })

  const filteredBySearch = computed(() => {
    if (!searchQuery.value) return filteredByCategory.value
    const query = searchQuery.value.toLowerCase()
    return filteredByCategory.value.filter(god =>
      god.name.toLowerCase().includes(query),
    )
  })

  const sortedGods = computed(() => {
    // L'étape 13 demande sort() : on trie une copie pour préserver le store.
    // eslint-disable-next-line unicorn/no-array-sort
    return [...filteredBySearch.value].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'fr')
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  function toggleSort () {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

</script>
