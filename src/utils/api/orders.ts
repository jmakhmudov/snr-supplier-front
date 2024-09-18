'use server'

import { StatusType } from "@/components/ui/Status";
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

export const updateOrderStatus = async (id: number, status: StatusType) => {
  const url = new URL(`${API_URL}/api/orders-cart/orders/${id}/status/`);

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: JSON.stringify({ status }),
    cache: 'no-store',
  }).then(res => res.json());
  
  return res.status;
}
