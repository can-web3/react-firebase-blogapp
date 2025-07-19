import { useFormik } from "formik";
import AdminSectionHeader from "../../../components/AdminSectionHeader";
import FormInput from "../../../components/FormInput";
import BtnPrimary from "../../../components/BtnPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { blogValidation } from "../../../validations/admin/BlogValidation";
import { useContext, useEffect } from "react";
import CategoryContext from "../../../contexts/CategoryContext";
import Select from "../../../components/Select";
import TextEditor from "../../../components/TextEditor";
import BlogContext from "../../../contexts/BlogContext";


export default function AdminEditBlog() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { blog, editBlogById, getBlogById } = useContext(BlogContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues: {
            image: null as File | null,
            title: blog?.title || '',
            categoryId: blog?.categoryId || '',
            content: blog?.content || '',
        },
        enableReinitialize: true,
        validationSchema: blogValidation(true),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await editBlogById(id, values))
                navigate('/admin/bloglar')
        }
    })

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getBlogById(id)
    }, [id])

    return (
        <main>
            <AdminSectionHeader 
                title='Blog Düzenle'
            />

            <div className="bg-white p-4 mt-4 border border-gray-200">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                    {/* image */}
                    <FormInput
                        type="file"
                        title="Resim"
                        name="image"
                        onChange={(e) => {
                            const file = (e.currentTarget.files && e.currentTarget.files[0]) || null
                            setFieldValue("image", file)
                        }}
                        error={errors.image}
                        required={false}
                    />

                    {/* title */}
                    <FormInput 
                        title='Başlık'
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        error={errors.title}
                    />

                    {/* categoryId */}
                    <Select
                        title="Kategori"
                        name="categoryId"
                        data={categories}
                        optionValueKey="id"
                        optionLabelKey="name"
                        value={values.categoryId}
                        onChange={handleChange}
                    />

                    {/* content */}
                    <TextEditor 
                        title='İçerik'
                        name="content"
                        onChange={handleChange('content')}
                        value={values.content}
                        error={errors.content}
                    />


                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </main>
    )
}
