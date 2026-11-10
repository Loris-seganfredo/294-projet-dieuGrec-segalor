<template>
  <v-container class="py-8">
    <!-- Le bouton « Back » appelle goBack pour revenir à la page précédente. -->
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      variant="text"
      @click="goBack"
    >
      Back
    </v-btn>

    <!-- Attendre le catalogue avant de chercher la fiche et afficher une barre pendant ce temps. -->
    <v-progress-linear
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Loading god profile"
      class="mb-6"
      color="primary"
      indeterminate
    />

    <!-- Si le chargement échoue, montrer le message et proposer de réessayer. -->
    <v-alert
      v-else-if="error"
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

    <!-- Le catalogue est prêt, mais aucune fiche n’a le numéro demandé. -->
    <v-alert
      v-else-if="!god"
      type="warning"
      variant="tonal"
    >
      This god could not be found.
    </v-alert>

    <!-- Si la fiche existe, mettre l’image et le texte côte à côte sur grand écran, puis l’un sous l’autre sur mobile. -->
    <v-card
      v-else
      class="overflow-hidden"
      rounded="lg"
    >
      <v-row no-gutters>
        <v-col
          cols="12"
          md="5"
        >
          <!-- Envoyer le nom et le portrait au composant qui gère les images manquantes. -->
          <GodImage
            height="100%"
            :image="god.image"
            min-height="320"
            :name="god.name"
          />
        </v-col>

        <v-col cols="12" md="7">
          <v-card-text class="pa-6 pa-md-8">
            <!-- Montrer la catégorie et le nom. Ajouter l’origine seulement si elle existe. -->
            <p class="text-overline text-primary mb-1">
              {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
            </p>
            <h1 class="text-h3 font-weight-bold mb-4">
              {{ god.name }}
            </h1>
            <!-- Le cœur change la liste des favoris. Son texte, son icône et aria-pressed indiquent si la fiche est déjà en favori. -->
            <v-btn
              :aria-pressed="godStore.isFavorite(god)"
              class="mb-6"
              color="favorite"
              :prepend-icon="godStore.isFavorite(god) ? 'mdi-heart' : 'mdi-heart-outline'"
              variant="tonal"
              @click="toggleFavorite(god)"
            >
              {{ godStore.isFavorite(god) ? 'Remove from favorites' : 'Add to favorites' }}
            </v-btn>
            <!-- Afficher le résumé de la divinité, puis sa résidence si l’API la fournit. -->
            <p class="text-body-1 mb-6">
              {{ god.description }}
            </p>

            <p v-if="god.abode" class="mb-6">
              <strong>Residence:</strong> {{ god.abode }}
            </p>

            <!-- Créer une étiquette par symbole si la liste existe et contient des éléments. -->
            <section v-if="god.symbols?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Symbols</h2>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="symbol in god.symbols"
                  :key="symbol"
                  color="primary"
                  variant="tonal"
                >
                  {{ symbol }}
                </v-chip>
              </div>
            </section>

            <!-- Lister les pouvoirs seulement si la fiche en contient. -->
            <section v-if="god.powers?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Powers</h2>
              <ul class="pl-5">
                <li v-for="power in god.powers" :key="power">{{ power }}</li>
              </ul>
            </section>

            <!-- Lister les récits de la même façon, seulement s’il y en a. -->
            <section v-if="god.stories?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Related stories</h2>
              <ul class="pl-5">
                <li v-for="story in god.stories" :key="story">{{ story }}</li>
              </ul>
            </section>

            <!-- Séparer les liens de famille des autres informations de la fiche. -->
            <v-divider class="my-5" />

            <!-- Pour chaque groupe de la famille, afficher les noms disponibles. join ajoute des virgules entre eux. -->
            <div class="d-flex flex-wrap ga-6">
              <div v-if="god.parents?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Parents</h2>
                <p>{{ god.parents.join(', ') }}</p>
              </div>
              <div v-if="god.siblings?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Siblings</h2>
                <p>{{ god.siblings.join(', ') }}</p>
              </div>
              <div v-if="god.spouse?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Spouse</h2>
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
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import GodImage from '@/components/GodImage.vue'
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  import { useGodStore } from '@/stores/godStore'

  // useRoute donne l’adresse actuelle. useRouter sert à naviguer vers une autre page.
  const route = useRoute()
  const router = useRouter()

  // Récupérer l’action du cœur et l’état du chargement dans les outils communs aux pages.
  const { toggleFavorite } = useFavoriteFeedback()
  const godStore = useGodStore()
  const { isLoading, hasLoaded, error } = storeToRefs(godStore)

  // Dans /gods/1, route.params.id vaut « 1 ». Rechercher la fiche quand ce numéro ou le catalogue change.
  const god = computed(() => godStore.getGodById(route.params.id))

  // Revenir à la page précédente si elle est connue. Après un accès direct, ouvrir l’accueil.
  function goBack () {
    if (window.history.state?.back) router.back()
    else router.push('/')
  }
</script>
