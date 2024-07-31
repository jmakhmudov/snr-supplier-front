'use server'

import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

export const logout = async () => {
  cookies().delete('access');
  cookies().delete('refresh');
}

export const verifyToken = async () => {
  const token = cookies().get('access')?.value;

  if (!token) {
    return false;
  }

  const { status } = await fetch(`${API_URL}/api/v1/clients/token-verify/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  }).then(res => res.json());

  if (!status) {
    return false;
  }

  return true;
}

export const login = async (formData: FormData) => {
  const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
  formData.set('phone', phone);

  const data = await fetch(`${API_URL}/api/v1/suppliers/login/`, {
    method: 'POST',
    body: formData
  }).then(res => res.json());

  console.log(data);

  return data;
}

export const signUp = async (formData: FormData) => {
  const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
  formData.set('phone', phone);

  const data = await fetch(`${API_URL}/api/v1/clients/new/`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())

  console.log(data);

  return data;
}

export const verifyCode = async (formData: FormData) => {
  const data = await fetch(`${API_URL}/api/v1/clients/verify/`, {
    method: 'POST',
    body: formData
  }).then(res => res.json());
  
  console.log(data);

  return data;
}