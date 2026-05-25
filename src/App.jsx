import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import SectionPage from './pages/SectionPage'

const ROUTE_PATHS = [
  'coleccion',
  'nosotros',
  'tiendas',
  'nueva-coleccion',
  'mujer',
  'hombre',
  'accesorios',
  'rebajas',
  'contacto',
]

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {ROUTE_PATHS.map((path) => (
              <Route key={path} path={path} element={<SectionPage />} />
            ))}
            <Route path="producto/:id" element={<ProductDetailPage />} />
            <Route path="carrito" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
