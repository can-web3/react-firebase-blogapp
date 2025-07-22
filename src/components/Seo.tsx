import Helmet from "react-helmet"

interface SeoProps {
  title: string
}

export default function Seo({
  title,
}: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
