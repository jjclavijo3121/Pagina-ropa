import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { MENU_ITEMS, NAVBAR_LINKS } from '../config/navigation'
import CartButton from './CartButton'
import CartDrawer from './CartDrawer'
import ScrollToTop from './ScrollToTop'
import '../App.css'

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="layout">
      <ScrollToTop />

      <header className="navbar">
        <button
          type="button"
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
        </button>

        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          ICNT
        </Link>

        <div className="navbar__end">
          <nav className="navbar__links" aria-label="Navegación principal">
            {NAVBAR_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <CartButton />
        </div>
      </header>

      <div
        className={`menu-overlay ${menuOpen ? 'menu-overlay--visible' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <aside
        className={`side-menu ${menuOpen ? 'side-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="side-menu__header">
          <span className="side-menu__title">Menú</span>
          <button
            type="button"
            className="side-menu__close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>
        <ul className="side-menu__list">
          {MENU_ITEMS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <CartDrawer />

      <main className="body">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">ICNT</p>
            <p className="footer__copy">
              Moda contemporánea con materiales de calidad.
            </p>
          </div>
          <div>
            <p className="footer__heading">Ayuda</p>
            <ul>
              <li>
                <a href="#">Envíos</a>
              </li>
              <li>
                <a href="#">Devoluciones</a>
              </li>
              <li>
                <a href="#">Tallas</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__heading">Legal</p>
            <ul>
              <li>
                <a href="#">Privacidad</a>
              </li>
              <li>
                <a href="#">Términos</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer__heading">Síguenos</p>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__bottom">
          © {new Date().getFullYear()} ICNT. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}

export default Layout
