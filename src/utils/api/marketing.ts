'use server'

import { StatusType } from "@/components/ui/Status";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getMarketingData = async (page?: number) => {
  const url = new URL(`${API_URL}/api/discount/me/`);

  if (page) url.searchParams.append('page', page.toString());

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());
  
  return res;
}