import { login } from "@/utils/api/auth";
import Cookies from "universal-cookie";

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
    const cookies = new Cookies();
    cookies.set('access', data.access);
    cookies.set('refresh', data.refresh);
    
    window.location.href = '/';
    return {
      message: 'success',
    }
  }

  return {
    message: 'error'
  }
}