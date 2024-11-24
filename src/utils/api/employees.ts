'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getEmployees = async (page?: number) => {
  const url = new URL(`${API_URL}/api/account/company/users/`);

  if (page) url.searchParams.append('page', page.toString());

  const employees = await fetch(url, {
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  return employees;
}

export const deleteEmployee = async (id: string) => {
  const url = new URL(`${API_URL}/api/account/company/${id}/remove-user/`);
  console.log(id)
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());
  
  console.log(res)
}