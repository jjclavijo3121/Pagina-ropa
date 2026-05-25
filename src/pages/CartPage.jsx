import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <p className="cart__tag">Tu cesta</p>
        <h1 className="cart__title">La cesta está vacía</h1>
        <p className="cart__text">
          Explora nuestra colección y encuentra piezas que combinen contigo.
        </p>
        <Link to="/coleccion" className="cart__cta">
          Ver colección
        </Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <header className="cart__header">
        <div>
          <p className="cart__tag">Tu cesta</p>
          <h1 className="cart__title">
            {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
          </h1>
        </div>
        <button type="button" className="cart__clear" onClick={clearCart}>
          Vaciar cesta
        </button>
      </header>

      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.cartKey} className="cart-item">
            <Link
              to={`/producto/${item.productId}`}
              className="cart-item__image-wrap"
            >
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="cart-item__placeholder" />
              )}
            </Link>

            <div className="cart-item__info">
              <Link
                to={`/producto/${item.productId}`}
                className="cart-item__name"
              >
                {item.name}
              </Link>
              <p className="cart-item__meta">
                {item.category} ·{' '}
                <span
                  className="cart-item__color-dot"
                  style={{ background: item.color.hex }}
                  aria-hidden="true"
                />{' '}
                {item.color.name}
              </p>
              <div className="cart-item__prices">
                {item.originalPrice != null && (
                  <span className="cart-item__price--old">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
                <span className="cart-item__price">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>

            <div className="cart-item__actions">
              <div className="cart-item__qty">
                <button
                  type="button"
                  aria-label="Reducir cantidad"
                  onClick={() =>
                    updateQuantity(item.cartKey, item.quantity - 1)
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() =>
                    updateQuantity(item.cartKey, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <p className="cart-item__line-total">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                type="button"
                className="cart-item__remove"
                onClick={() => removeFromCart(item.cartKey)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="cart__summary">
        <div className="cart__summary-row">
          <span>Subtotal</span>
          <span className="cart__summary-total">{formatPrice(subtotal)}</span>
        </div>
        <p className="cart__summary-note">
          Envío e impuestos calculados en el siguiente paso.
        </p>
        <button type="button" className="cart__checkout">
          Finalizar compra
        </button>
        <Link to="/coleccion" className="cart__continue">
          Seguir comprando
        </Link>
      </aside>
    </div>
  )
}

export default CartPage
