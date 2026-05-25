import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getDisplayPrice } from '../utils/formatPrice'

const STORAGE_KEY = 'icnt-cart'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function buildCartKey(productId, colorId) {
  return `${productId}-${colorId}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    saveCart(items)
  }, [items])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const closeDrawer = () => setDrawerOpen(false)

  const addToCart = (product, color, quantity = 1, { openDrawer = false } = {}) => {
    const unitPrice = getDisplayPrice(product)
    const cartKey = buildCartKey(product.id, color.id)
    let addedSnapshot = null

    setItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey)
      if (existing) {
        addedSnapshot = {
          ...existing,
          quantity: existing.quantity + quantity,
        }
        return prev.map((item) =>
          item.cartKey === cartKey ? addedSnapshot : item,
        )
      }
      addedSnapshot = {
        cartKey,
        productId: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        color: { id: color.id, name: color.name, hex: color.hex },
        price: unitPrice,
        originalPrice: product.salePrice ? product.price : null,
        quantity,
      }
      return [...prev, addedSnapshot]
    })

    if (openDrawer && addedSnapshot) {
      setLastAdded(addedSnapshot)
      setDrawerOpen(true)
    }
  }

  const removeFromCart = (cartKey) => {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartKey)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      drawerOpen,
      lastAdded,
      closeDrawer,
    }),
    [items, subtotal, totalItems, drawerOpen, lastAdded],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
