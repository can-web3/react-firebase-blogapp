// src/pages/admin/categories/AdminCategories.tsx
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminSectionHeader from "../../../components/AdminSectionHeader"
import DataTable from "react-data-table-component"
import CategoryContext from "../../../contexts/CategoryContext"
import type { CategoryInterface } from "../../../types/CategoryInterface"

export default function AdminCategories() {
  const { categories, getCategories, deleteCategoryById } = useContext(CategoryContext)

  useEffect(() => {
    getCategories()
  }, [])

  const handleDelete = async (id, name) => {
    if(confirm(`${name} kategorini silmek istiyor musunuz`)){
      if(await deleteCategoryById(id)){
        await getCategories()
      }
    }
  }

  const columns = [
    {
      name: "Adı",
      selector: (row: CategoryInterface) => row.name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Oluşturulma Tarihi",
      selector: (row: CategoryInterface) =>
        row.createdAt.toDate().toLocaleString(),
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "İşlemler",
      cell: (row: CategoryInterface) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Link
            to={`${row.id}/duzenle`}
            className="btn-warning py-1 px-2 text-sm"
          >
            Düzenle
          </Link>
          <button
            onClick={() => handleDelete(row.id, row.name)}
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
      <AdminSectionHeader title="Kategoriler" isOpenCreate={true} />
      <div className="bg-white p-4 mt-4 border border-gray-200 overflow-x-auto">
        <DataTable
          columns={columns}
          data={categories}
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
