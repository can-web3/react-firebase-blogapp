import { useContext, useEffect } from "react"
import BlogContext from "../contexts/BlogContext"
import { Link } from "react-router-dom"
import Blogs from "../components/Blogs"
import AuthContext from "../contexts/AuthContext"
import { collection, getDoc, getDocs, query } from "firebase/firestore"
import { db } from "../firebase"
import type { CategoryInterface } from "../types/CategoryInterface"

export default function Home() {
  const { auth } = useContext(AuthContext)
  const { blogs, getBlogs } = useContext(BlogContext)

  const getUsers = async () => {
    try {
      const usersCol = collection(db, "users")
      const userSnap = await getDocs(usersCol)
      const users = userSnap.docs.map(docSnap => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<UserInterface, "id">)
      }))
      console.log("users", users)
    } catch (err) {
      console.error("getUsers error:", err)
    }
  }

  useEffect(() => {
    getBlogs()
    getUsers()
  }, [])

  return (
    <main>
      <section className="container">
        <h1>Anasayfa</h1>
        <Blogs blogs={blogs} />
      </section>
    </main>
  )
}
