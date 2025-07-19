import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Blog({
    blog
}) {
    const { auth, toggleFavorite } = useContext(AuthContext)
    const isFav = auth?.favorites.includes(blog?.id)

    return (
        <Link to={`/blog/${blog?.slug}`} key={blog?.id} className="border border-gray-400">
            <div className="relative">
                <img
                    className="w-full min-h-54 object-cover"
                    src={blog?.image}
                    alt={blog?.title}
                />

                <div 
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(blog?.id);
                    }}
                    className="absolute top-4 right-4 z-20">
                        <FontAwesomeIcon icon={faHeart} className={`${isFav ? 'text-red-600' : 'text-gray-400' } text-2xl`} />
                </div>
            </div>
            <div className="p-2">
                <Link
                    to={`/kategori/${blog?.category?.slug}`}
                    className="badge-primary"
                >
                    {blog?.category?.name}
                </Link>
                <h2 className="font-semibold">{blog?.title}</h2>
            </div>
        </Link>
    )
}
