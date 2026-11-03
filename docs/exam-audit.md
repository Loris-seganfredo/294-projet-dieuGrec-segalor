# Sequence 1–5 audit

Date: 3 November 2026. Scope: the current DEV JS exercise, steps **1–17**, adapted to the Greek Gods project. The complete articles, tasks, tests and personal-project checklists were read. Later sequences are excluded at the student's request.

Result: no missing functional criterion was found in this scope. One ESLint formatting error in `AppHeader.vue` was corrected. The README was completed with screenshots, purpose, actual API endpoints, data flow, limitations and an honest assistance statement.

## Sources and limits

- [Sequence 1 recap](https://devjs.ch/exercices/pokedex-vuetify/e5.html), covering steps 1–5.
- [Sequence 2 recap](https://devjs.ch/exercices/pokedex-vuetify/e8.html), covering steps 6–8.
- [Sequence 3 recap](https://devjs.ch/exercices/pokedex-vuetify/e11.html), covering steps 9–11.
- [Sequence 4 recap](https://devjs.ch/exercices/pokedex-vuetify/e14.html), covering steps 12–14.
- [Sequence 5 recap](https://devjs.ch/exercices/pokedex-vuetify/e17.html), covering steps 15–17.

The original project ZIP also contains a README template. Its factual documentation sections were compared with the current README. No separate teacher-issued exam rubric was found locally. A general C141 assessment linked from the course is not treated as proof of this project's exact marking scheme. This audit verifies the supplied scope; it is not a guaranteed grade or a claim of the student's oral proficiency.

## Criterion-to-code checklist

| Steps | Criterion | Implementation | Result |
| --- | --- | --- | --- |
| 1–5 | Real API data, keyed list and responsive cards | `godStore.js`, `pages/index.vue` | Pass |
| 1–5 | Image, name and secondary information | `GodCard.vue`: portrait, name, category and origin | Pass |
| 1–5 | Reusable card with required object prop | `GodCard.vue`, used by home and favorites | Pass |
| 1–5 | At least three application components | `GodCard`, `GodImage`, `AppHeader`, `AppFooter` | Pass |
| 1–5 | Footer with current year and customizable slot | `AppFooter.vue`, `layouts/default.vue` | Pass |
| 1–5 | At least three pages and SPA navigation | Home, About, Favorites, dynamic god profile | Pass |
| 1–5 | Dynamic ID, detail fields, return navigation | `pages/gods/[id].vue`, `useRoute`, store getter | Pass |
| 1–5 | Unknown item and unknown route handled | Detail alert and `pages/[...path].vue` | Pass |
| 6–8 | Options-style Pinia store with state/getters/actions | `stores/godStore.js` | Pass |
| 6–8 | Simple and parameterized getters | `totalGods`, `getGodById` | Pass |
| 6–8 | One initialization and reactive page bindings | `App.vue`, `init`, `storeToRefs`, computed profile | Pass |
| 6–8 | Complete data shared without local page fetches | All API pages loaded in store | Pass |
| 9–11 | Shared Axios client and configured environment URL | `plugins/axios.js`, `.env.example` | Pass |
| 9–11 | Local environment excluded from Git | `.gitignore`, tracked `.env.example` | Pass |
| 9–11 | Loading, errors and successful list are distinct | Skeletons, alerts and retry; no partial catalog published | Pass |
| 12–14 | Clearable name input with `v-model` | `pages/index.vue` | Pass |
| 12–14 | Case-insensitive substring computed | `filteredBySearch` | Pass |
| 12–14 | Clearable category select with `v-model` | `selectedCategory`, `filteredByCategory` | Pass |
| 12–14 | A–Z/Z–A toggle and linguistic comparison | `sortOrder`, `localeCompare`, copied array | Pass |
| 12–14 | Chained computed values and unchanged source | Category → search → sort → `v-for` | Pass |
| 12–14 | No-results message | Conditional informational alert | Pass |
| 15–17 | Favorite IDs and count in store | `favorites`, `totalFavorites` | Pass |
| 15–17 | Toggle, save, restore and cleanup actions | `godStore.js` | Pass |
| 15–17 | Parameterized status getter and full-object getter | `isFavorite`, `getFavorites` discards unknown IDs | Pass |
| 15–17 | JSON/localStorage persistence, restored in init | `god_favorites`; cleanup after a complete API load | Pass |
| 15–17 | Heart changes appearance without opening profile | Reactive icon/color and `@click.stop.prevent` | Pass |
| 15–17 | Heart animation and two-second confirmation | `favorites.scss`, shared snackbar in layout | Pass |
| 15–17 | Dedicated favorites page and empty state | `pages/favorites.vue`, shared `GodCard` | Pass |
| All | English UI, title, favicon and personalized footer | Page templates, `index.html`, `favicon.svg` | Pass |
| All | Regular commits and published application | Existing Git history, GitHub Pages and Vercel | Verified separately from code |

## Verification evidence

### Logic

29 isolated checks passed using the actual store and page script with real Pinia/Vue reactivity and simulated API/storage, without modifying browser preferences or the public API:

- 17 store checks: ID restoration and validation, duplicates, getters, toggle/save, a new store instance, obsolete IDs, malformed storage, unavailable storage, interrupted pagination, retry and repeated/concurrent initialization.
- 12 computed checks: case variants, substring matching, empty/null/whitespace input, category matching, combined search and category, both sort directions, no results, resetting filters and unchanged source data/order.
- A failed second API page preserved saved favorites and did not publish an incomplete list. A later successful load removed obsolete IDs only after the complete catalog was available.

### Browser

- The real API loaded 51 gods. `ZEU` and `zeu` both found Zeus. An unmatched query displayed the empty-results message.
- Clearing search, filtering Goddess, sorting descending and combining Goddess with `ATH` produced the expected results, including Athena alone for the combined query.
- Clicking Athena's heart kept the home URL unchanged. Clicking its card opened the detail page.
- Reloading the detail page preserved the favorite. Removing the last favorite from its page showed the empty-state message and removal confirmation.
- About, unknown god ID and unknown route displayed their expected content.
- A separate local test server delayed a request, returned a deliberate HTTP 503, then succeeded. Eight loading skeletons appeared, followed by the error message; **Try again** restored the list.
- At a 390-pixel requested viewport, the content was one column with no horizontal overflow. At a 1440-pixel viewport, four cards shared a row, also without horizontal overflow. See the [desktop](screenshots/home-desktop.png) and [mobile](screenshots/home-mobile.png) captures.
- No warning or error was recorded in the normal real-API browser checks. The deliberately simulated HTTP error is expected in its separate test tab.

The previously added image fallback was also checked with absent and invalid image URLs, and on the public home/detail pages. A valid portrait remains visible normally.

### Build and publication

`npx eslint .` and `npm run build` both passed after the formatting correction. ESLint printed an advisory about the age of its browser-baseline metadata; it reported no code errors. The production build transformed 358 modules successfully. The audit's final delivery also checks Git synchronization and deployment status; deployment success alone is not a browser test.

## Code review assessment

| Dimension | Assessment for this scope | Evidence |
| --- | --- | --- |
| Correctness | Pass | The computed chain and store checks passed; real navigation and persistence were exercised. |
| Maintainability | Good | Shared `GodCard`/`GodImage`, one Axios client and a single store; the lint issue is fixed. |
| Performance | Appropriate for the observed catalog | Initialization is guarded, computed results are cached, and profiles reuse the loaded data. This is not a load test. |
| Security | No blocking issue found in this review | `.env` is ignored, the public API needs no secret, and descriptions render as Vue text interpolation. This is not a penetration test. |

## Course adaptations

The course progressively replaces page-local `fetch()` with Pinia and then Axios. Keeping every earlier implementation would introduce duplicate requests. Greek categories already occur in each API object, so a second category endpoint is unnecessary. Names and navigation are English at the student's request.

The current steps 10–11 require loading/error feedback and the real API. They do not require an automatic mock catalog, despite an older menu/template mentioning mocks. No fake catalog was added to production.

## Oral preparation and personal evidence

The student must be able to explain, using their own code:

1. Props, slots and why `GodCard` is reused.
2. `useRoute()` versus `useRouter()` and how a route ID finds a god.
3. Pinia state, getters, actions and why destructuring uses `storeToRefs()`.
4. Axios configuration, environment variables and loading/error handling.
5. `v-model`, computed caching and the category → search → sort chain.
6. Why `[...array].sort()` preserves the source array.
7. Why favorites store IDs, how JSON persistence works and its browser-only limits.
8. Why `.stop` and `.prevent` are both used on a heart inside a linked card.
9. What happens to an obsolete favorite or an API failure.

Any requested personal learning report or percentage of independent work must be completed truthfully by the student. Passing tests does not establish those facts.
