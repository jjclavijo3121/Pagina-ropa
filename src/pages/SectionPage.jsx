import { useLocation } from 'react-router-dom'
import PageContent from '../components/PageContent'
import { PAGE_CONTENT } from '../config/navigation'
import { getProductsByPath, isSalesPath } from '../data/products'

function SectionPage() {
  const { pathname } = useLocation()
  const content = PAGE_CONTENT[pathname]

  if (!content) {
    return (
      <section className="hero">
        <h1 className="hero__title">Página no encontrada</h1>
        <p className="hero__text">La ruta solicitada no existe.</p>
      </section>
    )
  }

  const { tag, title, text } = content
  const products = isSalesPath(pathname) ? getProductsByPath(pathname) : []

  return (
    <PageContent
      tag={tag}
      title={title}
      text={text}
      path={pathname}
      products={products}
    />
  )
}

export default SectionPage
