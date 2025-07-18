'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.API_URL;

export const logout = async () => {
  cookies().delete('access_sup');
  cookies().delete('refersh_sup');
  redirect("/")
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
  try {
    const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
    formData.set('username', phone);

    const data = await fetch(`${API_URL}/api/core/token/supplier/`, {
      method: 'POST',
      body: formData
    });

    if (data.status === 400) {
      return {
        error: 'unauthorized'
      };
    }

    return await data.json();
  } catch (error) {
    return {
      error: 'back-error'
    };
  }
}


export const signUp = async (formData: FormData) => {
  try {
    const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
    formData.set('username', phone);
    formData.set('is_supplier', 'true');
  
    const data = await fetch(`${API_URL}/api/account/register/`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
  
    console.log(data);
  
    return data;
  } catch (error) {
    return {
      error: 'back-error'
    };
  }
}

export const verifyCode = async (formData: FormData) => {
  const data = await fetch(`${API_URL}/api/core/token/verify/`, {
    method: 'POST',
    body: formData
  }).then(res => res.json());

  console.log(data);

  return data;
}


export const getUser = async () => {
  const updatedUser = await fetch(`${API_URL}/api/account/user/info/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  return updatedUser;
}