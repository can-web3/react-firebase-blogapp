import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import Blogs from "../components/Blogs"
import AuthContext from "../contexts/AuthContext"

export default function Home() {
  const { auth } = useContext(AuthContext)
  const { blogs, getBlogs } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <main>
      <section className="container">
        <h1>Anasayfa</h1>
        <Blogs blogs={blogs} />
      </section>
    </main>
  )
}
