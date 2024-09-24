'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export interface Analytics {
  total_revenue: number;
  top_buyers: {
    name: string;
    order_count: number;
    total_amount: number;
  }[];
  total_views: number;
  total_sold: number;
  order_status_stats: {
    status: string;
    count: number;
  }[];
  start_date: string;
  end_date: string;
}

export const getAnalytics = async () => {
  const url = `${API_URL}/api/orders-cart/supplier/orders/stats/`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
  }).then(res => res.json());

  return res;
}

export const createDiscount = async (data: FormData) => {
  const url = `${API_URL}/api/discount/create/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: data,
  }).then(res => res.json());
  console.log(res)
  return res;
}

export const stopDisountCampaign = async (id: number) => {
  const res = await fetch(`${API_URL}/api/discount/update/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    body: JSON.stringify({
      is_active: false
    }),
    cache: 'no-store',
  }).then(res => res.json());

  return res;
}