'use client'

import Image from "next/image";
import logo from '@/../public/images/snr-logo.svg';
import { logout } from "@/utils/api/auth";

export default function WaitingPage() {
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      <div>
        <Image
          src={logo}
          alt="S&R logo"
          className='w-16'
        />
      </div>

      <div className=" text-center grid place-items-center w-full">
        <div className="text-2xl font-semibold">Ожидайте добавления...</div>
        <div className="w-full md:w-1/3">Доступ к личному кабинету компании отсутствует. Попросите добавить вас, указав ваш номер телефона.</div>
      </div>

      <div className="space-y-3 grid place-items-center">
        <div className=" font-medium"><span className="text-gray-normal font-normal">Поддержка:</span> +998 99 299 32 33</div>
        <div className="cursor-pointer text-blue font-medium" onClick={handleLogout}>Выйти</div>
      </div>

    </div>
  )
}
