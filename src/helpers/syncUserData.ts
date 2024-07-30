'use client'

import { store } from "@/store";
import Cookies from "universal-cookie";

export async function syncUserData() {
  const updatedUser = await fetch(`/api/v1/clients/me/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${new Cookies().get('access')}`
    }
  }).then(res => res.json());

  store.user = updatedUser;
}