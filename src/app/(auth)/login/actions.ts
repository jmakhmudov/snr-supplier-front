'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

interface Response {
  access: string;
  user: string;
}

export async function login(formData: FormData) {
  console.log(formData)
  const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
  formData.set('phone', phone);

  const response = await fetch(`${API_URL}/api/v1/clients/login/`, {
    method: 'POST',
    body: formData
  });

  const c = cookies();
  const data: Response = await response.json();
  console.log(data)
  if (response.status === 200) {
    c.set('access', data.access)
  }
  console.log(response.status);
}