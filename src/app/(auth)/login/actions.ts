"use server"

import { login } from "@/utils/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface FormState {
  error: string | null;
}

export async function loginAction(
  state: FormState,
  formData: FormData
) {
  const data = await login(formData);
  console.log(data);
  if (!data.error) {
    cookies().set('access_sup', data.access);
    cookies().set('refersh_sup', data.refresh);
    
    redirect("/")
  }

  return {
    error: data.error
  }
}