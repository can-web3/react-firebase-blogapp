import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import BtnPrimary from "../../components/BtnPrimary";
import Logo from "../../components/Logo";
import { loginValidation } from "../../validations/auth/LoginValidation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const { values, errors, isSubmitting, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            if(await login(values)){
                const from = location.state?.from?.pathname || '/';
                navigate(from)
            }
        }
    })

    return (
        <div className="container my-5">
            <div className="max-w-[640px] mx-auto border border-orange-600 px-4 py-6">
                <Logo className="mx-auto mb-6" />
                <h1 className="text-center text-xl font-semibold mb-2">Giriş Yap</h1>
                <p className="text-center text-gray-600 font-medium text-sm">Giriş yapmak için lütfen aşağıdaki formu doldurunuz</p>

                {/* form */}
                <form onSubmit={handleSubmit} className="form">
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

                    <BtnPrimary 
                        isSubmitting={isSubmitting}
                    />
                </form>
            </div>
        </div>
    )
}
