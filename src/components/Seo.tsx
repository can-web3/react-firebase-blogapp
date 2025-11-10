import Helmet from "react-helmet"

interface SeoProps {
  title: string,
  description?: string
  robots?: string
}

export default function Seo({
  title,
  description,
  robots
}: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || ""} />
      {robots && <meta name="robots" content={robots || 'index, follow'} />}
    </Helmet>
  )
}
