'use server'

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error('API_URL is not defined in the environment variables');
}

interface State {
  error: string | null;
  data: [
    {
      [key: string]: any
    }
  ] | null;
}

interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export async function signUpAction(
  state: State,
  formData: FormData
): Promise<any> {
  try {
    const phone = (formData.get('phone') as string).replace(/\s+/g, '').replace('+', '');
    formData.set('phone', phone);

    console.log('FormData before sending:', formData);

    const response = await fetch(`${API_URL}/api/v1/clients/new/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      try {
        const errorData: ErrorResponse = await response.json();
        console.error('Error response data:', JSON.stringify(errorData));
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType && contentType.includes('text')) {
      return await response.text();
    } else {
      return response.body;
    }
  } catch (error) {
    console.error('Error in signUpAction:', error);
    return null;
  }
}

export async function verifyCode(
  state: State,
  formData: FormData
): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/v1/clients/verify/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      try {
        const errorData: ErrorResponse = await response.json();
        console.error('Error response data:', JSON.stringify(errorData));
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType && contentType.includes('text')) {
      return await response.text();
    } else {
      return response.body;
    }
  } catch (error) {
    console.error('Error in verify:', error);
    return null;
  }
}