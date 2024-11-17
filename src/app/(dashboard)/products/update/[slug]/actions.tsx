'use server'

import { updateProduct } from "@/utils/api/products";

export async function updateProductAction(
  formData: FormData,
) {
  const is_active = formData.get('is_active') === 'В продаже';
  formData.set('is_active', is_active as unknown as string);
  console.log(formData);

  const newProduct = await updateProduct(formData);

  return newProduct;
}