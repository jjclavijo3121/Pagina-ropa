import { Router } from 'express'
import {
  getAllProducts,
  getProductById,
  getProductsByPath,
  SALES_PATHS,
} from '../../src/data/products.js'

export const productsRouter = Router()

/** GET /api/productos — todos o por sección (?seccion=/mujer) */
productsRouter.get('/', (req, res) => {
  const seccion = req.query.seccion

  if (seccion) {
    const path = seccion.startsWith('/') ? seccion : `/${seccion}`
    if (!SALES_PATHS.has(path)) {
      return res.status(400).json({
        error: 'Sección no válida',
        secciones: [...SALES_PATHS],
      })
    }
    return res.json(getProductsByPath(path))
  }

  res.json(getAllProducts())
})

/** GET /api/productos/:id — un producto (ficha) */
productsRouter.get('/:id', (req, res) => {
  const product = getProductById(req.params.id)

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  res.json(product)
})
