'use server'

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;

export const getAddress = async (coordinates: number[]) => {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${YANDEX_API_KEY}&geocode=${coordinates[1]}, ${coordinates[0]}`

  const res = await fetch(url)
  const data = await res.json();
  const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted;
  
  return address;
}