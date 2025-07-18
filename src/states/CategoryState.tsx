import { useReducer } from "react"
import CategoryReducer from "../reducers/CategoryReducer"
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
import CategoryContext from "../contexts/CategoryContext"
import type { CategoryInterface } from "../types/CategoryInterface"
import { slugify } from "../utils/slugify"

export default function CategoryState({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = {
    categories: [],
    category: null
  }
  const [state, dispatch] = useReducer(CategoryReducer, initialState)

  const getCategories = async () => {
    const q = query(
      collection(db, "categories"),
      orderBy("createdAt", "desc")
    )
    const snap = await getDocs(q)
    const cats = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CategoryInterface, "id">),
    }))
    dispatch({ type: "GET_CATEGORIES", categories: cats })
  }

  const createCategory = async (values: { name: string }) => {
    try {
      await addDoc(collection(db, "categories"), {
        name: values.name,
        slug: slugify(values.name),
        createdAt: serverTimestamp(),
      })
      toast.success("Kategori eklendi")
      return true
    } catch (err: any) {
      const message = getFirebaseErrorMessage(err.code || err.message)
      toast.error(message)
      return false
    }
  }

  const getCategoryById = async id => {
      const docRef = doc(db, 'categories', id)
      const snap = await getDoc(docRef)
      if(!snap.exists()){
        toast.error('Böyle bir kategori bulunamadı')
        return false
      }

      const category = snap.data() as Omit<CategoryInterface, 'id'>
      await dispatch({
        type: "GET_CATEGORY",
        category: {
          name: category.name
        }
      })

      return true
  }

  const editCategoryById = async (id, values) => {
    try {
      const uq = query(
        collection(db, "categories"),
        where("name", "==", values.name)
      )
      const usnap = await getDocs(uq)
      const conflict = usnap.docs.some(d => d.id !== id)
      if (conflict) {
        toast.error("Bu isimde başka bir kategori zaten var")
        return false
      }

      const ref = doc(db, "categories", id)
      await updateDoc(ref, {
        name: values.name,
        slug: slugify(values.name),
        updatedAt: serverTimestamp(),
      })
      toast.success("Kategori düzenlendi")
      return true
    } catch (err: any) {
      console.log('err', err)
      toast.error(getFirebaseErrorMessage(err.code || err.message))
      return false
    }
  }

  const deleteCategoryById = async id => {
    try {
      await deleteDoc(doc(db, "categories", id))
      toast.success("Kategori silindi")
      return true
    } catch (err: any) {
      toast.error(getFirebaseErrorMessage(err.code || err.message))
      return false
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        category: state.category,
        getCategories,
        createCategory,
        getCategoryById,
        editCategoryById,
        deleteCategoryById,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
