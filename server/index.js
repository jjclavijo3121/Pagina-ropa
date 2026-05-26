/**
 * Servidor API de ICNT
 * ----------------------
 * Express escucha peticiones HTTP y responde con JSON.
 * El frontend (React) llama a estas rutas con fetch().
 */
import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { ordersRouter } from './routes/orders.js'
import { productsRouter } from './routes/products.js'

const app = express()

// Permite que el navegador (Vite en :5173) hable con este servidor
app.use(
  cors({
    origin: config.clientOrigin,
  }),
)

// Entender JSON en el cuerpo de peticiones POST
app.use(express.json())

// Rutas de la API
app.get('/api', (_req, res) => {
  res.json({
    name: 'ICNT API',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/productos',
      'GET /api/productos/:id',
      'POST /api/pedidos',
    ],
  })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend ICNT en línea' })
})

app.use('/api/productos', productsRouter)
app.use('/api/pedidos', ordersRouter)

// Ruta no encontrada
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(config.port, () => {
  console.log(`🛍️  ICNT API → http://localhost:${config.port}`)
  console.log(`   Salud: http://localhost:${config.port}/api/health`)
})
