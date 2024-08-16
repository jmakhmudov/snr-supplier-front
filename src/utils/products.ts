'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getProductById = async (productId: string) => {
  try {
    const products = await fetch(`${API_URL}/api/v1/suppliers/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('access')?.value}`
      }
    }).then(res => res.json());

    if (!products.detail) {
      return products;
    }

    return {};
  } catch (e) {
    console.error('error while fetching product by id', e);
    return {};
  }
}

export const getProducts = async () => {
  try {
    const products = await fetch(`${API_URL}/api/v1/suppliers/products/`, {
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