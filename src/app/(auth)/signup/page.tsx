'use client'

import bg from '@/../public/images/bg.jpg';
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input";
import { getAddress } from "@/helpers/getAddress";
import { GeolocationControl, Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { InputMask } from "@react-input/mask";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FiPhone } from "react-icons/fi";
import { signUpAction, verifyCodeAction } from "./actions";
import { inputFields } from "./input-fields";
import { MdOutlinePassword } from "react-icons/md";
import SubmitForm from '@/components/SubmitForm';

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
    <div className="w-full md:w-1/2 px-3.5 md:px-16 pt-5 h-full md:bg-white md:rounded-3xl md:-ml-10 grid place-items-center">
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
    if (coordinates[0]) {
      handleAddressFetch()
    }
  }, [coordinates])

  const handleAddressFetch = async () => {
    const add = await getAddress(coordinates);
    setAddress(add);
  }

  return (
    <div className="grid mt-10 mb-10">
      <header className="fixed z-10 top-0 left-0 right-0 p-3.5 md:px-16 flex items-center justify-between">
        <div></div>

        <div>language</div>
      </header>

      <div className="w-full flex items-center justify-between absolute top-0 bottom-0 left-0 right-0">
        <Image
          alt="bg"
          src={bg}
          placeholder="blur"
          className="object-cover w-1/2 h-full hidden md:block"
          quality={50}
          priority
        />

        {
          isSubmitted ?
            <EnterCode phone={phone} />
            :
            <form className="w-full px-3.5 md:px-16 pt-5 h-full md:bg-white md:rounded-3xl md:-ml-10 grid place-items-center" onSubmit={handleSignUp}>
              <div className="w-full space-y-6">
                <h1 className="font-bold text-2xl">Регистрация</h1>

                <div className="md:gap-6 md:flex justify-between">
                  <div className="grid gap-2 w-full md:w-1/2">
                    <Input
                      label="Номер телефона"
                      variant="underlined"
                      icon={<FiPhone size={17} />}
                    >
                      <InputMask
                        name="phone"
                        className="w-full outline-none  placeholder-gray-normal"
                        placeholder="+998"
                        mask="+998 __ ___ __ __"
                        replacement={{ _: /\d/ }}
                        onChange={(e) => setPhone(e.target.value)}
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

                  <input type="text" name="latitude" value={coordinates[0]} className="hidden" required />
                  <input type="text" name="longitude" value={coordinates[1]} className="hidden" required />

                  <div className="mt-2 md:mt-1 md:w-1/2 w-full h-full">
                    <div className="text-xs text-gray-normal font-medium mb-2">Местоположение поставщика</div>
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