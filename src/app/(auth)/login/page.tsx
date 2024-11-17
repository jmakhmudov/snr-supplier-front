'use client'

import bg from '@/../public/images/bg.webp';
import Input from "@/components/ui/Input";
import SubmitForm from "@/components/SubmitForm";
import { InputMask } from "@react-input/mask";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FiLock, FiPhone } from "react-icons/fi";
import { FormState, loginAction } from "./actions";

export default function LoginPage() {
  const [formState, formAction] = useFormState(loginAction, {
    message: 'init'
  } as FormState);
  const [showAlert, setShowAlert] = useState(false);

  console.log(formState, 'formstate')

  useEffect(() => {
    if (formState.message === 'error') {
      setShowAlert(true);
    }
  }, [formState]);

  return (
    <div>
      <div className="w-full flex items-center justify-between absolute top-0 bottom-0 left-0 right-0">
        <Image
          alt="bg"
          src={bg}
          placeholder="blur"
          className="object-cover object-center w-full h-screen hidden md:block"
          priority
        />

        <form
          className="w-full md:w-2/3 px-3.5 md:px-16 h-full grid place-items-center md:bg-white md:rounded-3xl md:-ml-10"
          action={formAction}
        >
          <div className="space-y-6 w-2/3">
            <div className="space-y-2">
              <h1 className="font-semibold text-2xl">Здравствуйте!</h1>
              <p className="opacity-60 text-sm">Введите номер телефона и пароль для входа</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Номер телефона"
                alert={showAlert}
                variant="underlined"
                icon={<FiPhone size={17} />}
              >
                <InputMask
                  name="phone"
                  className="w-full outline-none  placeholder-gray-normal bg-transparent"
                  placeholder="+998"
                  mask="+___ __ ___ __ __"
                  replacement={{ _: /\d/ }}
                  defaultValue="+998"
                  required
                />
              </Input>

              <Input
                variant="underlined"
                label="Пароль"
                alert={showAlert}
                icon={<FiLock size={17} />}
                name="password"
                type="password"
                placeholder="********"
                required
              />


              {showAlert && <div className="text-red-500 text-xs text-center">Неверный логин или пароль!</div>}

              <div className="w-full grid place-items-center">
                <Link
                  href={'/recover'}
                  className="text-xs text-gray-normal underline text-center w-full"
                >
                  Забыли пароль?
                </Link>
              </div>

              <SubmitForm>Войти</SubmitForm>

              <div className="w-full grid place-items-center">
                <Link
                  href={'/signup'}
                  className="text-xs text-purple underline text-center w-full"
                >
                  Зарегестрироваться
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
