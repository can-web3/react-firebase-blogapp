import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export const blogValidation = (isEdit = false) => 
  Yup.object({
    image: isEdit
      ? Yup.mixed().nullable()
      : Yup.mixed()
          .required('Resim zorunlu')
          .test(
            'fileFormat',
            'Sadece JPG, PNG, GIF veya WEBP formatı desteklenir',
            (file) => file != null && SUPPORTED_FORMATS.includes((file as File).type)
          ),
    title: Yup.string()
      .min(3, 'Başlık en az 3 karakter olmalı')
      .required('Başlık zorunlu'),
    categoryId: Yup.string()
      .required('Kategori zorunlu'),
    content: Yup.string()
      .min(20, 'İçerik en az 20 karakter olmalı')
      .required('İçerik zorunlu'),
})
