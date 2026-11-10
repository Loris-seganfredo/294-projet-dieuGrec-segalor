<template>
  <v-container class="py-8">
    <header class="text-center mb-8">
      <p class="text-overline text-primary mb-2">
        Greek mythology
      </p>
      <h1 class="text-h3 font-weight-bold mb-3">
        Greek Gods
      </h1>
      <p class="text-body-1 text-medium-emphasis mb-4">
        Discover the gods, their stories and the symbols associated with them.
      </p>
      <v-chip
        v-if="hasLoaded && !error"
        color="primary"
        variant="tonal"
      >
        {{ totalGods }} gods in the catalog
      </v-chip>
      <v-chip class="ml-2" color="favorite" prepend-icon="mdi-heart" variant="tonal">
        {{ godStore.totalFavorites }} favorite{{ godStore.totalFavorites === 1 ? '' : 's' }}
      </v-chip>
    </header>

    <!-- Les catégories affichées proviennent du catalogue chargé. -->
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

    <!-- v-model relie les champs à la recherche et à la catégorie sélectionnée. -->
    <v-row class="mb-4">
      <v-col cols="12" md="4" sm="6">
        <v-text-field
          v-model="searchQuery"
          clearable
          density="compact"
          hide-details
          label="Search by name"
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
          label="Filter by category"
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
          Sort {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Afficher dans l’ordre le chargement, l’erreur, un état vide ou les résultats. -->
    <v-row
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Loading gods"
      role="status"
    >
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-skeleton-loader
          aria-hidden="true"
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
          Try again
        </v-btn>
      </div>
    </v-alert>

    <v-alert
      v-else-if="gods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods are available at the moment.
    </v-alert>

    <v-alert
      v-else-if="sortedGods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods match your search and filters.
    </v-alert>

    <v-row v-else>
      <!-- La grille adapte le nombre de cartes par ligne à la largeur de l’écran. -->
      <v-col
        v-for="god in sortedGods"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <GodCard
          :god="god"
          :is-favorite="godStore.isFavorite(god)"
          @toggle-favorite="toggleFavorite"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import GodCard from '@/components/GodCard.vue'
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  const godStore = useGodStore()
  const { toggleFavorite } = useFavoriteFeedback()
  // storeToRefs conserve la réactivité des valeurs extraites du store.
  const { gods, categories, totalGods, isLoading, hasLoaded, error } = storeToRefs(godStore)
  // Ces choix appartiennent à la page. Ils contrôlent l’affichage du catalogue.
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortOrder = ref('asc')

  // Première étape du filtrage : garder toutes les divinités si aucune catégorie n’est choisie.
  const filteredByCategory = computed(() => {
    if (!selectedCategory.value) return gods.value
    return gods.value.filter(god => god.category === selectedCategory.value)
  })

  // Appliquer la recherche au résultat du filtre, par nom partiel et sans tenir compte de la casse.
  const filteredBySearch = computed(() => {
    if (!searchQuery.value) return filteredByCategory.value
    const query = searchQuery.value.trim().toLowerCase()
    return filteredByCategory.value.filter(god =>
      god.name.toLowerCase().includes(query),
    )
  })

  const sortedGods = computed(() => {
    // sort() modifie le tableau sur place. Trier une copie préserve l’ordre du catalogue.
    // eslint-disable-next-line unicorn/no-array-sort
    return [...filteredBySearch.value].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'en')
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  // Changer le sens du tri recalcule sortedGods automatiquement.
  function toggleSort () {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

</script>
