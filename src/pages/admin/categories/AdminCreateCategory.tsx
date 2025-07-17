import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { categoryValidation } from "../../../validations/admin/CategoryValidation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CategoryContext from "../../../contexts/CategoryContext";

export default function AdminCreateCategory() {
    const navigate = useNavigate()
    const { createCategory } = useContext(CategoryContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: categoryValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await createCategory(values))
                navigate('/admin/kategoriler')
        }
    })

    return (
        <main>
            <AdminSectionHeader 
                title='Kategori Ekle'
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
