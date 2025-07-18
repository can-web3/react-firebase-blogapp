import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import { ToastContainer } from 'react-toastify'
import UserState from './states/UserState.tsx'
import AuthState from './states/AuthState.tsx'
import CategoryState from './states/CategoryState.tsx'
import BlogState from './states/BlogState.tsx'

createRoot(document.getElementById('root')!).render(
  <BlogState>
    <CategoryState>
      <AuthState>
        <UserState>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserState>
      </AuthState>
    </CategoryState>
  </BlogState>
)
