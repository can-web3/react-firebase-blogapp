import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Loading from '../components/Loading'

export default function GuestMiddleware() {
  const { loading, auth } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <Loading />
  }

  if (auth) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
