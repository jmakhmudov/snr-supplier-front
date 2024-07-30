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