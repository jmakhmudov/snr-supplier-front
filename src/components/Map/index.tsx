'use client'

import { getAddress } from "@/helpers/getAddress";
import { GeolocationControl, Map as YMap, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { useEffect, useState } from "react";

interface MapProps {
  defaultCoordinates?: number[];
  disabled?: boolean;
}

export default function Map({
  defaultCoordinates = [],
  disabled
}: MapProps) {
  const [coordinates, setCoordinates] = useState<number[]>(defaultCoordinates);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (coordinates[0]) {
      handleAddressFetch()
    }
  }, [coordinates])

  const handlePositionSelect = (e: any) => {
    if (!disabled) {
      setCoordinates(e._sourceEvent.originalEvent.coords)
    }
  }

  const handleAddressFetch = async () => {
    const add = await getAddress(coordinates);
    setAddress(add);
  }

  console.log(coordinates)

  return (
    <div className="rounded-md overflow-hidden border border-gray-light">

      <input type="text" name="latitude" value={coordinates[0]} className="hidden" required />
      <input type="text" name="longitude" value={coordinates[1]} className="hidden" required />

      <YMaps
        query={{
          apikey: '6ac6f908-12fc-4194-aa9f-99317ee0e17e'
        }}
      >
        <YMap
          onClick={handlePositionSelect}
          defaultState={{
            center: defaultCoordinates || [41.18, 69.15],
            zoom: 15,
          }}
          className=" min-h-60"
          width={'100%'}
          height={'100%'}
        >
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
        </YMap>
      </YMaps>
    </div>
  )
}