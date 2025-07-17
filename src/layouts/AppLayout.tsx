import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

export default function AppLayout() {
  const { auth } = useContext(AuthContext)

  return (
    <>
        <Navbar />

        <p>dasdsa {JSON.stringify(auth, null, 2)}</p>
        
        <Outlet />
    </>
  )
}
