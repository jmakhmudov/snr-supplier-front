'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const addToCart = async (product_id: string) => {
  const url = `${API_URL}/api/v1/clients/basket/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: JSON.stringify({ product_id })
  }).then(res => res.json());

  console.log(res.status)
}

export const remFromCart = async (product_id: string) => {
  const url = `${API_URL}/api/v1/clients/basket/`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: JSON.stringify({ product_id })
  }).then(res => res.json());

  console.log(res.status)
}