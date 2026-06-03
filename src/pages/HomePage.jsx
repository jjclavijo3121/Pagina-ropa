import { useState } from 'react'
import { Link } from 'react-router-dom'
import FeaturedProducts from '../components/FeaturedProducts'
import HomeCollectionSection from '../components/HomeCollectionSection'
import {
  HOME_HERO,
  HOME_PROMO_BANNER,
  PAGE_CONTENT,
} from '../config/navigation'
import { FEATURED_PRODUCTS, getProductsByPath } from '../data/products'

const HOMEBRE_PRODUCTS = getProductsByPath('/hombre').slice(0, 4)

function getRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

function HomePage() {
  const { tag, title, text } = PAGE_CONTENT['/']
  const [heroImage] = useState(() => getRandomImage(HOME_HERO.images))
  const [promoBannerImage] = useState(() =>
    getRandomImage(HOME_PROMO_BANNER.images)
  )

  return (
    <>
      <section
        className="hero hero--fullscreen"
        aria-label={HOME_HERO.imageAlt}
      >
        <img
          className="hero__bg"
          src={heroImage}
          alt=""
          aria-hidden="true"
        />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__tag">{tag}</p>
          <h1 className="hero__title">{title}</h1>
          <p className="hero__text">{text}</p>
          <Link to="/coleccion" className="hero__cta">
            Ver colección
          </Link>
        </div>
      </section>

      <FeaturedProducts products={FEATURED_PRODUCTS} />

      <section
        className="home-wide-banner"
        aria-label={HOME_PROMO_BANNER.imageAlt}
      >
        <div className="home-wide-banner__overlay" aria-hidden="true" />
        <div className="home-wide-banner__content">
          <p className="home-wide-banner__tag">Nosotros</p>
          <h2 className="home-wide-banner__title">Conoce m&aacute;s sobre nuestra esencia</h2>
          <p className="home-wide-banner__text">
            Este espacio tendr&aacute; un mensaje m&aacute;s completo sobre la marca,
            nuestra visi&oacute;n y lo que queremos transmitir.
          </p>
          <Link to="/nosotros" className="home-wide-banner__cta">
            Ir a Nosotros
          </Link>
        </div>
        <img
          src={promoBannerImage}
          alt={HOME_PROMO_BANNER.imageAlt}
          loading="lazy"
        />
      </section>

      <HomeCollectionSection
        title="Colección hombre"
        subtitle="Camisas, pantalones y abrigos con cortes modernos para tu día a día."
        products={HOMEBRE_PRODUCTS}
        viewAllPath="/hombre"
        viewAllLabel="Ver colección hombre"
      />
    </>
  )
}

export default HomePage
