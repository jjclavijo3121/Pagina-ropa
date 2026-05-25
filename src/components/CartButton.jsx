import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link
      to="/carrito"
      className="cart-btn"
      aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} artículos` : ''}`}
    >
      <svg
        className="cart-btn__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M6 6h15l-1.5 9h-12L6 6z" />
        <path d="M6 6L5 3H2" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      {totalItems > 0 && (
        <span className="cart-btn__badge" aria-hidden="true">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartButton
