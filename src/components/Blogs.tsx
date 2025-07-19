import Blog from "./Blog"

interface BlogsProps {
  blogs?: Array<{
    id: string
    image: string
    title: string
    category?: { slug: string; name: string }
  }>
}

export default function Blogs({ blogs }: BlogsProps) {
  if (!blogs || blogs.length === 0) return (
    <div className="bg-amber-200 p-2">
      Blog bulunamadı
    </div>
  )

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
