import defaultGodImage from '@/assets/god-placeholder.svg'

export function godImageUrl (image) {
  if (!image) {
    return defaultGodImage
  }
  try {
    return new URL(image, 'https://apis.divtec.me').toString()
  } catch {
    return defaultGodImage
  }
}
export { default as defaultGodImage } from '@/assets/god-placeholder.svg'
