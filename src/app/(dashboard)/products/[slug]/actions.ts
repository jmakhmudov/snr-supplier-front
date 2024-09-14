'use server'

import { uploadImage } from "@/utils/api/products"

export default async function uploadImageAction(formData: FormData) {
  console.log('dorm', formData)
  const image = await uploadImage(formData)
}