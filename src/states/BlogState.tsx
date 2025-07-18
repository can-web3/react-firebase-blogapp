import { useReducer } from "react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../firebase"
import { getFirebaseErrorMessage } from "../utils/firebaseErrors"
import { toast } from "react-toastify"
import BlogContext from "../contexts/BlogContext"
import type { BlogInterface } from "../types/BlogInterface"
import BlogReducer from "../reducers/BlogReducer"
import type { CategoryInterface } from "../types/CategoryInterface"
import { uploadImage } from "../utils/uploadImage"
import { slugify } from "../utils/slugify"

export default function BlogState({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = {
    blogs: [],
    blog: null
  }
  const [state, dispatch] = useReducer(BlogReducer, initialState)

  const getBlogs = async () => {
    const q = query(
      collection(db, "blogs"),
      orderBy("createdAt", "desc")
    )
    const snap = await getDocs(q)
    const blogsRaw = snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<BlogInterface, "id">)
    }))

    const blogsWithCategory = await Promise.all(
      blogsRaw.map(async blog => {
        let category: (CategoryInterface & { id: string }) | null = null

        try {
          const catRef = doc(db, "categories", blog.categoryId)
          const catSnap = await getDoc(catRef)
          if (catSnap.exists()) {
            category = {
              id: catSnap.id,
              ...(catSnap.data() as CategoryInterface)
            }
          }
        } catch (err) {
          console.error("Kategori yüklenirken hata:", err)
        }

        return {
          ...blog,
          category  
        }
      })
    )

    dispatch({
      type: "GET_BLOGS",
      blogs: blogsWithCategory
    })
  }

  const createBlog = async (values) => {
    try {
      const image = await uploadImage(values.image)
      const data = {
          image: image,
          title: values.title,
          slug: slugify(values.title),
          categoryId: values.categoryId,
          createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, "blogs"), data)

      toast.success("Blog başarıyla eklendi")
      return true
    } catch (err: any) {
      console.log('err', err)
      toast.error(err.message || "Yükleme sırasında hata oluştu")
      return false
  }
  }

  const getBlogById = async (id: string): Promise<boolean> => {
    const blogRef = doc(db, "blogs", id)
    const blogSnap = await getDoc(blogRef)
    if (!blogSnap.exists()) {
      toast.error("Böyle bir blog bulunamadı")
      return false
    }

    const blogData = blogSnap.data() as Omit<BlogInterface, "id">

    let category: (CategoryInterface & { id: string }) | null = null
    try {
      const catRef = doc(db, "categories", blogData.categoryId)
      const catSnap = await getDoc(catRef)
      if (catSnap.exists()) {
        category = {
          id: catSnap.id,
          ...(catSnap.data() as CategoryInterface),
        }
      }
    } catch (err) {
      console.error("Kategori yüklenirken hata:", err)
    }

    dispatch({
      type: "GET_BLOG",
      blog: {
        id: blogSnap.id,
        ...blogData,
        category, 
      },
    })

    return true
  }

  const editBlogById = async (id, values) => {
    try {
      const uq = query(
        collection(db, "blogs"),
        where("name", "==", values.name)
      )
      const usnap = await getDocs(uq)
      const conflict = usnap.docs.some(d => d.id !== id)
      if (conflict) {
        toast.error("Bu isimde başka bir blog zaten var")
        return false
      }

      const ref = doc(db, "blogs", id)
      await updateDoc(ref, {
        name: values.name,
        updatedAt: serverTimestamp(),
      })
      toast.success("Blog düzenlendi")
      return true
    } catch (err: any) {
      console.log('err', err)
      toast.error(getFirebaseErrorMessage(err.code || err.message))
      return false
    }
  }

  const deleteBlogById = async id => {
    try {
      await deleteDoc(doc(db, "blogs", id))
      toast.success("Blog silindi")
      return true
    } catch (err: any) {
      toast.error(getFirebaseErrorMessage(err.code || err.message))
      return false
    }
  }

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        blog: state.blog,
        getBlogs,
        createBlog,
        getBlogById,
        editBlogById,
        deleteBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
