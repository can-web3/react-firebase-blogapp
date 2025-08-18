import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import CategoryContext from "../contexts/CategoryContext";

export default function Navbar() {
    const { auth, logout } = useContext(AuthContext)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { categories, getCategories } = useContext(CategoryContext)

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <header className="relative border-b-[1px] border-gray-200">
            <div className="container">
                <div className="flex items-center justify-between">
                    <Logo />

                    {/* nav */}
                    <nav className={`lg:inline-block ${!isOpenMenu && 'hidden'}`}>
                        <ul className={`${isOpenMenu && 'absolute border border-orange-600 bg-white top-17.5 w-full left-0'}  flex lg:flex-row flex-col lg:items-center gap-4 lg:px-0 p-2`}>
                            <li>
                                <Link to='/' className={`nav-link ${isOpenMenu && 'hover:bg-white hover:text-orange-600'}`}>Anasayfa</Link>
                            </li>

                            <li>
                                <Link to='/bloglar' className={`nav-link ${isOpenMenu && 'hover:bg-white hover:text-orange-600'}`}>Bloglar</Link>
                            </li>

                           <li className="relative group">
                                <span className="nav-link cursor-pointer">
                                    Kategoriler
                                    <FontAwesomeIcon icon={faSortDown} className="mb-1 ml-1" />
                                </span>
                                <ul className="lg:absolute lg:top-5 lg:left-0 z-40 hidden group-hover:block bg-white shadow-lg mt-1 w-40">
                                    { categories?.map(category => (
                                        <li key={category.id} className="cursor-pointer  hover:bg-gray-100">
                                            <Link to={`/kategori/${category.slug}`} className="text-sm px-4 py-2 block">
                                                {category.name}
                                            </Link>
                                        </li>
                                    )) }
                                </ul>
                            </li>

                            { auth ? (
                                <>
                                    <li className="relative group ml-2">
                                        <span className="nav-link cursor-pointer">
                                            {auth.username}
                                            <FontAwesomeIcon icon={faSortDown} className="mb-1 ml-1" />
                                        </span>
                                        <ul className="lg:absolute lg:top-5 lg:left-0 hidden group-hover:block bg-white shadow-lg mt-1 w-40 z-40">
                                            { auth.role === 'admin' && (
                                                <li className="cursor-pointer hover:bg-gray-100">
                                                    <Link to="/admin" className="text-sm px-4 py-2 block">
                                                        Admin Paneli
                                                    </Link>
                                                </li>
                                            ) }

                                            <li className="cursor-pointer hover:bg-gray-100">
                                                <Link to="/profil" className="text-sm px-4 py-2 block">
                                                    Profil
                                                </Link>
                                            </li>

                                            <li className="cursor-pointer hover:bg-gray-100">
                                                <Link to="/profil" className="text-sm px-4 py-2 block">
                                                    Favorilerim
                                                </Link>
                                            </li>

                                            <li className="cursor-pointer hover:bg-gray-100">
                                                <Link to="/profil" className="text-sm px-4 py-2 block">
                                                    Yorumlarım
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <button 
                                            type='button' 
                                            onClick={() => logout()}
                                            className={`btn-primary ${isOpenMenu && 'border-0 text-black p-0 bg-white hover:bg-white hover:text-orange-600'}`}>
                                                Çıkış yap
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="ml-2">
                                        <Link to='/giris-yap' className={`btn-outline-primary ${isOpenMenu && 'border-0 text-black p-0 hover:bg-white hover:text-orange-600'}`}>Giriş Yap</Link>
                                    </li>

                                    <li>
                                        <Link to='/kayit-ol' className={`btn-primary ${isOpenMenu && 'border-0 text-black p-0 bg-white hover:bg-white hover:text-orange-600'}`}>Kayıt Ol</Link>
                                    </li>
                                </>
                            ) }

                        </ul>
                    </nav>

                    <div className="lg:hidden inline-block">
                        <button onClick={() => setIsOpenMenu(!isOpenMenu)} className="btn btn-primary">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
