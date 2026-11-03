export function godImageUrl (image) {
  return new URL(image, 'https://apis.divtec.me').toString()
}
