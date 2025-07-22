import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import { useParams } from "react-router-dom"
import Loading from "../components/Loading"
import CategoryContext from "../contexts/CategoryContext"
import Blogs from "../components/Blogs"
import Seo from "../components/Seo"

export default function CategoryBlogs() {
    const { slug } = useParams()
    const { blogs, getBlogsByCategorySlug, loading } = useContext(BlogContext)
    const { category, getCategoryBySlug } = useContext(CategoryContext)

    useEffect(() => {
        getBlogsByCategorySlug(slug)
        getCategoryBySlug(slug)
    }, [slug])

    if(!blogs || !category || loading)
        return <Loading />

    return (
        <main className="container">
            <Seo 
                title={category?.name}
            />
            <section>
                <h1>{category.name}</h1>
                <Blogs blogs={blogs} />
            </section>
        </main>
    )
}
