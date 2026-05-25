export function formatPrice(value) {
  return `${value.toFixed(2).replace('.', ',')} €`
}

export function getDisplayPrice(product) {
  return product.salePrice ?? product.price
}
