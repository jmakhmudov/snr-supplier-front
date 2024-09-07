'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await fetch(`${API_URL}/api/product/products/${slug}/`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access')?.value}`
      }
    }).then(res => res.json());
    console.log(slug, product);
    if (!product.detail) {
      return product;
    }

    return {};
  } catch (e) {
    console.error('error while fetching product by id', e);
    return {};
  }
}

export const getProducts = async () => {
  try {
    const products = await fetch(`${API_URL}/api/product/my-company-products/`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access')?.value}`
      }
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
    })
  }).then(res => res.json());
  
  return res;
}