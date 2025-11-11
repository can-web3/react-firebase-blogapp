import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import Blogs from "../components/Blogs"
import Seo from "../components/Seo"

export default function BlogsPage() {
  const { blogs, getBlogs, loading } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <main>
      <Seo 
        title="Bloglar"
        />
      <section className="container">
        <h1>Bloglar</h1>
        <Blogs blogs={blogs} loading={loading} />
      </section>
    </main>
  )
}
