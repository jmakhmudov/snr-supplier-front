'use client'

import Map from "@/components/Map";
import { store } from "@/store";
import { User } from "@/types";
import { logout } from "@/utils/api/auth";
import Image from "next/image";
import { memo } from "react";
import { useSnapshot } from "valtio";

interface AccountInfoProps {
  user: User;
}

export default function AccountInfo({
  user
}: AccountInfoProps) {

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  console.log(user)

  return (
    <section className="mt-10 bg-white p-6 px-10 rounded-lg">
      <div className="space-y-8">
        <div className=" w-full">
          <h4 className="font-semibold mb-2">Личная информация</h4>
          <div className="grid grid-cols-3 w-full gap-4 gap-x-8">
            <InfoBox title="ФИО" value={user.full_name} />
            <InfoBox title="Номер телефона" value={`+${user.username}`} />
            <InfoBox title="Роль" value={user.role} />
          </div>
        </div>

        <div className="w-full space-y-4">
          <h4 className="font-semibold mb-2">О компании</h4>
          {
            user.company ?
              (<div className="grid grid-cols-3 w-full gap-4 gap-x-8">
                <div className="h-24 w-24 bg-gray-light relative border border-gray-light-0">
                  {
                    user.company.logo &&
                    <Image
                      src={user.company.logo}
                      alt="logo"
                      className="object-contain"
                      width={250}
                      height={250}
                    />
                  }
                </div>
                <InfoBox title="Название компании" value={user.company?.company_profile} />
                <InfoBox title="ИНН компании" value={user.company?.inn} />
                <div></div>
                <InfoBox title="Номер телефона компании" value={user.company?.phone_number} />

                {
                  user.company &&
                  <div className="mt-2 md:mt-1 w-full h-full">
                    <div className="text-xs text-gray-normal font-medium mb-2">Местоположение компании</div>
                    {
                      (user.company.lat && user.company.lon) &&
                      <Map defaultCoordinates={[user.company.lat, user.company.lon]} disabled />
                    }
                  </div>
                }
              </div>)
              : 
              <div>Компания отсутствует</div>
          }
        </div>
      </div>

      <div onClick={handleLogout} className="cursor-pointer">Выйти</div>
    </section>
  )
}


const InfoBox = ({
  title,
  value
}: {
  title: string,
  value: string | undefined
}) => {
  return (
    <div className="mt-2 md:mt-1 md:w-1/2 w-full">
      <div className="text-xs text-gray-normal font-medium mb-1">{title}</div>
      <div className="text-sm">{value}</div>
    </div>
  )
}