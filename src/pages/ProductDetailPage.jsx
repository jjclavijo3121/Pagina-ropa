import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductById } from '../data/products'
import { formatPrice, getDisplayPrice } from '../utils/formatPrice'

function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = getProductById(id)
  const [selectedColor, setSelectedColor] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="product-detail product-detail--empty">
        <h1>Producto no encontrado</h1>
        <p>El artículo que buscas no está disponible.</p>
        <Link to="/" className="product-detail__back">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const color = selectedColor ?? product.colors[0]
  const onSale = product.salePrice != null
  const displayPrice = getDisplayPrice(product)
  const mainImage = product.images[activeImage] ?? product.image

  const handleAddToCart = () => {
    addToCart(product, color, 1, { openDrawer: true })
  }

  return (
    <div className="product-detail">
      <nav className="product-detail__breadcrumb" aria-label="Migas de pan">
        <Link to={product.collectionPath ?? '/coleccion'}>← Volver</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <figure className="product-detail__main-frame">
            <img src={mainImage} alt={`${product.name} — ${color.name}`} />
          </figure>
          <div className="product-detail__thumbs" role="list">
            {product.images.map((src, index) => (
              <button
                key={src}
                type="button"
                role="listitem"
                className={
                  activeImage === index
                    ? 'product-detail__thumb product-detail__thumb--active'
                    : 'product-detail__thumb'
                }
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagen ${index + 1}`}
                aria-current={activeImage === index ? 'true' : undefined}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <p className="product-detail__category">{product.category}</p>
          <h1 className="product-detail__title">{product.name}</h1>

          <div className="product-detail__prices">
            {onSale && (
              <span className="product-detail__price--old">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="product-detail__price">
              {formatPrice(displayPrice)}
            </span>
            {onSale && <span className="product-detail__sale-tag">Rebaja</span>}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__colors">
            <p className="product-detail__label">
              Color: <strong>{color.name}</strong>
            </p>
            <div
              className="product-detail__swatches"
              role="radiogroup"
              aria-label="Elegir color"
            >
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={color.id === c.id}
                  aria-label={c.name}
                  className={
                    color.id === c.id
                      ? 'product-detail__swatch product-detail__swatch--active'
                      : 'product-detail__swatch'
                  }
                  style={{ '--swatch-color': c.hex }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          </div>

          <ul className="product-detail__details">
            {product.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button
            type="button"
            className="product-detail__cta"
            onClick={handleAddToCart}
          >
            Añadir a la cesta
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
