import defaultGodImage from '@/assets/god-placeholder.svg'

// Fournir une source d’image exploitable, avec une illustration locale par défaut.
export function godImageUrl (image) {
  if (!image) {
    return defaultGodImage
  }
  try {
    // Une URL absolue reste utilisable et un chemin relatif est rattaché au domaine de l’API.
    return new URL(image, 'https://apis.divtec.me').toString()
  } catch {
    return defaultGodImage
  }
}
export { default as defaultGodImage } from '@/assets/god-placeholder.svg'
