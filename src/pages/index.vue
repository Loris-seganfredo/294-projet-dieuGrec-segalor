<template>
  <!-- Page d’accueil. Le conteneur garde de l’espace au-dessus et au-dessous du contenu. -->
  <v-container class="py-8">
    <!-- En-tête centré avec le titre, une description et les compteurs. -->
    <header class="text-center mb-8">
      <!-- Petit texte au-dessus du titre pour annoncer le thème. -->
      <p class="text-overline text-primary mb-2">
        Greek mythology
      </p>
      <!-- Titre principal de la page. -->
      <h1 class="text-h3 font-weight-bold mb-3">
        Greek Gods
      </h1>
      <!-- Phrase d’introduction pour expliquer ce qu’on peut trouver sur le site. -->
      <p class="text-body-1 text-medium-emphasis mb-4">
        Discover the gods, their stories and the symbols associated with them.
      </p>
      <!-- Afficher le nombre de fiches seulement quand le catalogue est chargé et sans erreur. -->
      <v-chip
        v-if="hasLoaded && !error"
        color="primary"
        variant="tonal"
      >
        {{ totalGods }} gods in the catalog
      </v-chip>
      <!-- Afficher le nombre de favoris. Ajouter le « s » en anglais sauf s’il y en a exactement un. -->
      <v-chip class="ml-2" color="favorite" prepend-icon="mdi-heart" variant="tonal">
        {{ godStore.totalFavorites }} favorite{{ godStore.totalFavorites === 1 ? '' : 's' }}
      </v-chip>
    </header>

    <!-- Montrer les catégories en petites étiquettes si la liste contient au moins une catégorie. -->
    <div
      v-if="categories.length > 0"
      class="d-flex justify-center flex-wrap ga-2 mb-6"
    >
      <!-- v-for crée une étiquette par catégorie. :key donne à Vue un repère unique pour cette étiquette. -->
      <v-chip
        v-for="category in categories"
        :key="category"
        size="small"
        variant="outlined"
      >
        {{ category }}
      </v-chip>
    </div>

    <!-- Ligne des commandes : recherche, choix d’une catégorie et bouton de tri. -->
    <!-- Vuetify divise une ligne en 12 parts. cols, sm et md règlent la largeur selon la taille de l’écran. -->
    <v-row class="mb-4">
      <v-col cols="12" md="4" sm="6">
        <!-- v-model relie ce champ à searchQuery. Dès qu’on écrit ici, la recherche se met à jour. -->
        <!-- clearable ajoute une croix pour vider le champ. L’icône de loupe aide à le reconnaître. -->
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
        <!-- La liste de choix vient de categories. v-model garde le choix actuel dans selectedCategory. -->
        <!-- La croix retire le filtre et réaffiche toutes les catégories. -->
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
        <!-- Un clic appelle toggleSort. Le texte et l’icône changent selon le sens du tri actuel. -->
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

    <!-- v-if et v-else-if testent ces cas dans l’ordre. Seul le premier cas qui correspond est affiché. -->
    <!-- Pendant l’attente, afficher des cartes grises pour garder la place des futures fiches. -->
    <!-- role et aria-label permettent à un lecteur d’écran d’annoncer le chargement. -->
    <v-row
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Loading gods"
      role="status"
    >
      <!-- Répéter huit fois la même colonne pour créer les cartes d’attente. -->
      <v-col
        v-for="n in 8"
        :key="n"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!-- Ce rectangle ressemble à une carte avec une image et du texte. Il est décoratif pour un lecteur d’écran. -->
        <v-skeleton-loader
          aria-hidden="true"
          height="350"
          type="image, article"
        />
      </v-col>
    </v-row>
    <!-- Si le chargement échoue, afficher le message reçu du store. -->
    <v-alert
      v-else-if="error"
      class="mb-6"
      type="error"
      variant="tonal"
    >
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <span>{{ error }}</span>
        <!-- Le bouton « Try again » relance le chargement. :loading indique si la tentative est en cours. -->
        <v-btn
          :loading="isLoading"
          variant="text"
          @click="godStore.init()"
        >
          Try again
        </v-btn>
      </div>
    </v-alert>

    <!-- Ce message apparaît si l’API a répondu mais que son catalogue est vide. -->
    <v-alert
      v-else-if="gods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods are available at the moment.
    </v-alert>

    <!-- Ici, le catalogue existe, mais aucune fiche ne correspond à la recherche et au filtre actuels. -->
    <v-alert
      v-else-if="sortedGods.length === 0"
      class="mb-6"
      type="info"
      variant="tonal"
    >
      No gods match your search and filters.
    </v-alert>

    <!-- Dans le dernier cas, montrer les fiches qui correspondent aux choix de l’utilisateur. -->
    <v-row v-else>
      <!-- Créer une colonne par fiche. Son numéro god.id sert de repère unique. -->
      <!-- La grille montre 1 carte par ligne sur téléphone, puis jusqu’à 4 sur un grand écran. -->
      <v-col
        v-for="god in sortedGods"
        :key="god.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <!-- Le signe : passe une valeur de la page à la carte, ici la fiche et l’état du cœur. -->
        <!-- Le signe @ écoute le clic sur le cœur envoyé par la carte et appelle toggleFavorite. -->
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
  // storeToRefs permet de sortir des valeurs du store en gardant leur mise à jour automatique.
  import { storeToRefs } from 'pinia'
  // ref crée une valeur surveillée par Vue. computed recalcule un résultat si ses données changent.
  import { computed, ref } from 'vue'
  // Utiliser le même modèle de carte pour chaque divinité.
  import GodCard from '@/components/GodCard.vue'
  // Réutiliser l’action du cœur et le message de confirmation.
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  // Lire le catalogue et les favoris dans la mémoire commune du site, appelée store.
  import { useGodStore } from '@/stores/godStore'

  // Accéder au store de Pinia pour cette page.
  const godStore = useGodStore()
  // Prendre la fonction qui ajoute ou retire une divinité des favoris.
  const { toggleFavorite } = useFavoriteFeedback()
  // Prendre les listes, le compteur et l’état du chargement. Ils restent à jour si le store change.
  const { gods, categories, totalGods, isLoading, hasLoaded, error } = storeToRefs(godStore)
  // Au départ, le champ de recherche est vide.
  const searchQuery = ref('')
  // Au départ, aucune catégorie n’est choisie. null représente ici l’absence de choix.
  const selectedCategory = ref(null)
  // asc signifie que les noms sont triés de A à Z au départ.
  const sortOrder = ref('asc')

  // Étape 1 : filtrer le catalogue par catégorie.
  const filteredByCategory = computed(() => {
    // Sans choix de catégorie, garder tout le catalogue. Dans le JavaScript, .value lit la valeur suivie par Vue.
    if (!selectedCategory.value) return gods.value
    // filter garde seulement les fiches dont la catégorie correspond au choix.
    return gods.value.filter(god => god.category === selectedCategory.value)
  })

  // Étape 2 : chercher le texte saisi dans les noms des fiches qui restent après le premier filtre.
  const filteredBySearch = computed(() => {
    // Si le champ est vide, garder le résultat du premier filtre.
    if (!searchQuery.value) return filteredByCategory.value
    // trim enlève les espaces aux deux bouts de la recherche. toLowerCase met le texte en minuscules.
    const query = searchQuery.value.trim().toLowerCase()
    // Mettre aussi chaque nom en minuscules pour que « ZEU » et « zeu » trouvent les mêmes fiches.
    return filteredByCategory.value.filter(god =>
      // includes vérifie si le nom contient le texte saisi, même si le nom complet n’a pas été tapé.
      god.name.toLowerCase().includes(query),
    )
  })

  // Étape 3 : mettre les fiches restantes dans l’ordre demandé. C’est cette liste que la page affiche.
  const sortedGods = computed(() => {
    // Les trois points font une copie de la liste, car sort change l’ordre de la liste qu’il reçoit.
    // La ligne eslint-disable garde l’usage de sort pour cet exercice.
    // eslint-disable-next-line unicorn/no-array-sort
    return [...filteredBySearch.value].sort((a, b) => {
      // localeCompare compare deux noms dans l’ordre alphabétique anglais.
      const comparison = a.name.localeCompare(b.name, 'en')
      // Garder ce résultat pour A à Z. Inverser le signe pour obtenir Z à A.
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  })

  // Cette fonction est appelée quand on appuie sur le bouton de tri.
  function toggleSort () {
    // Passer à l’autre ordre. Vue recalcule et affiche la liste dès que cette valeur change.
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

</script>
