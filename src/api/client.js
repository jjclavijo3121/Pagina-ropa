/**
 * Cliente HTTP del frontend → backend ICNT
 * En desarrollo, Vite redirige /api → http://localhost:3001
 */
const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error ?? 'Error en la petición al servidor')
  }

  return data
}

export function checkApiHealth() {
  return request('/health')
}

export function fetchProducts(seccion) {
  const query = seccion ? `?seccion=${encodeURIComponent(seccion)}` : ''
  return request(`/productos${query}`)
}

export function fetchProductById(id) {
  return request(`/productos/${id}`)
}

export function createOrder({ items, email, nombre }) {
  return request('/pedidos', {
    method: 'POST',
    body: JSON.stringify({ items, email, nombre }),
  })
}
