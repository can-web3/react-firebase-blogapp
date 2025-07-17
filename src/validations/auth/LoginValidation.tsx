import * as Yup from 'yup';

export const loginValidation = Yup.object({
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-posta zorunlu'),
  password: Yup.string()
    .min(6, 'Parola en az 6 karakter olmalı')
    .required('Parola zorunlu'),
  repassword: Yup.string()
});
