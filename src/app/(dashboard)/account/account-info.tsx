'use client'

import { store } from "@/store";
import { logout } from "@/utils/api/auth";
import { Map } from "@pbe/react-yandex-maps";
import { useSnapshot } from "valtio";

export default function AccountInfo() {
  const { user } = useSnapshot(store)

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };
  console.log(user)

  return (
    <section>
      <div>{user.full_name}</div>

      <div className="mt-2 md:mt-1 md:w-1/2 w-full h-full">
        <div className="text-xs text-gray-normal font-medium mb-2">Местоположение магазина</div>
        {/* <Map defaultCoordinates={[user.company.lat, user.company.lon]} disabled/> */}
      </div>
      <div onClick={handleLogout} className="cursor-pointer">Выйти</div>
    </section>
  )
}