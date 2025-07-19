import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import Blogs from "../components/Blogs"

export default function BlogsPage() {
  const { blogs, getBlogs } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <main>
      <section className="container">
        <h1>Bloglar</h1>
        <Blogs blogs={blogs} />
      </section>
    </main>
  )
}
