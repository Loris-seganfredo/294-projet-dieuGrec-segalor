// L’image de secours montre un temple quand un portrait manque ou ne se charge pas.
import defaultGodImage from '@/assets/god-placeholder.svg'

// Préparer l’adresse du portrait. Si elle manque ou si elle est invalide, afficher l’image de secours.
export function godImageUrl (image) {
  if (!image) {
    return defaultGodImage
  }
  // Ajouter l’adresse du site de l’API si l’image n’est donnée que par un chemin.
  try {
    return new URL(image, 'https://apis.divtec.me').toString()
  } catch {
    return defaultGodImage
  }
}
export { default as defaultGodImage } from '@/assets/god-placeholder.svg'
