'use client';

import { logout } from '@/utils/api/auth';
import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className='flex flex-col items-center gap-5'>
        <h1>Что-то пошло не так!</h1>
        <p className='font-mono'>{error.message || 'An unexpected error occurred.'}</p>
        <a
          href={`/`}
          className="text-blue underline"
        >
          Попробовать еще раз
        </a>

        <button
          onClick={handleLogout}
          className='text-purple'
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
