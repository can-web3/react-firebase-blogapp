import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import Blogs from "../components/Blogs"
import Seo from "../components/Seo"
import Slider from "../components/Slider"

export default function Home() {
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

        <Slider 
          blogs={blogs.filter(blog => blog.show_in_slider).slice(0, 5)} 
          loading={loading} 
        />

        <Blogs blogs={blogs.filter(blog => !blog.show_in_slider)} loading={loading} />
      </section>
    </main>
  )
}
