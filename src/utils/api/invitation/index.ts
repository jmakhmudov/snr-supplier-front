'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const acceptInvitation = async (token: string) => {
  const data = await fetch(`${API_URL}/api/account/invitations/accept/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  }).then(res => res.json())

  return data.detail === "Invitation accepted successfully";
}

export const getInvitationInfo = async (token: string) => {
  const data = await fetch(`${API_URL}/api/account/invitation/${token}/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return data;
}

export const createInvitation = async (formData: FormData) => {
  const data = await fetch(`${API_URL}/api/account/invitations/create/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies().get('access_sup')?.value}`,
    },
    body: formData
  }).then(res => res.json())
  console.log(data)
  return data;
}