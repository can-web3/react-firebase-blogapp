import * as Yup from 'yup';

export const registerValidation = Yup.object({
  username: Yup.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
    .required('Kullanıcı adı zorunlu'),
  email: Yup.string()
    .email('Geçerli bir e-posta giriniz')
    .required('E-posta zorunlu'),
  password: Yup.string()
    .min(6, 'Parola en az 6 karakter olmalı')
    .required('Parola zorunlu'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Parolalar eşleşmiyor')
    .required('Parola (Tekrar) zorunlu'),
});
