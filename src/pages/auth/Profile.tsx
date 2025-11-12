import { useContext, useEffect, useState } from "react"
import AuthContext from "../../contexts/AuthContext";
import Seo from "../../components/Seo";
import FormInput from "../../components/FormInput";
import { useFormik } from "formik";
import BlogContext from "../../contexts/BlogContext";
import Loading from "../../components/Loading";
import Blogs from "../../components/Blogs";

export default function Profile() {
    const { auth } = useContext(AuthContext);
    const { getBlogsByBlogIds, blogs, getBlogsCommentsByUserId, loading } = useContext(BlogContext);
    const [selectedTab, setSelectedTab] = useState<'favorites' | 'comments'>('favorites');

    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            username: auth?.username || '',
            email: auth?.email || '',
            password: '',
            repassword: '',
        },
        // validationSchema: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // await updateProfile(values)
        }
    })

    useEffect(() => {
        if(auth?.favorites){
            getBlogsByBlogIds(auth.favorites)
        }
    }, [])

    if(loading)
        return <Loading />

    return (
        <div className="container my-5">
            <Seo
                title="Profilim"
                description="Kullanıcı profil sayfası"
                robots="noindex,nofollow"
            />

            <h1>Hoşgeldin, {auth?.username}</h1>

            <form onSubmit={handleSubmit} className="border border-gray-400 rounded-md p-4 my-4">
                <h2 className="mb-4">Profil Bilgileri</h2>

                <div className="grid grid-cols-2 gap-4">
                    {/* username */}
                    <FormInput 
                        title="Kullanıcı Adı"
                        name="username"
                        onChange={handleChange('username')}
                        value={values.username}
                        error={errors.username}
                        disabled={true}
                    />
                    
                    {/* email */}
                    <FormInput
                        type="email" 
                        title="E-posta"
                        name="email"
                        onChange={handleChange('email')}
                        value={values.email}
                        error={errors.email}
                        disabled={true}
                    />
                </div>
            </form>

            <h2 className="mt-6">Favorilerim</h2>

            <div className="mt-6">
                <Blogs blogs={blogs} loading={loading} />
            </div>
        </div>
    )
}
