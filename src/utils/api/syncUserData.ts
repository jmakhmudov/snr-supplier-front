'use client'

import { store } from "@/store";
import Cookies from "universal-cookie";

export async function syncUserData() {
  const cookies = new Cookies();

  const updatedUser = await fetch(`/api/account/user/info/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies.get('access')}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

  console.log('up',updatedUser);
  store.user = updatedUser;
  
  return updatedUser;
}