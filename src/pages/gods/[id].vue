<template>
  <v-container class="py-8">
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      variant="text"
      @click="goBack"
    >
      Back
    </v-btn>

    <!-- Attendre le chargement et traiter une panne de l’API avant de signaler un identifiant introuvable. -->
    <v-progress-linear
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Loading god profile"
      class="mb-6"
      color="primary"
      indeterminate
    />

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

    <v-alert
      v-else-if="!god"
      type="warning"
      variant="tonal"
    >
      This god could not be found.
    </v-alert>

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
          <GodImage
            height="100%"
            :image="god.image"
            min-height="320"
            :name="god.name"
          />
        </v-col>

        <v-col cols="12" md="7">
          <v-card-text class="pa-6 pa-md-8">
            <p class="text-overline text-primary mb-1">
              {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
            </p>
            <h1 class="text-h3 font-weight-bold mb-4">
              {{ god.name }}
            </h1>
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
            <p class="text-body-1 mb-6">
              {{ god.description }}
            </p>

            <!-- Afficher la résidence, les symboles, les pouvoirs et les récits seulement si ces données existent. -->
            <p v-if="god.abode" class="mb-6">
              <strong>Residence:</strong> {{ god.abode }}
            </p>

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

            <section v-if="god.powers?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Powers</h2>
              <ul class="pl-5">
                <li v-for="power in god.powers" :key="power">{{ power }}</li>
              </ul>
            </section>

            <section v-if="god.stories?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Related stories</h2>
              <ul class="pl-5">
                <li v-for="story in god.stories" :key="story">{{ story }}</li>
              </ul>
            </section>

            <v-divider class="my-5" />

            <!-- L’API fournit les liens familiaux sous forme de listes, affichées ici avec des virgules. -->
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

  const route = useRoute()
  const router = useRouter()
  const { toggleFavorite } = useFavoriteFeedback()
  const godStore = useGodStore()
  // Garder les états de chargement et d’erreur réactifs après extraction du store.
  const { isLoading, hasLoaded, error } = storeToRefs(godStore)

  // Rechercher la fiche correspondant au paramètre [id], y compris si l’URL change sans remonter le composant.
  const god = computed(() => godStore.getGodById(route.params.id))

  // Revenir à la page précédente de l’application, ou à l’accueil après un accès direct.
  function goBack () {
    if (window.history.state?.back) router.back()
    else router.push('/')
  }
</script>
