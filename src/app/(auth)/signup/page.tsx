'use client'

import Button from "@/components/Buttons/Button";
import { InputMask } from "@react-input/mask";
import { signUpAction, verifyCode } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import Link from "next/link";
import { getAddress } from "@/helpers/getAddress";

function EnterCode({ phone }: { phone: string }) {
  const [state, verify] = useFormState(verifyCode, null);
  console.log(state)

  if (state) {
    const { access } = state;
    const cookies = new Cookies();
    cookies.set('access', access);
    window.location.href = '/';
  }

  return (
    <div className="grid place-items-center mb-10">
      <form className="w-full space-y-6" action={verify}>
        <h1 className="font-bold text-2xl">Введите код</h1>
        <p className="text-gray-normal">Код был отправлен на номер {phone}</p>
        <div className="space-y-1">
          <label htmlFor="code" className="text-xs text-gray-normal font-medium">Код</label>
          <input
            name="code"
            type="text"
            className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
            placeholder="Код"
          />
        </div>

        <input type="tel" name="phone" value={phone.replaceAll(' ', '').replace('+', '')} className="hidden" />
        <Button className="mt-3" type="submit">Подтвердить</Button>
      </form>
    </div>
  )
}

export default function SignUpPage() {
  const [state, signUp] = useFormState(signUpAction, null);
  const { pending } = useFormStatus();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [coordinates, setCoordinates] = useState<string[]>([])
  const [address, setAddress] = useState('');

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    signUp(formData);
  };
  console.log(coordinates)

  useEffect(() => {
    if (state) {
      setIsSubmitted(true);
    }
  }, [state])


  useEffect(() => {
    handleAddressFetch()
  }, [coordinates])

  const handleAddressFetch = async () => {
    const add = await getAddress(coordinates);
    setAddress(add);
  }

  if (isSubmitted) {
    return <EnterCode phone={phone} />;
  }

  return (
    <div className="grid mt-10 mb-10">
      <header className="fixed top-0 left-0 right-0 p-3.5 md:px-16 flex items-center justify-between bg-white">
        <div className="text-sm font-semibold">RU</div>

        <Link href={'/login'}>
          <Button className="w-auto">Войти</Button>
        </Link>
      </header>

      <form className="w-full space-y-6" onSubmit={handleSignUp}>
        <h1 className="font-bold text-2xl">Регистрация</h1>

        <div className="md:gap-6 md:flex justify-between">
          <div className="grid gap-2 w-full md:w-1/2">
            <div className="space-y-1">
              <label htmlFor="password" className="text-xs text-gray-normal font-medium">Номер телефона</label>
              <InputMask
                name="phone"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="+998"
                mask="+___ __ ___ __ __"
                replacement={{ _: /\d/ }}
                defaultValue={'+998'}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="full_name" className="text-xs text-gray-normal font-medium">ФИО</label>
              <input
                name="full_name"
                type="text"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="ФИО"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="inn" className="text-xs text-gray-normal font-medium">ИНН</label>
              <input
                name="inn"
                type="text"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="ИНН"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="company_name" className="text-xs text-gray-normal font-medium">Название магазина</label>
              <input
                name="company_name"
                type="text"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="Название магазина"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-xs text-gray-normal font-medium">Пароль</label>
              <input
                name="password"
                type="password"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="Пароль"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-xs text-gray-normal font-medium">Подтвердите пароль</label>
              <input
                name="password"
                type="password"
                className="w-full outline-none border border-gray-light p-3 px-3.5 text-sm rounded-md placeholder-gray-light"
                placeholder="Пароль"
              />
            </div>
          </div>

          <input type="text" name="latitude" value={coordinates[0]} className="hidden" required />
          <input type="text" name="longitude" value={coordinates[1]} className="hidden" required />

          <div className="mt-2 md:mt-1 md:w-1/2 w-full h-full">
            <div className="text-xs text-gray-normal font-medium mb-2">Местоположение магазина</div>
            <div className="rounded-md overflow-hidden border border-gray-light">
              <YMaps
                query={{
                  apikey: '6ac6f908-12fc-4194-aa9f-99317ee0e17e'
                }}
              >
                <Map onClick={(e: any) => setCoordinates(e._sourceEvent.originalEvent.coords)} defaultState={{
                  center: [41.18, 69.15],
                  zoom: 10,
                }} className=" min-h-96" width={'100%'} height={'100%'}>
                  <GeolocationControl options={{ float: "left" }} />
                  {coordinates && <Placemark
                    modules={["geoObject.addon.balloon"]}
                    properties={{
                      balloonContentHeader: 'Выбранное местоположение',
                      balloonContentBody: address,
                      balloonContentFooter: coordinates.join(', ')
                    }}
                    geometry={coordinates}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: '/images/balloon.svg',
                      iconImageSize: [40, 45.5],
                      iconImageOffset: [-15, -42],
                    }}

                  />}
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
        <Button className="mt-3" type="submit" disabled={pending}>Далее</Button>
      </form>
    </div>
  )
}