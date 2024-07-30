'use client'

import Button from "@/components/Buttons/Button";
import { InputMask } from "@react-input/mask";
import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";
import bg from '@/../public/images/bg.jpg'
import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const { pending } = useFormStatus()
  const formSubmit = async (formData: FormData) => {
    await login(formData);
    window.location.href = '/';
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 p-3.5 md:px-16 flex items-center justify-between z-10">
        <div className="text-sm font-semibold">RU</div>

        <Link href={'/signup'}>
          <Button className="w-auto">Регистрация</Button>
        </Link>
      </header>

      <div className="w-full flex items-center justify-between absolute top-0 bottom-0 left-0 right-0">
        <Image
          alt="bg"
          src={bg}
          placeholder="blur"
          className="object-cover w-1/2 h-screen hidden md:block"
          quality={50}
          priority
        />

        <form className="space-y-6 w-full md:w-1/2 px-3.5 md:px-16" action={formSubmit}>
          <h1 className="font-bold text-2xl">Вход в систему</h1>

          <div className="space-y-4">
            <InputMask
              name="phone"
              className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
              placeholder="+998"
              mask="+998 __ ___ __ __"
              replacement={{ _: /\d/ }}
              defaultValue={'+998'}
              onChange={(e) => console.log(e.target.value.replaceAll(' ', '').replace('+', ''))}
            />

            <input
              type="password"
              name="password"
              className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
            />

            <Button type="submit" disabled={pending}>Войти</Button>

            <div className="w-full grid place-items-center">
              <Link href={'/recover'} className="text-xs text-purple font-semibold text-center w-full">Забыли пароль?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}