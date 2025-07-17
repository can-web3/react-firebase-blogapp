import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import BtnPrimary from "../../components/BtnPrimary";
import Logo from "../../components/Logo";
import { registerValidation } from "../../validations/auth/RegisterValidation";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Register() {
    const navigate = useNavigate()
    const { createUser } = useContext(UserContext)
    const { login } = useContext(AuthContext)
    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repassword: '',
        },
        validationSchema: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await createUser(values)){
                await login()
                navigate('/giris-yap')
            }
        }
    })

    return (
        <div className="container my-5">
            <div className="max-w-[640px] mx-auto border border-orange-600 px-4 py-6">
                <Logo className="mx-auto mb-6" />
                <h1 className="text-center text-xl font-semibold mb-2">Kayıt Ol</h1>
                <p className="text-center text-gray-600 font-medium text-sm">Kayıt olmak için lütfen aşağıdaki formu doldurunuz</p>

                {/* form */}
                <form onSubmit={handleSubmit} className="form">
                    {/* username */}
                    <FormInput 
                        title="Kullanıcı Adı"
                        name="username"
                        onChange={handleChange('username')}
                        value={values.username}
                        error={errors.username}
                    />
                    
                    {/* email */}
                    <FormInput
                        type="email" 
                        title="E-posta"
                        name="email"
                        onChange={handleChange('email')}
                        value={values.email}
                        error={errors.email}
                    />

                    {/* password */}
                    <FormInput
                        type="password" 
                        title="Parola"
                        name="password"
                        onChange={handleChange('password')}
                        value={values.password}
                        error={errors.password}
                    />

                    {/* repassword */}
                    <FormInput 
                        type="password" 
                        title="Parola (Tekrar)"
                        name="repassword"
                        onChange={handleChange('repassword')}
                        value={values.repassword}
                        error={errors.repassword}
                    />

                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}
