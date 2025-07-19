import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AuthContext from '../contexts/AuthContext'
import Github from '../components/Github'
import Footer from '../components/Footer'

export default function AppLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Github />

        <Navbar />

        <main className='flex-1'>
          <Outlet />
        </main>

        <Footer />
    </div>
  )
}
