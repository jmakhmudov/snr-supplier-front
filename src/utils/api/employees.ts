'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getEmployees = async (page?: number) => {
  const url = new URL(`${API_URL}/api/account/company/users/`);

  if (page) url.searchParams.append('page', page.toString());

  const employees = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  return employees;
}