import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import { Link } from "react-router-dom"

export default function Home() {
  const { blogs, getBlogs } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <main>
      <section className="container">
        <h1 className="text-xl font-semibold mb-3">Haberler</h1>
        { blogs && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            { blogs.map(blog => (
              <div className="border border-gray-400">
                <img className="w-full max-h-48 object-cover" src={blog.image} alt="" />
                <div className="p-2">
                  <Link to={`/kategori/${blog.category?.slug}`} className="badge-primary">{blog.category?.name}</Link>
                  <h2 className="font-semibold">{blog.title}</h2>
                </div>
              </div>
            )) }
          </div>
        ) }
      </section>
    </main>
  )
}
