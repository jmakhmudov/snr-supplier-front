'use client'

import Map from "@/components/Map";
import { store } from "@/store";
import { logout } from "@/utils/auth";
import { useSnapshot } from "valtio";

export default function AccountInfo() {
  const { user } = useSnapshot(store)

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  console.log(user)
  console.log([user.latitude, user.longitude])

  return (
    <section>
      <div>{user.full_name}</div>
      <div>{user.company_name}</div>

      <div className="mt-2 md:mt-1 md:w-1/2 w-full h-full">
        <div className="text-xs text-gray-normal font-medium mb-2">Местоположение магазина</div>
        <Map defaultCoordinates={[user.latitude, user.longitude]} disabled/>
      </div>
      <div onClick={handleLogout} className="cursor-pointer">Выйти</div>
    </section>
  )
}