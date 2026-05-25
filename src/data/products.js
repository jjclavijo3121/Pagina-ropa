const CATEGORY_IMAGES = {
  Camisas: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2b?w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3e9f?w=800&q=80',
    'https://images.unsplash.com/photo-1603252109303-7b156c752c69?w=800&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50e0a8e0a?w=800&q=80',
  ],
  Pantalones: [
    'https://images.unsplash.com/photo-1473966962630-3001d0b6bf56?w=800&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
  ],
  Vestidos: [
    'https://images.unsplash.com/photo-1595777453310-574e264352b9?w=800&q=80',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
    'https://images.unsplash.com/photo-1496747618816-588826e65bf8?w=800&q=80',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  ],
  Abrigos: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1617137968427-85924c400a63?w=800&q=80',
    'https://images.unsplash.com/photo-1591046882247-3d5f1f2b3c0e?w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    'https://images.unsplash.com/photo-1469334031218-e042a509e5fe?w=800&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c790?w=800&q=80',
  ],
}

const DEFAULT_COLORS = [
  { id: 'arena', name: 'Arena', hex: '#e8e0d6' },
  { id: 'carbon', name: 'Carbón', hex: '#1a1614' },
  { id: 'terracota', name: 'Terracota', hex: '#b85c4a' },
  { id: 'oliva', name: 'Oliva', hex: '#6b7355' },
]

function getCategoryImages(category) {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.default
}

function enrichProduct(product, collectionPath) {
  const gallery = product.images ?? getCategoryImages(product.category)
  const image = product.image ?? gallery[0]

  return {
    ...product,
    collectionPath,
    image,
    images: gallery,
    colors: product.colors ?? DEFAULT_COLORS,
    description:
      product.description ??
      `${product.name} de la colección ICNT. Confección cuidada, tejido de calidad y un corte pensado para el uso diario. Disponible en varios colores. Composición premium; consulta la etiqueta del producto para el detalle exacto.`,
    details: product.details ?? [
      'Tejido transpirable',
      'Corte regular',
      'Lavado a máquina 30°',
      'Fabricado con estándares de calidad ICNT',
    ],
  }
}

export const FEATURED_PRODUCTS = [
  enrichProduct(
    {
      id: 'f1',
      name: 'Vestido midi lino',
      category: 'Vestidos',
      price: 89.99,
      highlight: true,
      image:
        'https://images.unsplash.com/photo-1595777453310-574e264352b9?w=600&h=750&fit=crop&q=80',
    },
    '/',
  ),
  enrichProduct(
    {
      id: 'f2',
      name: 'Blazer ligero carbón',
      category: 'Abrigos',
      price: 129.99,
      image:
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&q=80',
    },
    '/',
  ),
  enrichProduct(
    {
      id: 'f3',
      name: 'Camisa oxford blanca',
      category: 'Camisas',
      price: 49.99,
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2b?w=600&h=750&fit=crop&q=80',
    },
    '/',
  ),
]

export const SALES_PATHS = new Set([
  '/coleccion',
  '/nueva-coleccion',
  '/mujer',
  '/hombre',
  '/accesorios',
  '/rebajas',
])

export function isSalesPath(pathname) {
  return SALES_PATHS.has(pathname)
}

const productsByPath = {
  '/coleccion': [
    { id: 'c1', name: 'Camisa popelín azul', category: 'Camisas', price: 54.99 },
    { id: 'c2', name: 'Pantalón wide leg', category: 'Pantalones', price: 74.99 },
    { id: 'c3', name: 'Falda plisada oliva', category: 'Faldas', price: 64.99 },
    { id: 'c4', name: 'Chaqueta bomber arena', category: 'Abrigos', price: 119.99 },
    { id: 'c5', name: 'Top seda terracota', category: 'Tops', price: 44.99 },
    { id: 'c6', name: 'Pantalón cargo negro', category: 'Pantalones', price: 79.99 },
  ],
  '/nueva-coleccion': [
    { id: 'n1', name: 'Vestido fluido primavera', category: 'Vestidos', price: 99.99 },
    { id: 'n2', name: 'Camisa manga corta rayas', category: 'Camisas', price: 49.99 },
    { id: 'n3', name: 'Short lino natural', category: 'Shorts', price: 39.99 },
    { id: 'n4', name: 'Blusa volantes crema', category: 'Blusas', price: 59.99 },
    { id: 'n5', name: 'Americana sin forro', category: 'Abrigos', price: 139.99 },
    { id: 'n6', name: 'Sandalias piel trenzada', category: 'Calzado', price: 69.99 },
  ],
  '/mujer': [
    { id: 'm1', name: 'Vestido lino arena', category: 'Vestidos', price: 89.99 },
    { id: 'm2', name: 'Blusa satén marfil', category: 'Blusas', price: 54.99 },
    { id: 'm3', name: 'Pantalón pinza alto', category: 'Pantalones', price: 74.99 },
    { id: 'm4', name: 'Falda midi satinada', category: 'Faldas', price: 64.99 },
    { id: 'm5', name: 'Chaqueta tweed', category: 'Abrigos', price: 149.99 },
    { id: 'm6', name: 'Top canalé terracota', category: 'Tops', price: 34.99 },
    { id: 'm7', name: 'Pantalón palazzo', category: 'Pantalones', price: 69.99 },
    { id: 'm8', name: 'Cardigan largo', category: 'Jerseys', price: 79.99 },
  ],
  '/hombre': [
    { id: 'b1', name: 'Camisa lino celeste', category: 'Camisas', price: 59.99 },
    { id: 'b2', name: 'Pantalón chino navy', category: 'Pantalones', price: 69.99 },
    { id: 'b3', name: 'Polo piqué carbón', category: 'Polos', price: 39.99 },
    { id: 'b4', name: 'Americana lino', category: 'Abrigos', price: 159.99 },
    { id: 'b5', name: 'Jersey cuello redondo', category: 'Jerseys', price: 49.99 },
    { id: 'b6', name: 'Pantalón denim oscuro', category: 'Pantalones', price: 79.99 },
    { id: 'b7', name: 'Camisa denim oversize', category: 'Camisas', price: 64.99 },
    { id: 'b8', name: 'Cazadora serraje', category: 'Abrigos', price: 189.99 },
  ],
  '/accesorios': [
    { id: 'a1', name: 'Bolso bandolera cuero', category: 'Bolsos', price: 89.99 },
    { id: 'a2', name: 'Cinturón piel trenzado', category: 'Cinturones', price: 34.99 },
    { id: 'a3', name: 'Bufanda lana merino', category: 'Bufandas', price: 49.99 },
    { id: 'a4', name: 'Gorra lino', category: 'Sombreros', price: 29.99 },
    { id: 'a5', name: 'Mochila canvas', category: 'Bolsos', price: 59.99 },
    { id: 'a6', name: 'Pañuelo seda estampado', category: 'Pañuelos', price: 24.99 },
  ],
  '/rebajas': [
    { id: 'r1', name: 'Vestido midi lino', category: 'Vestidos', price: 89.99, salePrice: 59.99 },
    { id: 'r2', name: 'Camisa oxford blanca', category: 'Camisas', price: 49.99, salePrice: 34.99 },
    { id: 'r3', name: 'Pantalón chino beige', category: 'Pantalones', price: 69.99, salePrice: 44.99 },
    { id: 'r4', name: 'Blazer ligero carbón', category: 'Abrigos', price: 129.99, salePrice: 89.99 },
    { id: 'r5', name: 'Bolso tote cuero', category: 'Accesorios', price: 79.99, salePrice: 54.99 },
    { id: 'r6', name: 'Jersey punto fino', category: 'Jerseys', price: 59.99, salePrice: 39.99 },
  ],
}

const catalogMap = new Map()

FEATURED_PRODUCTS.forEach((p) => catalogMap.set(p.id, p))

Object.entries(productsByPath).forEach(([path, items]) => {
  items.forEach((item) => {
    if (!catalogMap.has(item.id)) {
      catalogMap.set(item.id, enrichProduct(item, path))
    }
  })
})

export function getProductsByPath(pathname) {
  const items = productsByPath[pathname] ?? []
  return items.map(
    (item) => catalogMap.get(item.id) ?? enrichProduct(item, pathname),
  )
}

export function getProductById(id) {
  return catalogMap.get(id) ?? null
}
