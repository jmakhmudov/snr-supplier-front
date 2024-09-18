'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getOrders = async () => {
  const url = `${API_URL}/api/orders-cart/supplier/orders/`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
  }).then(res => res.json());

  console.log(res)
  return res;
}
