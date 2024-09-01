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

  if (data.message === 'number has been already registered in our system, please login using your password') {
    return {
      message: 'already registed'
    }
  }

  return data;
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
  cookies.set('refresh', refresh);
}