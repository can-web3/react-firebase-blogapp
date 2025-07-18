import { toast } from "react-toastify"

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  )
  formData.append("folder", "react-firebase-blogapp")

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )
  if (!res.ok) {
    toast.error('Resim yükleme hatası')
    throw new Error(`Image upload failed: ${res.statusText}`)
  }
  const data = await res.json()
  return data.secure_url as string
}
