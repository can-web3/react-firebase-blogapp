import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import { formatDate } from "../utils/formatDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import AuthContext from "../contexts/AuthContext"
import Blog from "../components/Blog"
import Seo from "../components/Seo"
import NotFound from "./NotFound"
import { useFormik } from "formik"

export default function BlogDetail() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const { blogs, blog, getBlogBySlug, getBlogsForBlogDetailPage, loading, addCommentToBlog } = useContext(BlogContext)
    const { auth, toggleFavorite } = useContext(AuthContext)
    const isFav = auth?.favorites.includes(blog?.id)

    const { handleSubmit, values, handleChange } = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: async values => {
            await addCommentToBlog(blog?.id, values.comment, auth?.id, auth?.username, blog?.slug)
        }
    })

    useEffect(() => {
        (async () => {
            await getBlogBySlug(slug)
            await getBlogsForBlogDetailPage(slug)
        })()
    }, [slug])

    if(loading)
        return <Loading />

    if(!blog)
        return <NotFound />

    return (
        <main className="container">
            <Seo 
                title={blog?.title}
            />
            <div className="grid xl:grid-cols-4 gap-16">
                <div className="xl:col-span-3">
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
                
                <div className="grid xl:grid-cols-1 lg:grid-cols-2 grid-col-1 gap-4">
                    { blogs?.map(blog => (
                        <Blog key={blog.id} blog={blog} />
                    )) }
                </div>
            </div>

            {/* add comment */}
            <div className="mb-4">
                { auth ? (
                    <div className="flex flex-col gap-4">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold mb-4">Yorum Yazın</h2>

                            <textarea 
                                className="w-full border border-gray-300 rounded-md p-2 mb-2 outline-0" 
                                rows={4} 
                                placeholder="Yorumunuzu yazın..."
                                name="comment"
                                value={values.comment}
                                onChange={handleChange}
                            ></textarea>
                            <div className="flex justify-end">
                                <button className="btn-primary">Gönder</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mt-4">
                        Yorum yapabilmek için lütfen <Link to="/giris-yap" className="text-blue-600 underline">giriş yapın</Link>.
                    </div>
                ) }
            </div>

            {/* comments */}
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold mb-4">Yorumlar ({blog?.comments?.length})</h2>

                { blog?.comments?.map(comment => (
                    <div key={comment.id} className="border border-gray-400 rounded-md px-2 py-4 flex gap-4">
                        <div>
                            <div>
                                <span className="font-semibold">{comment.displayName}</span> 
                                <span className="text-gray-600 text-sm"> - {formatDate(comment.createdAt)}</span>
                            </div>
                            <div className="mt-2">
                                {comment.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
