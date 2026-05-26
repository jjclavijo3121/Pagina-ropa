import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchProducts } from '../api/client'
import PageContent from '../components/PageContent'
import { PAGE_CONTENT } from '../config/navigation'
import { getProductsByPath, isSalesPath } from '../data/products'

function SectionPage() {
  const { pathname } = useLocation()
  const content = PAGE_CONTENT[pathname]
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const isSales = isSalesPath(pathname)

  useEffect(() => {
    if (!isSales) {
      setProducts([])
      return
    }

    let cancelled = false
    setLoading(true)

    fetchProducts(pathname)
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProducts(getProductsByPath(pathname))
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [pathname, isSales])

  if (!content) {
    return (
      <section className="hero">
        <h1 className="hero__title">Página no encontrada</h1>
        <p className="hero__text">La ruta solicitada no existe.</p>
      </section>
    )
  }

  const { tag, title, text } = content

  if (loading) {
    return (
      <section className="hero hero--compact">
        <p className="hero__tag">{tag}</p>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__text">Cargando productos…</p>
      </section>
    )
  }

  return (
    <PageContent
      tag={tag}
      title={title}
      text={text}
      path={pathname}
      products={isSales ? products : []}
    />
  )
}

export default SectionPage
