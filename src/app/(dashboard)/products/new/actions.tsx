'use server'

import { createProduct } from "@/utils/api/products";

export async function createProductAction(
  formData: FormData,
) {
  const is_active = formData.get('is_active') === 'В продаже';
  formData.set('is_active', is_active as unknown as string);
  console.log(formData);

  const newProduct = await createProduct(formData);

  return newProduct;
}