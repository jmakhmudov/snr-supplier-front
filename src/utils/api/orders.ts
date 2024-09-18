'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getOrders = async (page?: number,) => {
  const url = new URL(`${API_URL}/api/orders-cart/supplier/orders/`);

  if (page) url.searchParams.append('page', page.toString());

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  return res;
}
