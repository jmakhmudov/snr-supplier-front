import { signUp, verifyCode } from "@/utils/api/auth";
import Cookies from "universal-cookie";

interface State {
  message: string;
}

export async function signUpAction(
  state: State,
  formData: FormData
): Promise<any> {
  const data = await signUp(formData);

  if (data.error === 'This number is already taken. Please choose a different one.') {
    return {
      error: 'already-reg'
    }
  }

  if (data.data) {
    return {
      ...data,
      message: 'success'
    };
  }
  
  return {
    error: 'back-error'
  }
}

export async function verifyCodeAction(
  state: State,
  formData: FormData
): Promise<any> {
  const data = await verifyCode(formData);

  if (data.message === 'invalid code') {
    return {
      message: 'error'
    }
  }
  const cookies = new Cookies();

  window.location.href = '/';
  const { access, refresh } = data;
  cookies.set('access', access);
  cookies.set('refersh_sup', refresh);
}