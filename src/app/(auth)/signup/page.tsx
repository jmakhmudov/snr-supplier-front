'use client'

import bg from '@/../public/images/bg.webp';
import SubmitForm from '@/components/SubmitForm';
import Input from "@/components/ui/Input";
import { InputMask } from "@react-input/mask";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { FiPhone } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { signUpAction, verifyCodeAction } from "./actions";
import { inputFields } from "./input-fields";
import Button from '@/components/ui/Buttons/Button';
import Link from 'next/link';

const alertMessages = {
  "back-error": "Сервис временно не доступен, попробуйте позже",
  "already-reg": "Этот номер уже зарегестрирован в системе!"
}


function EnterCode({ phone }: { phone: string }) {
  const [state, verify] = useFormState(verifyCodeAction, {
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  console.log(state)

  useEffect(() => {
    if (state.message === 'error') {
      setShowAlert(true);
    }
  }, [state])



  return (
    <div className="w-full md:w-2/3 px-3.5 md:px-16 pt-5 h-full md:bg-white md:rounded-3xl md:-ml-10 grid place-items-center">
      <form className="w-full space-y-6" action={verify}>
        <h1 className="font-bold text-2xl">Введите код</h1>
        <p className="text-gray-normal">Код был отправлен на номер {phone}</p>

        <input type="tel" name="phone" value={phone.replaceAll(' ', '').replace('+', '')} className="hidden" />

        <div className='space-y-4'>
          <Input
            variant="underlined"
            label="Код"
            alert={showAlert}
            icon={<MdOutlinePassword size={17} />}
            name="code"
            type="text"
            placeholder="Код"
            maxLength={4}
            required
          />

          {showAlert && <div className="text-red-500 text-xs text-center">Неверный код! Попробуйте еще раз.</div>}
        </div>

        <SubmitForm>Подтвердить</SubmitForm>
      </form>
    </div>
  )
}

function SuccessfulRegistration() {
  return (
    <div className="w-full md:w-2/3 px-3.5 md:px-16 pt-5 h-full md:bg-white md:rounded-3xl md:-ml-10 grid place-items-center">
      <div className="w-full">
        <div className='space-y-4'>
          <h1 className="font-bold text-2xl">Вы успешно зарегестрировались!</h1>
          <p className="text-gray-normal text-sm">Теперь вы можете войти в личный кабинет.</p>
        </div>

        <div className='mt-10'>
          <Link href={'/login'}>
            <Button type="submit" className="w-full">Войти</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  const [state, signUp] = useFormState(signUpAction, {
    error: null,
    message: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessageKey, setAlertMessageKey] = useState<'back-error' | 'already-reg'>();

  const handleSignUp = (formData: FormData) => {
    signUp(formData);
  };

  useEffect(() => {
    if (!state.error && state.message === "success") {
      setIsSubmitted(true);
    } else {
      setShowAlert(true);
      setAlertMessageKey(state.error);
    }
  }, [state])


  return (
    <div className="grid mt-10 mb-10">
      <div className="w-full flex items-center justify-between absolute top-0 bottom-0 left-0 right-0">
        <Image
          alt="bg"
          src={bg}
          placeholder="blur"
          className="object-cover object-center w-full h-full hidden md:block"
          priority
        />

        {
          isSubmitted ?
            <SuccessfulRegistration />
            :
            <form className="md:w-2/3 w-full px-3.5 md:px-16 pt-5 h-full md:bg-white md:rounded-3xl md:-ml-10 grid place-items-center" action={handleSignUp}>
              <div className=" w-2/3 space-y-6">
                <h1 className="font-bold text-2xl">Регистрация</h1>

                <div className="md:gap-6 md:flex justify-between">
                  <div className="grid gap-2 w-full">
                    <Input
                      label="Номер телефона"
                      variant="underlined"
                      icon={<FiPhone size={17} />}
                      alert={showAlert && alertMessageKey === "already-reg"}
                      required
                    >
                      <InputMask
                        className="w-full outline-none placeholder-gray-normal bg-transparent"
                        placeholder="+998"
                        name='phone'
                        mask="+998 __ ___ __ __"
                        replacement={{ _: /\d/ }}
                        required
                      />
                    </Input>

                    {
                      inputFields.map((field) => (
                        <Input
                          key={field.name}
                          variant="underlined"
                          {...field}
                        />
                      ))
                    }
                  </div>
                </div>

                {(showAlert && alertMessageKey) && <div className="text-red-500 text-xs text-center">{alertMessages[alertMessageKey]}</div>}

                <div className="space-y-2">
                  <SubmitForm>Далее</SubmitForm>

                  <div className="w-full grid place-items-center">
                    <Link
                      href={'/login'}
                      className="text-xs text-purple underline text-center w-full"
                    >
                      Войти
                    </Link>
                  </div>
                </div>
              </div>
            </form>
        }
      </div>
    </div>
  )
}