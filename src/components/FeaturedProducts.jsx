import ProductCard from './ProductCard'

function FeaturedProducts({ products }) {
  if (!products?.length) return null

  return (
    <section className="home-featured">
      <div className="home-featured__header">
        <p className="home-featured__tag">Selección especial</p>
        <h2 className="home-featured__title">Productos destacados</h2>
        <p className="home-featured__text">
          Piezas elegidas por nuestro equipo. Calidad, versatilidad y estilo en
          cada detalle.
        </p>
      </div>
      <div className="home-featured__grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={
              product.highlight
                ? 'home-featured__item home-featured__item--highlight'
                : 'home-featured__item'
            }
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
