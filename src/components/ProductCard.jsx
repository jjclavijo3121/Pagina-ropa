import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

function ProductCard({ product }) {
  const onSale = product.salePrice != null
  const displayPrice = onSale ? product.salePrice : product.price

  return (
    <Link to={`/producto/${product.id}`} className="product-card">
      <div className="product-card__image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        ) : null}
        {onSale && <span className="product-card__badge">Rebaja</span>}
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__prices">
          {onSale && (
            <span className="product-card__price--old">
              {formatPrice(product.price)}
            </span>
          )}
          <span className="product-card__price">{formatPrice(displayPrice)}</span>
        </div>
        <span className="product-card__btn">Ver detalle</span>
      </div>
    </Link>
  )
}

export default ProductCard
