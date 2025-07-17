import * as Yup from 'yup';

export const categoryValidation = Yup.object({
  name: Yup.string()
    .min(3, 'Adı en az 3 karakter olmalı')
    .required('Adı zorunlu'),
});
