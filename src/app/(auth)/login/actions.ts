import { login } from "@/utils/auth";
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

  if (!data.error) {
    console.log('logged in');
    const cookies = new Cookies();
    cookies.set('access', data.access);
    
    window.location.href = '/';
    return {
      message: 'success',
    }
  }

  return {
    message: 'error'
  }
}