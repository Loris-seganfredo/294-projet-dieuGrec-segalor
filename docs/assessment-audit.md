# Individual assessment audit

Date: 3 November 2026. Reference: the [teacher's Notion assessment brief](https://tirtho.notion.site/Projet-individuel-valuatif-Application-Vue-3-Vuetify-avec-API-268e74c07f7c80e5822adb530f7a6027), read in full, including the 2026–2027 exceptions and README template.

This assessment is broader than the exercise checklists. The earlier [sequence 1–5 audit](exam-audit.md) did not establish full compliance with this brief. It did not adequately verify contrast, explicit component events or the required documentation structure.

## Findings and corrections

| Finding | Change |
| --- | --- |
| The card used props but performed its own store action; no explicit business emit was demonstrated. | `GodCard` now receives `god` and `isFavorite`, emits `toggle-favorite`, and the pages handle the event. |
| Several orange/gray labels and tonal colors lacked sufficient contrast. | Semantic light/dark theme colors replace the fixed colors, including info/warning/error messages. Subtitle opacity is explicitly set to 1 to avoid double attenuation. |
| Default focus feedback was subtle. | A contrasting 3px keyboard outline is applied to buttons and linked cards; field outlines use the primary color. |
| HTTP pagination and validation lived inside the store. | The dedicated `services/godApi.js` handles requests and returns a complete validated catalog. Pinia retains application state and actions. |
| README structure did not match the seven required sections. | README reorganized into presentation, learning, tools/method, tests, AI use, personal review and references. Unverified personal claims remain explicitly pending. |

## Requirements and evidence

| Assessment requirement | Current evidence | Status |
| --- | --- | --- |
| Vue 3 + Vuetify 3, public HTTPS/JSON API | Dependencies and DIVTEC integration; 51 real entries loaded | Verified |
| List and complete detail view | Reusable cards and `pages/gods/[id].vue` | Verified |
| Relevant search, filter and sort | Case-insensitive name search, category select, alphabetical toggle | Verified |
| Interactive feature with visible state | Heart icon/color, counter, animation and snackbar | Verified |
| Persistence after reload | Favorite IDs serialized in `god_favorites`; real browser reload tested | Verified |
| At least two Vue Router routes | Home, detail, favorites, About and unknown route | Verified |
| Loading, error and empty states | Skeleton/status, retryable error alert, empty catalog/search/favorites messages | Verified |
| User feedback and invalid navigation | Snackbar, storage/network alerts, missing god/page messages | Verified |
| Modular components, clear props/emits | Required card props, declared `toggle-favorite` event, shared image/header/footer | Verified |
| Global state and dedicated API code | Pinia store, Axios client and API service; no global event bus | Verified |
| Responsive layout | One column on mobile, four on desktop, no horizontal overflow in the tested views | Verified |
| Explicit labels and keyboard access | Search/select labels, heart labels and state, image alt text; Tab/Enter/Space tested | Verified |
| Visible keyboard focus | Card/button outline and 2px focused field outline observed | Verified |
| Correct basic contrast | Light/dark text, icon and tonal colors checked; see ratios below | Verified for checked colors |
| Pagination if the list is too large | API pagination is complete; 51 cards use lazy images. Visual pagination is not unconditionally required by the brief. | Appropriate to current data |
| Mock/offline fallback | Explicitly waived for 2026–2027 | Not required this year |
| Weekly milestone branches | Explicitly waived for 2026–2027; `main` is allowed | Not required this year |
| Clean repository and meaningful commits | Existing history preserved; corrections committed by purpose | Verified |
| Public deployment and installation instructions | Vercel/Pages, clone/install/run, `.env.example` and build commands | Verified separately from code |
| Seven-section README, screenshots, references, AI declaration | Technical sections completed and screenshots updated | Present |
| Personal learning path, contributions and reflection | Factual Git chronology, assistance and the student's reason for choosing the subject are documented; learning and contributions remain to be described | Further student input required |
| Weekly teacher meetings | Required by the brief; cannot be proven by the repository | Student confirmation required |
| Oral defense and possible live modification | Topics and a demo sequence are listed below | Must be demonstrated by the student |

## Validation after the corrections

- **13 assertions** passed for the shared favorite action/feedback, including persistence, snackbar restart and removal of the final favorite.
- **39 assertions** passed against the real API-service/store sources with simulated Axios/storage: complete pagination, malformed responses, simultaneous/repeated initialization, a failed second page, preservation of favorites and successful retry.
- In the browser, Tab reached the heart, Enter added a favorite and Space removed it without navigating. Enter on the card opened the correct profile.
- Adding a favorite from the profile, reloading, then removing it from the favorites page worked. The empty state and removal confirmation remained visible.
- The focused search field had a solid 2px primary-colored outline at full opacity. Navigation and favorite buttons showed the explicit 3px outline.
- Both light and dark themes were rendered and inspected. A separate local test configuration forced dark mode without changing the user's system settings or production theme selection.
- The normal application checks produced no application error. An unrelated browser-extension error appeared in one development tab and was distinguished from the application's output.

`npx eslint .` passed without code errors, and `npm run build` successfully transformed 359 modules. The two isolated scripts also passed when rerun after the service extraction (52 assertions in total). Deployment status and public browser checks are recorded in the delivery message rather than inferred from a local build.

### Contrast evidence

The text threshold used is 4.5:1; control boundaries/icons use 3:1. Calculations include Vuetify's 12% tonal overlay. Values below are the lower result on a plain or tonal surface for each theme.

| Color role | Light minimum | Dark minimum |
| --- | ---: | ---: |
| Primary / warning | 5.66:1 | 7.96:1 |
| Secondary | 6.34:1 | 6.93:1 |
| Favorite | 5.36:1 | 5.93:1 |
| Info | 4.85:1 | 7.11:1 |
| Error | 5.83:1 | 7.23:1 |

Subtitle text uses a single medium-emphasis alpha with opacity 1. The resulting contrast is approximately 5.74:1 on white and 8.48:1 on the dark card surface. This is a targeted basic-accessibility review, not a full WCAG certification.

Sources: [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [visible focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

## Personal work still required

On 4 November 2026, the student explained that their preferred themes were no longer available and Greek gods was the last available subject that interested them. This explanation has been added to the README.

The README still needs the student's own learning account and contribution details. No invented authorship percentages or claims of personal understanding have been inserted. The brief permits declared AI help but requires understanding and adaptation of the code.

The stated submission deadline is **Tuesday 10 November 2026 at 23:59**, for code and documentation. Weekly teacher follow-ups and the oral defense are personal obligations, not features the application can implement.

Suggested oral demo: load the catalog; combine category, search and sort; open a profile; add a favorite; reload to show persistence; remove it from Favorites; explain loading/error/empty states. Be prepared to explain props versus emits, Pinia, the API service, computed values, localStorage and `.stop.prevent`, and to make a small live change.
