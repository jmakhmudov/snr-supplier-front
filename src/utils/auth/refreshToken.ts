'use client'

import Cookies from 'universal-cookie';

const API_URL = process.env.API_URL;

const cookies = new Cookies();

export const refreshToken = async () => {
  const token = cookies.get('refresh');

  const { detail, access } = await fetch(`${API_URL}/api/core/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: token })
  }).then(res => res.json());
 
  if (detail) {
    return false;
  }

  console.log('ACCESSS', access)
  cookies.set('access', access)
  return access;
}