'use client'

import { store } from "@/store";
import { logout } from "@/utils/auth";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useSnapshot } from "valtio";

export default function AccountInfo() {
  const { user } = useSnapshot(store)

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <section>
      <div>{user.full_name}</div>
      <div>{user.company_name}</div>

      <div className="mt-2 md:mt-1 md:w-1/2 w-full h-full">
        <div className="text-xs text-gray-normal font-medium mb-2">Местоположение магазина</div>
        <div className="rounded-md overflow-hidden border border-gray-light">
          <YMaps
            query={{
              apikey: '6ac6f908-12fc-4194-aa9f-99317ee0e17e'
            }}
          >
            <Map defaultState={{
              center: [Number(user.longtitude), Number(user.latitude)],
              zoom: 10,
            }} className=" min-h-96" width={'100%'} height={'100%'}>
              <Placemark
                modules={["geoObject.addon.balloon"]}
                geometry={[Number(user.latitude), Number(user.longtitude)]}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/images/balloon.svg',
                  iconImageSize: [40, 45.5],
                  iconImageOffset: [-15, -42],
                }}
              />
            </Map>
          </YMaps>
        </div>
      </div>
      <div onClick={handleLogout} className="cursor-pointer">Выйти</div>
    </section>
  )
}