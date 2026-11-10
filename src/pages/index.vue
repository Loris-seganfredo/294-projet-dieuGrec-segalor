<template>
  <v-container class="py-8">
    <!-- Présenter le catalogue et montrer le nombre de fiches et de favoris. -->
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
      <!-- Attendre la fin du chargement pour afficher le total du catalogue. Le compteur de favoris se met à jour à chaque clic. -->
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

    <!-- S’il y a des catégories, créer une petite étiquette pour chacune. -->
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

    <!-- Les trois commandes permettent de rechercher, de filtrer et de changer le sens du tri. -->
    <v-row class="mb-4">
      <v-col cols="12" md="4" sm="6">
        <!-- v-model met searchQuery à jour à chaque frappe. La croix efface le champ. -->
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
        <!-- La liste vient de categories. Le choix est enregistré dans selectedCategory. -->
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
        <!-- Le bouton appelle toggleSort. Son texte et son icône suivent le sens du tri. -->
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

    <!-- Pendant l’attente, huit cartes grises occupent la place des futures fiches. -->
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
    <!-- En cas d’erreur, afficher le message et permettre de relancer la demande. -->
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

    <!-- Ce message indique que le catalogue renvoyé par l’API est vide. -->
    <v-alert
      v-else-if="gods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods are available at the moment.
    </v-alert>

    <!-- Ici le catalogue existe, mais aucun résultat ne correspond aux choix actuels. -->
    <v-alert
      v-else-if="sortedGods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods match your search and filters.
    </v-alert>

    <!-- Afficher une carte par résultat. La grille montre plus de cartes par ligne quand l’écran s’élargit. -->
    <v-row v-else>
      <v-col
        v-for="god in sortedGods"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!-- Donner la fiche et l’état du cœur à la carte. Quand la carte signale un clic sur le cœur, appeler toggleFavorite. -->
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

  // Utiliser les données et l’action des favoris communes aux pages.
  // storeToRefs garde les listes et les compteurs à jour quand le store change.
  const godStore = useGodStore()
  const { toggleFavorite } = useFavoriteFeedback()
  const { gods, categories, totalGods, isLoading, hasLoaded, error } = storeToRefs(godStore)

  // Au départ, la recherche est vide, sans catégorie sélectionnée, et les noms sont triés de A à Z.
  // ref permet à Vue de surveiller ces valeurs et de mettre l’écran à jour.
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortOrder = ref('asc')

  // Étape 1 : garder seulement la catégorie choisie. Sans choix, garder tout le catalogue.
  const filteredByCategory = computed(() => {
    if (!selectedCategory.value) return gods.value
    return gods.value.filter(god => god.category === selectedCategory.value)
  })

  // Étape 2 : dans les fiches restantes, chercher un morceau du nom, par exemple « zeu ».
  const filteredBySearch = computed(() => {
    if (!searchQuery.value) return filteredByCategory.value
    // Retirer les espaces aux extrémités et comparer en minuscules pour accepter aussi « ZEU ».
    const query = searchQuery.value.trim().toLowerCase()
    return filteredByCategory.value.filter(god =>
      god.name.toLowerCase().includes(query),
    )
  })

  // Étape 3 : trier les résultats que la page affichera. computed recalcule la liste si un choix change.
  const sortedGods = computed(() => {
    // sort change la liste qu’il reçoit. Les trois points font une copie pour garder l’ordre du catalogue.
    // eslint-disable-next-line unicorn/no-array-sort
    return [...filteredBySearch.value].sort((a, b) => {
      // Comparer deux noms. Pour passer de A à Z à Z à A, inverser le résultat de la comparaison.
      const comparison = a.name.localeCompare(b.name, 'en')
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  // Basculer entre les deux sens du tri. Le résultat est recalculé automatiquement.
  function toggleSort () {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

</script>
