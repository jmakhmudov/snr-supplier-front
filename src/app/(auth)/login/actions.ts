"use server"

import { login } from "@/utils/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface FormState {
  message: string;
}

export async function loginAction(
  state: FormState,
  formData: FormData
) {
  console.log(formData)
  console.log(state)
  const data = await login(formData);

  console.log(data)

  if (!data.detail) {
    console.log('logged in');
    cookies().set('access', data.access);
    cookies().set('refresh', data.refresh);
    
    redirect("/")
  }

  return {
    message: 'error'
  }
}