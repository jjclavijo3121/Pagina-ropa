import { Link } from 'react-router-dom'
import ProductGrid from './ProductGrid'

const PRODUCT_SECTION_TITLES = {
  '/coleccion': 'Colección',
  '/nueva-coleccion': 'Novedades',
  '/mujer': 'Mujer',
  '/hombre': 'Hombre',
  '/accesorios': 'Accesorios',
  '/rebajas': 'En rebaja',
}

function PageContent({
  tag,
  title,
  text,
  path = '/',
  products = [],
  showCta = false,
}) {
  const sectionTitle = PRODUCT_SECTION_TITLES[path] ?? 'Productos'
  const hasProducts = products.length > 0

  return (
    <>
      <section className={`hero ${hasProducts ? 'hero--compact' : ''}`}>
        <p className="hero__tag">{tag}</p>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__text">{text}</p>
        {showCta && (
          <Link to="/coleccion" className="hero__cta">
            Ver colección
          </Link>
        )}
      </section>

      {hasProducts && (
        <ProductGrid title={sectionTitle} products={products} />
      )}
    </>
  )
}

export default PageContent
