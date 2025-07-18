import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminSectionHeader from "../../../components/AdminSectionHeader"
import DataTable from "react-data-table-component"
import BlogContext from "../../../contexts/BlogContext"
import type { BlogInterface } from "../../../types/BlogInterface"

export default function AdminBlogs() {
  const { blogs, getBlogs, deleteBlogById } = useContext(BlogContext)

  useEffect(() => {
    getBlogs()
  }, [])

  const handleDelete = async (id, name) => {
    if(confirm(`${name} blogunu silmek istiyor musunuz?`)){
      if(await deleteBlogById(id)){
        await getBlogs()
      }
    }
  }

  const columns = [
    {
      name: "Resim",
      selector: (row: BlogInterface) => <img className="w-20" src={row.image} />,
      sortable: true,
      width: "120px",
    },
    {
      name: "Başlık",
      selector: (row: BlogInterface) => row.title,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row: BlogInterface) => row.category?.name,
      sortable: true,
      width: "140px",
    },
    {
      name: "Oluşturulma Tarihi",
      selector: (row: BlogInterface) =>
        row.createdAt.toDate().toLocaleString(),
      sortable: true,
    },
    {
      name: "İşlemler",
      cell: (row: BlogInterface) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link
            to={`${row.id}/duzenle`}
            className="btn-warning py-1 px-2 text-sm"
          >
            Düzenle
          </Link>
          <button
            onClick={() => handleDelete(row.id, row.title)}
            className="btn-danger py-1 px-2 text-sm"
          >
            Kaldır
          </button>
        </div>
      ),
      right: true,
      minWidth: "140px",
    },
  ]

  return (
    <main>
      <AdminSectionHeader title="Bloglar" isOpenCreate={true} />
      <div className="bg-white p-4 mt-4 border border-gray-200 overflow-x-auto">
        <DataTable
          columns={columns}
          data={blogs}
          pagination
          highlightOnHover
          striped
          customStyles={{
            rows: {
              style: { minHeight: "56px" }
            },
            cells: {
              style: { padding: "8px 16px" }
            }
          }}
        />
      </div>
    </main>
  )
}
