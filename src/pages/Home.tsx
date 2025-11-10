import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import Blogs from "../components/Blogs"
import AuthContext from "../contexts/AuthContext"
import Seo from "../components/Seo"

export default function Home() {
  const { auth } = useContext(AuthContext)
  const { blogs, getBlogs, loading } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <main>
      <Seo 
        title='Anasayfa'
      />
      <section className="container">
        <h1>Anasayfa</h1>
        <Blogs blogs={blogs} loading={loading} />
      </section>
    </main>
  )
}
