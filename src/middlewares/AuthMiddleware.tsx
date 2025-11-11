import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

export default function AuthMiddleware() {
  const { loading, auth } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (!auth) {
    return (
        toast.success('Giriş yapmalısınız'),
        <Navigate to="/" replace state={{ from: location }} />
    )
  }

  return <Outlet />
}
