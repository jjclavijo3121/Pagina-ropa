import { Router } from 'express'

export const ordersRouter = Router()

/**
 * POST /api/pedidos
 * Recibe la cesta del frontend (por ahora solo la guardamos en memoria/log).
 * Más adelante: base de datos, email, pasarela de pago...
 */
const pedidosRecientes = []

ordersRouter.post('/', (req, res) => {
  const { items, email, nombre } = req.body ?? {}

  if (!items?.length) {
    return res.status(400).json({ error: 'La cesta está vacía' })
  }

  const pedido = {
    id: `pedido-${Date.now()}`,
    creadoEn: new Date().toISOString(),
    email: email ?? null,
    nombre: nombre ?? null,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    estado: 'recibido',
  }

  pedidosRecientes.push(pedido)
  if (pedidosRecientes.length > 50) pedidosRecientes.shift()

  res.status(201).json({
    mensaje: 'Pedido recibido correctamente',
    pedido,
  })
})

/** Solo para desarrollo: ver últimos pedidos */
ordersRouter.get('/', (_req, res) => {
  res.json({ pedidos: pedidosRecientes })
})
