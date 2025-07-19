import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import { formatDate } from "../utils/formatDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../contexts/AuthContext"
import Blogs from "../components/Blogs"
import Blog from "../components/Blog"

export default function BlogDetail() {
    const { slug } = useParams()
    const { blogs, blog, getBlogBySlug, loading } = useContext(BlogContext)
    const { auth, toggleFavorite } = useContext(AuthContext)
    const isFav = auth?.favorites.includes(blog?.id)

    useEffect(() => {
        getBlogBySlug(slug)
    }, [slug])

    if(!blog)
        return <Loading />

    return (
        <main className="container">
            <div className="grid grid-cols-4 gap-16">
                <div className="col-span-3">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                        <div>
                            <Link to={`/kategori/${blog?.category?.slug}`} className="badge-primary">{blog?.category?.name}</Link>
                            <h1 className="text-xl font-semibold my-2">{blog?.title}</h1>
                            <span className="inline-block">{formatDate(blog?.createdAt)}</span>
                        </div>

                        { auth && (
                            <button onClick={() => toggleFavorite(blog?.id)} type="button" className="px-2 py-1 bg-gray-200 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300">
                                <FontAwesomeIcon icon={faHeart} className={`${isFav ? 'text-red-600' : 'text-gray-400' }`} />
                                { isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle' }
                            </button>
                        ) }
                    </div>
                    <div>
                        <img className="lg:max-w-1/2 w-full mb-3 lg:mr-3 float-left" src={blog?.image} alt="" />
                        <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    { blogs?.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    )) }
                </div>
            </div>
        </main>
    )
}
