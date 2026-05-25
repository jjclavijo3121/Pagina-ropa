import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

function CartDrawer() {
  const { drawerOpen, lastAdded, closeDrawer, totalItems } = useCart()

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen, closeDrawer])

  if (!drawerOpen || !lastAdded) return null

  return (
    <>
      <div
        className="cart-drawer-overlay"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <aside
        className="cart-drawer cart-drawer--open"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="cart-drawer__header">
          <p id="cart-drawer-title" className="cart-drawer__title">
            Añadido a la cesta
          </p>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={closeDrawer}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="cart-drawer__product">
          <div className="cart-drawer__image-wrap">
            {lastAdded.image ? (
              <img src={lastAdded.image} alt={lastAdded.name} />
            ) : (
              <div className="cart-drawer__placeholder" />
            )}
          </div>
          <div className="cart-drawer__info">
            <p className="cart-drawer__category">{lastAdded.category}</p>
            <h2 className="cart-drawer__name">{lastAdded.name}</h2>
            <p className="cart-drawer__meta">
              <span
                className="cart-drawer__color-dot"
                style={{ background: lastAdded.color.hex }}
                aria-hidden="true"
              />
              {lastAdded.color.name}
              {lastAdded.quantity > 1 && ` · Cantidad: ${lastAdded.quantity}`}
            </p>
            <div className="cart-drawer__prices">
              {lastAdded.originalPrice != null && (
                <span className="cart-drawer__price--old">
                  {formatPrice(lastAdded.originalPrice)}
                </span>
              )}
              <span className="cart-drawer__price">
                {formatPrice(lastAdded.price)}
              </span>
            </div>
          </div>
        </div>

        <p className="cart-drawer__summary">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu cesta
        </p>

        <div className="cart-drawer__actions">
          <Link
            to="/carrito"
            className="cart-drawer__btn cart-drawer__btn--primary"
            onClick={closeDrawer}
          >
            Continuar al carrito
          </Link>
          <button
            type="button"
            className="cart-drawer__btn cart-drawer__btn--secondary"
            onClick={closeDrawer}
          >
            Seguir comprando
          </button>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
