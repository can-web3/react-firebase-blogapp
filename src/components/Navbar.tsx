import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Navbar() {
    const { auth, logout } = useContext(AuthContext)
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return (
        <header className="relative border-b-[1px] border-black">
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
                                <Link to='/' className={`nav-link ${isOpenMenu && 'hover:bg-white hover:text-orange-600'}`}>Bloglar</Link>
                            </li>

                            <li>
                                <Link to='/' className={`nav-link ${isOpenMenu && 'hover:bg-white hover:text-orange-600'}`}>Hakkımızda</Link>
                            </li>

                            <li>
                                <Link to='/' className={`nav-link ${isOpenMenu && 'hover:bg-white hover:text-orange-600'}`}>İletişim</Link>
                            </li>

                            { auth ? (
                                <>
                                    <li>
                                        <Link to='/admin' className={`btn-outline-primary ${isOpenMenu && 'border-0 text-black p-0 hover:bg-white hover:text-orange-600'}`}>{auth.username}</Link>
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
                                    <li>
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
