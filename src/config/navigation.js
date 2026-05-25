export const NAVBAR_LINKS = [
  { label: 'Colección', path: '/coleccion' },
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Tiendas', path: '/tiendas' },
]

export const MENU_ITEMS = [
  { label: 'Inicio', path: '/' },
  { label: 'Nueva colección', path: '/nueva-coleccion' },
  { label: 'Mujer', path: '/mujer' },
  { label: 'Hombre', path: '/hombre' },
  { label: 'Accesorios', path: '/accesorios' },
  { label: 'Rebajas', path: '/rebajas' },
  { label: 'Contacto', path: '/contacto' },
]

export const PAGE_CONTENT = {
  '/': {
    tag: 'Temporada primavera / verano',
    title: 'Estilo que te acompaña',
    text: 'Descubre piezas pensadas para el día a día: tejidos suaves, cortes atemporales y una paleta que combina con todo tu armario.',
  },
  '/coleccion': {
    tag: 'Colección',
    title: 'Nuestra colección',
    text: 'Prendas seleccionadas para combinar entre sí. Explora looks completos para cada momento.',
  },
  '/nosotros': {
    tag: 'Nosotros',
    title: 'Quiénes somos',
    text: 'ICNT nace con la idea de ofrecer moda accesible sin renunciar a la calidad ni al detalle.',
  },
  '/tiendas': {
    tag: 'Tiendas',
    title: 'Encuéntranos',
    text: 'Visita nuestras tiendas físicas y descubre la experiencia ICNT en persona.',
  },
  '/nueva-coleccion': {
    tag: 'Novedades',
    title: 'Nueva colección',
    text: 'Lo último en tendencias y diseños exclusivos de esta temporada.',
  },
  '/mujer': {
    tag: 'Mujer',
    title: 'Colección mujer',
    text: 'Vestidos, blusas, pantalones y más. Piezas versátiles para tu día a día.',
  },
  '/hombre': {
    tag: 'Hombre',
    title: 'Colección hombre',
    text: 'Camisas, chaquetas y pantalones con cortes modernos y tejidos de calidad.',
  },
  '/accesorios': {
    tag: 'Accesorios',
    title: 'Accesorios',
    text: 'Complementa tu look con bolsos, cinturones, bufandas y más.',
  },
  '/rebajas': {
    tag: 'Rebajas',
    title: 'Rebajas',
    text: 'Aprovecha descuentos en selección de prendas. Ofertas por tiempo limitado.',
  },
  '/contacto': {
    tag: 'Contacto',
    title: 'Contacto',
    text: '¿Tienes dudas? Escríbenos. Estamos aquí para ayudarte con tu pedido o consulta.',
  },
}

export const HOME_HERO = {
  imageAlt: 'Colección primavera verano ICNT',
  images: [
    'https://images.unsplash.com/photo-1483985986645-723ba8dae258?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&h=1080&fit=crop&q=80',
  ],
}

export const HOME_PROMO_BANNER = {
  imageAlt: 'Nueva temporada — moda contemporánea',
  images: [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&h=900&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&h=900&fit=crop&q=80',
    'https://images.unsplash.com/photo-1483985986645-723ba8dae258?w=1920&h=900&fit=crop&q=80',
  ],
}
