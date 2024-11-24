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
        Authorization: `Bearer ${_cookies.get('access_sup')?.value}`
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
        Authorization: `Bearer ${cookies().get('access_sup')?.value}`
      },
      cache: 'no-store',
      credentials: 'include',
    }).then(res => res.json());

    return products;
  } catch (e) {
    console.error('error while fetching products', e);
    return {
      results: []
    };
  }
}

export const updateProduct = async (formData: FormData) => {
  console.log(formData);
  
  const res = await fetch(`${API_URL}/api/product/products/${formData.get("id")}/update/`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    body: formData,
    cache: 'no-store',
  }).then(res => res.json());

  return res;
}

export const patchProduct = async (field: string, value: string, id: number) => {
  console.log(id)
  const res = await fetch(`${API_URL}/api/product/products/${id}/update/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    body: JSON.stringify({
      [field]: value
    }),
    cache: 'no-store',
  }).then(res => res.json());

  return res;
}

export const deleteProduct = async (slug: number) => {
  const res = await fetch(`${API_URL}/api/product/products/${slug}/delete/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    cache: 'no-store',
  });
}

export const createProduct = async (data: FormData) => {
  const newProduct = await fetch(`${API_URL}/api/product/products/create/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    body: data,
  }).then(res => res.json());
  console.log(JSON.stringify(newProduct))

  return newProduct;
}

export const uploadImage = async (formData: FormData) => {
  console.log(formData)
  const image = await fetch(`${API_URL}/api/product/product-image/upload/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    body: formData,
  }).then(res => res.json());
  console.log(image)
}


export const getProductList = async () => {
  let url = new URL(`${API_URL}/api/product/short-list/`)

  const products = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  return products;
}

export const uploadExcel = async (formData: FormData) => {
  let url = new URL(`${API_URL}/api/product/upload-products/`)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    body: formData,
    cache: 'no-store',
  })

  return res.status === 201
}


export const removeImage = async (id: number) => {
  const url = new URL(`${API_URL}/api/product/product-image/delete/${id}/`)

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    cache: 'no-store',
  })

  return res.status === 204;
}