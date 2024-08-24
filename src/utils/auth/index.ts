'use server'

import { cookies } from 'next/headers';

const API_URL = process.env.API_URL;

export const logout = async () => {
  cookies().delete('access');
  cookies().delete('refresh');
}

export const verifyToken = async (token: string) => {
  if (!token) {
    return false;
  }

  const { detail } = await fetch(`${API_URL}/api/core/token/verify/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token })
  }).then(res => res.json());

  if (detail) {
    return false;
  }

  return true;
}

export const refreshToken = async (refreshToken: string) => {
  const { detail, access } = await fetch(`${API_URL}/api/core/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken })
  }).then(res => res.json());
 
  if (detail) {
    return false;
  }

  console.log('ACCESSS', access)
  return access;
}

export const login = async (formData: FormData) => {
  const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
  formData.set('username', phone);

  const data = await fetch(`${API_URL}/api/core/token/`, {
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
  const data = await fetch(`${API_URL}/api/core/token/verify/`, {
    method: 'POST',
    body: formData
  }).then(res => res.json());
  
  console.log(data);

  return data;
}