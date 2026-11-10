<template>
  <!-- Fiche d’une divinité. Le numéro dans l’adresse indique quelle fiche ouvrir. -->
  <v-container class="py-8">
    <!-- La flèche « Back » appelle goBack pour revenir à la page précédente ou à l’accueil. -->
    <v-btn
      class="mb-4"
      prepend-icon="mdi-arrow-left"
      variant="text"
      @click="goBack"
    >
      Back
    </v-btn>

    <!-- Afficher une barre tant que les fiches sont en train d’arriver. -->
    <!-- On attend de connaître le catalogue avant de dire que le numéro demandé est inconnu. -->
    <v-progress-linear
      v-if="isLoading || (!error && !hasLoaded)"
      aria-label="Loading god profile"
      class="mb-6"
      color="primary"
      indeterminate
    />

    <!-- Si le catalogue n’a pas pu être chargé, montrer l’erreur et proposer une nouvelle tentative. -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
    >
      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <!-- Les doubles accolades affichent le texte d’erreur reçu du store. -->
        <span>{{ error }}</span>
        <!-- Cliquer sur « Try again » rappelle init pour demander à nouveau les fiches. -->
        <v-btn
          :loading="isLoading"
          variant="text"
          @click="godStore.init()"
        >
          Try again
        </v-btn>
      </div>
    </v-alert>

    <!-- Le chargement a réussi, mais aucune fiche ne porte le numéro demandé. -->
    <v-alert
      v-else-if="!god"
      type="warning"
      variant="tonal"
    >
      This god could not be found.
    </v-alert>

    <!-- Si la fiche est trouvée, afficher l’image et les informations dans une grande carte. -->
    <v-card
      v-else
      class="overflow-hidden"
      rounded="lg"
    >
      <!-- Mettre les deux colonnes côte à côte sur un écran assez large, sans espace entre elles. -->
      <v-row no-gutters>
        <!-- La photo prend toute la largeur sur mobile et 5 parts sur 12 à partir d’un écran moyen. -->
        <v-col
          cols="12"
          md="5"
        >
          <!-- Passer le portrait et le nom à GodImage. Le composant gère aussi les portraits manquants. -->
          <GodImage
            height="100%"
            :image="god.image"
            min-height="320"
            :name="god.name"
          />
        </v-col>

        <!-- Les informations prennent les 7 parts restantes sur écran moyen. Sur mobile, elles passent sous l’image. -->
        <v-col cols="12" md="7">
          <v-card-text class="pa-6 pa-md-8">
            <!-- Afficher la catégorie et ajouter l’origine seulement si elle existe. -->
            <p class="text-overline text-primary mb-1">
              {{ god.category }}<span v-if="god.origin"> · {{ god.origin }}</span>
            </p>
            <!-- Utiliser le nom de la divinité comme titre de la fiche. -->
            <h1 class="text-h3 font-weight-bold mb-4">
              {{ god.name }}
            </h1>
            <!-- Le bouton change de texte et d’icône selon que la fiche est déjà en favori. -->
            <!-- aria-pressed annonce cet état aux personnes qui utilisent un lecteur d’écran. -->
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
            <!-- Afficher la description fournie par l’API. -->
            <p class="text-body-1 mb-6">
              {{ god.description }}
            </p>

            <!-- La résidence est une information facultative. v-if cache ce bloc si elle manque. -->
            <p v-if="god.abode" class="mb-6">
              <strong>Residence:</strong> {{ god.abode }}
            </p>

            <!-- Afficher la section des symboles si la liste existe et contient au moins un élément. -->
            <section v-if="god.symbols?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Symbols</h2>
              <div class="d-flex flex-wrap ga-2">
                <!-- v-for crée une petite étiquette pour chaque symbole. :key aide Vue à les reconnaître. -->
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

            <!-- Afficher les pouvoirs sous forme de liste, seulement s’il y en a. -->
            <section v-if="god.powers?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Powers</h2>
              <ul class="pl-5">
                <!-- Créer une ligne de liste pour chaque pouvoir reçu. -->
                <li v-for="power in god.powers" :key="power">{{ power }}</li>
              </ul>
            </section>

            <!-- Afficher les récits sous forme de liste, seulement s’il y en a. -->
            <section v-if="god.stories?.length" class="mb-6">
              <h2 class="text-h6 mb-2">Related stories</h2>
              <ul class="pl-5">
                <!-- Créer une ligne de liste pour chaque récit reçu. -->
                <li v-for="story in god.stories" :key="story">{{ story }}</li>
              </ul>
            </section>

            <!-- Ajouter une ligne pour séparer la famille du reste de la fiche. -->
            <v-divider class="my-5" />

            <!-- Chaque groupe de la famille apparaît seulement si l’API fournit des noms. -->
            <div class="d-flex flex-wrap ga-6">
              <!-- Afficher les parents. join met les noms sur une ligne et ajoute une virgule entre eux. -->
              <div v-if="god.parents?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Parents</h2>
                <p>{{ god.parents.join(', ') }}</p>
              </div>
              <!-- Afficher les frères et sœurs de la même façon. -->
              <div v-if="god.siblings?.length">
                <h2 class="text-subtitle-1 font-weight-bold">Siblings</h2>
                <p>{{ god.siblings.join(', ') }}</p>
              </div>
              <!-- Afficher les conjoints de la même façon. -->
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
  // storeToRefs garde les informations du store à jour même quand on les lit séparément.
  import { storeToRefs } from 'pinia'
  // computed recalcule une valeur automatiquement quand ce qu’elle utilise change.
  import { computed } from 'vue'
  // useRoute lit l’adresse actuelle. useRouter permet de changer de page.
  import { useRoute, useRouter } from 'vue-router'
  // Réutiliser le composant qui affiche les portraits des divinités.
  import GodImage from '@/components/GodImage.vue'
  // Réutiliser l’action des favoris et le message après un clic.
  import { useFavoriteFeedback } from '@/composables/favoriteFeedback'
  // Accéder à la mémoire partagée du catalogue et des favoris.
  import { useGodStore } from '@/stores/godStore'

  // Lire les informations de la page actuelle, dont le numéro dans son adresse.
  const route = useRoute()
  // Récupérer l’outil utilisé par le bouton de retour.
  const router = useRouter()
  // Récupérer la fonction appelée par le cœur de cette fiche.
  const { toggleFavorite } = useFavoriteFeedback()
  // Ouvrir le store pour y retrouver les divinités.
  const godStore = useGodStore()
  // Prendre les informations qui indiquent si la liste charge, est prête ou a échoué.
  const { isLoading, hasLoaded, error } = storeToRefs(godStore)

  // route.params.id est le numéro dans l’adresse. Dans /gods/1, c’est « 1 ».
  // computed retrouve la bonne fiche quand ce numéro ou la liste des divinités change.
  const god = computed(() => godStore.getGodById(route.params.id))

  // Cette fonction est lancée quand on clique sur le bouton « Back ».
  function goBack () {
    // Si le routeur connaît une page précédente, revenir à cette page.
    if (window.history.state?.back) router.back()
    // Si la fiche a été ouverte directement, aller à l’accueil.
    else router.push('/')
  }
</script>
