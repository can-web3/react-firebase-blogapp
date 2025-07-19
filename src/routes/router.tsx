import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminCategories from "../pages/admin/categories/AdminCategories";
import AdminCreateCategory from "../pages/admin/categories/AdminCreateCategory";
import AdminEditCategory from "../pages/admin/categories/AdminEditCategory";
import AdminBlogs from "../pages/admin/blogs/AdminBlogs";
import AdminCreateBlog from "../pages/admin/blogs/AdminCreateBlog";
import AdminEditBlog from "../pages/admin/blogs/AdminEditBlog";
import BlogDetail from "../pages/BlogDetail";
import CategoryBlogs from "../pages/CategoryBlogs";
import BlogsPage from "../pages/BlogsPage";

const router = createBrowserRouter([
    {
        path: '',
        element: <AppLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'bloglar', element: <BlogsPage /> },
            { path: 'blog/:slug', element: <BlogDetail /> },
            { path: 'kategori/:slug', element: <CategoryBlogs /> },
            { path: 'favorilerim', element: <CategoryBlogs /> },

            // guest middleware
            { 
                path: '',
                element: <GuestMiddleware />,
                children: [
                    { path: 'kayit-ol', element: <Register /> },
                    { path: 'giris-yap', element: <Login /> },
                ]
            },

        ]
    },
    {
        path: 'admin',
        element: <AdminLayout />,
        children: [
            { path: '', element: <Dashboard /> },

            { path: 'kategoriler', element: <AdminCategories /> },
            { path: 'kategoriler/ekle', element: <AdminCreateCategory /> },
            { path: 'kategoriler/:id/duzenle', element: <AdminEditCategory /> },

            { path: 'bloglar', element: <AdminBlogs /> },
            { path: 'bloglar/ekle', element: <AdminCreateBlog /> },
            { path: 'bloglar/:id/duzenle', element: <AdminEditBlog /> },
        ]
    }
])

export default router