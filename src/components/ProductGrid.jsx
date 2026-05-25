import ProductCard from './ProductCard'

function ProductGrid({ title = 'Productos', products }) {
  if (!products?.length) return null

  return (
    <section className="products">
      <h2 className="products__title">{title}</h2>
      <div className="products__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
