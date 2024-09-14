'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NewProduct } from "@/types";

const API_URL = process.env.API_URL;

export const getProductBySlug = async (slug: string) => {
  try {
    const _cookies = cookies()
    const product = await fetch(`${API_URL}/api/product/products/${slug}/`, {
      headers: {
        Authorization: `Bearer ${_cookies.get('access')?.value}`
      },
      cache: 'no-store',
    }).then(res => res.json());

    console.log(slug, product);
    revalidatePath(`/`)

    if (!product.detail) {
      return product;
    }

    return {};
  } catch (e) {
    console.error('error while fetching product by id', e);
    return {};
  }
}

export const getProducts = async (page?: number, searchQ?: string) => {
  try {
    let url = new URL(`${API_URL}/api/product/my-company-products/`)
    
    if (searchQ) url.searchParams.append('search', searchQ);
    if (page) url.searchParams.append('page', page.toString());
    
    const products = await fetch(url, {
      headers: {
        Authorization: `Bearer ${cookies().get('access')?.value}`
      },
      cache: 'no-store',
    }).then(res => res.json());

    return products;
  } catch (e) {
    console.error('error while fetching products', e);
    return {
      data: []
    };
  }
}

export const patchProduct = async (field: string, value: string, slug: string) => {
  console.log(slug)
  const res = await fetch(`${API_URL}/api/product/products/${slug}/update/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: JSON.stringify({
      [field]: value
    }),
    cache: 'no-store',
  }).then(res => res.json());

  return res;
}

export const deleteProduct = async (slug: string) => {
  const res = await fetch(`${API_URL}/api/product/products/${slug}/delete/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  });
}

export const createProduct = async (data: FormData) => {
  const newProduct = await fetch(`${API_URL}/api/product/products/create/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: data,
  }).then(res => res.json());
  console.log(newProduct)

  return newProduct;
}

export const uploadImage = async (formData: FormData) => {
  console.log(formData)
  const image = await fetch(`${API_URL}/api/product/product-image/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: formData,
  }).then(res => res.json());
  console.log(image)
}