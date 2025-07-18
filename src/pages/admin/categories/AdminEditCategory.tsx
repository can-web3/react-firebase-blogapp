import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { categoryValidation } from "../../../validations/admin/CategoryValidation";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import CategoryContext from "../../../contexts/CategoryContext";

export default function AdminEditCategory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { category, getCategoryById, editCategoryById } = useContext(CategoryContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            name: category?.name || ''
        },
        enableReinitialize: true,
        validationSchema: categoryValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await editCategoryById(id, values))
                navigate('/admin/kategoriler')
        }
    })

   

    useEffect(() => {
        if(!getCategoryById(id))
            <Navigate to='/admin/kategoriler' />
    }, [id])

    return (
        <main>
            <AdminSectionHeader 
                title='Kategori Düzenle'
            />

            <div className="bg-white p-4 mt-4 border border-gray-200">
                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <FormInput 
                        title='Adı'
                        name="name"
                        onChange={handleChange('name')}
                        value={values.name}
                        error={errors.name}
                    />

                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </main>
    )
}
