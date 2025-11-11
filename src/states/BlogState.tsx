import { useReducer, useState } from "react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
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
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(BlogReducer, initialState)

  const getBlogs = async () => {
    setLoading(true)
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

    setLoading(false)
  }

  const createBlog = async (values) => {
    try {
      const image = await uploadImage(values.image)
      const data = {
          image: image,
          title: values.title,
          slug: slugify(values.title),
          content: values.content,
          categoryId: values.categoryId,
          show_in_slider: values.show_in_slider,
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
      if (values.title) {
        const uq = query(
          collection(db, "blogs"),
          where("title", "==", values.title)
        )
        const usnap = await getDocs(uq)
        const conflict = usnap.docs.some(d => d.id !== id)
        if (conflict) {
          toast.error("Bu başlıkta başka bir blog zaten var")
          return false
        }
      }

      const ref = doc(db, "blogs", id)

      const data = {
        title: values.title,
        slug: slugify(values.title),
        content: values.content,
        categoryId: values.categoryId,
        show_in_slider: values.show_in_slider,
        updatedAt: serverTimestamp(),
      }

      if (values.image) {
        const imageUrl = await uploadImage(values.image)
        data.image = imageUrl
      }

      await updateDoc(ref, data)

      toast.success("Blog düzenlendi")
      return true

    } catch (err) {
      console.error("editBlogById error:", err)
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

  const getBlogBySlug = async (slug: string): Promise<boolean> => {
    setLoading(true)
    const blogsRef = collection(db, "blogs")
    const q = query(blogsRef, where("slug", "==", slug))
    const snap = await getDocs(q)

    if (snap.empty) {
      toast.error("Böyle bir blog bulunamadı")
      setLoading(false)
      return false
    }

    const docSnap = snap.docs[0]
    const blogData = docSnap.data() as Omit<BlogInterface, "id">

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

    let comments: any[] = []
    try {
      const commentsRef = collection(db, `blogs/${docSnap.id}/comments`)
      const commentsQuery = query(commentsRef, orderBy("createdAt", "asc"))

      const commentsSnap = await getDocs(commentsQuery)
      comments = commentsSnap.docs.map(c => ({
        id: c.id,
        ...(c.data() as {
          userId: string
          displayName: string
          comment: string
          createdAt: any
        })
      }))
    } catch (err) {
      console.error("Yorumlar yüklenirken hata:", err)
    }

    dispatch({
      type: "GET_BLOG",
      blog: {
        id: docSnap.id,
        ...blogData,
        category,
        comments, 
      },
    })

    setLoading(false)
    return true
  }


  const getBlogsByCategorySlug = async (slug: string): Promise<boolean> => {
    try {
      setLoading(true)

      const catQ = query(
        collection(db, "categories"),
        where("slug", "==", slug)
      )
      const catSnap = await getDocs(catQ)
      if (catSnap.empty) {
        toast.error("Böyle bir kategori bulunamadı")
        return false
      }
      const catDoc = catSnap.docs[0]
      const catData = catDoc.data() as CategoryInterface
      const categoryObj = { id: catDoc.id, ...catData }

      const blogQ = query(
        collection(db, "blogs"),
        where("categoryId", "==", catDoc.id),
        orderBy("createdAt", "desc")
      )
      const blogSnap = await getDocs(blogQ)
      // 3) Her blog’a category bilgisini ekle
      const blogs: Array<BlogInterface & { category: typeof categoryObj }> =
        blogSnap.docs.map(docSnap => {
          const blogData = docSnap.data() as Omit<BlogInterface, "id">
          return {
            id: docSnap.id,
            ...blogData,
            category: categoryObj
          }
        })

      dispatch({ type: "GET_BLOGS", blogs })
      return true
    } catch (err: any) {
      console.error("getBlogsByCategorySlug error:", err)
      toast.error("Bloglar yüklenirken hata oluştu")
      return false
    } finally {
      setLoading(false)
    }
  }

  const getBlogsForBlogDetailPage = async (slug: string) => {
    try {
      const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc"),
        limit(3)
      )
      const snap = await getDocs(q)

      const blogsRaw = snap.docs
        .map(docSnap => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<BlogInterface, "id">)
        }))
        .filter(blog => blog.slug !== slug)

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
          return { ...blog, category }
        })
      )

      dispatch({
        type: "GET_BLOGS",
        blogs: blogsWithCategory
      })
    } catch (err) {
      console.error("getBlogsForBlogDetailPage error:", err)
    }
  }

  const addCommentToBlog = async (blogId: string, comment: string, userId: string, displayName: string, blogSlug: string) => {
    try {
      await addDoc(collection(db, `blogs/${blogId}/comments`), {
        userId,
        displayName,
        comment: comment.trim().replace(/\s+/g, ' '),
        createdAt: serverTimestamp(),
      })
      
      await getBlogBySlug(blogSlug)

      toast.success("Yorum başarıyla eklendi")
      return true
    } catch (err) {
      console.error("addCommentToBlog error:", err)
      toast.error("Yorum eklenirken hata oluştu")
      return false
    }
  }

  const getBlogsByBlogIds = async (blogIds: string[]) => {
    try {
      setLoading(true)

      if (!blogIds.length) {
        dispatch({ type: "GET_BLOGS", blogs: [] })
        return
      }

      if (blogIds.length > 10) {
        console.error("in sorgusu en fazla 10 id kabul eder")
        return
      }

      const q = query(
        collection(db, "blogs"),
        where(documentId(), "in", blogIds)
      )

      const snap = await getDocs(q)

      const blogsRaw = snap.docs.map(docSnap => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<BlogInterface, "id">)
      }))

      // ✅ Her blog için kategori bilgisini getir
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

    } catch (err) {
      console.error("getBlogsByBlogIds error:", err)
      toast.error("Favori bloglar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const getBlogsCommentsByUserId = async (userId: string) => {
    try {
      setLoading(true)

      const commentsQ = query(
        collection(db, "comments"),
        where("userId", "==", userId)
      )
      const commentsSnap = await getDocs(commentsQ)

      if (commentsSnap.empty) {
        dispatch({ type: "GET_BLOGS", blogs: [] })
        return
      }

      console.log('commentsSnap.docs', commentsSnap.docs)

      const blogIds = Array.from(
        new Set(
          commentsSnap.docs.map(docSnap =>
            docSnap.ref.parent.parent!.id 
          )
        )
      )

      await getBlogsByBlogIds(blogIds)
    } catch (err) {
      console.error("getBlogsCommentsByUserId error:", err)
      toast.error("Yorum yaptığın bloglar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <BlogContext.Provider
      value={{
        blogs: state.blogs,
        blog: state.blog,
        loading: loading,
        getBlogs,
        createBlog,
        getBlogById,
        editBlogById,
        deleteBlogById,
        getBlogBySlug,
        getBlogsByCategorySlug,
        getBlogsForBlogDetailPage,
        addCommentToBlog,
        getBlogsByBlogIds,
        getBlogsCommentsByUserId,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
