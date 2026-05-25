import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

function HomeCollectionSection({
  title,
  subtitle,
  products,
  viewAllPath,
  viewAllLabel = 'Ver colección',
}) {
  if (!products?.length) return null

  return (
    <section className="home-collection">
      <div className="home-collection__header">
        <h2 className="home-collection__title">{title}</h2>
        {subtitle && <p className="home-collection__text">{subtitle}</p>}
        <Link to={viewAllPath} className="home-collection__link">
          {viewAllLabel}
        </Link>
      </div>
      <div className="home-collection__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default HomeCollectionSection
