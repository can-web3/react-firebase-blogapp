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
        <div key={blog?.id} className="border border-gray-400">
            <div className="relative">
                <Link to={`/blog/${blog?.slug}`}>
                    <img
                        className="w-full h-60 object-cover"
                        src={blog?.image}
                        alt={blog?.title}
                    />
                </Link>

                <div 
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(blog?.id);
                    }}
                    className="absolute top-4 right-4 z-20 cursor-pointer">
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
                <h2 className="font-semibold">
                    <Link to={`/blog/${blog?.slug}`}>
                        {blog?.title}
                    </Link>
                </h2>
            </div>
        </div>
    )
}
