// Cette illustration locale montre un temple et sert quand un portrait est indisponible.
import defaultGodImage from '@/assets/god-placeholder.svg'

// Transformer la valeur reçue de l’API en une adresse que le navigateur peut ouvrir.
export function godImageUrl (image) {
  // Si l’API ne donne pas de portrait, utiliser directement l’illustration du temple.
  if (!image) {
    return defaultGodImage
  }
  try {
    // Si image contient seulement un chemin, ajouter le nom du site de l’API. Une adresse complète est déjà utilisable.
    return new URL(image, 'https://apis.divtec.me').toString()
  // Si l’adresse ne peut pas être construite, utiliser l’illustration du temple.
  } catch {
    return defaultGodImage
  }
}
// Rendre aussi l’illustration disponible au composant qui détecte les erreurs de chargement.
export { default as defaultGodImage } from '@/assets/god-placeholder.svg'
