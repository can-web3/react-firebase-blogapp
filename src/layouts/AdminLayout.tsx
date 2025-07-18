import React, { useContext } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Loading from '../components/Loading'
import Logo from '../components/Logo'

export default function AdminLayout() {
  const { auth, loading, logout } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (!auth || auth.role !== 'admin') {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  const handleLogout = async () => {
    await logout()
    return <Navigate to='/' replace />
  }

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <div className="lg:inline-block hidden border-r-[1px] border-gray-400">
        <div className="border-b-[1px] border-gray-400 h-[70px]">
          <Logo className="p-6 mx-auto" />
        </div>
        <ul className="p-4 flex flex-col gap-2">
          <li>
            <Link to="/admin" className="block p-2 hover:bg-orange-600 hover:text-white">
              Kontrol Paneli
            </Link>
          </li>
          <li>
            <Link to="/admin/kategoriler" className="block p-2 hover:bg-orange-600 hover:text-white">
              Kategoriler
            </Link>
          </li>
          <li>
            <Link to="/admin/bloglar" className="block p-2 hover:bg-orange-600 hover:text-white">
              Bloglar
            </Link>
          </li>
        </ul>
      </div>

      {/* header and main */}
      <div className="flex flex-col h-screen w-full">
        <header className="h-[70px] border-b-[1px] border-gray-400 flex items-center justify-end px-4">
          <div className="flex gap-4 items-center">
            <p>{auth.username}</p>
            <button className="btn-primary" onClick={() => handleLogout()}>
              Çıkış Yap
            </button>
          </div>
        </header>
        <main className="flex-1 bg-gray-100 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
