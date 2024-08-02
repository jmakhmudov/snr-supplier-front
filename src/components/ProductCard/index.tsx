'use client'

import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { BsLightningChargeFill, BsThreeDots } from "react-icons/bs"
import { FiCheck } from "react-icons/fi"

interface ProductProps {
  product: Product
}

export default function ProductCard({
  product
}: ProductProps) {
  const [showOptions, setShowOptions] = useState(false);
  const handleMoreOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    setShowOptions(!showOptions);
  }

  return (
    <Link
      href={`/products/${product.uuid}`}
      className="bg-white p-3 grid gap-3 rounded-xl hover:shadow-sm select-none relative"
    >
      <div title="В топе" className="absolute top-0 left-0 p-3 text-blue flex items-center gap-2 group">
        <BsLightningChargeFill className="animate-pulse-slow" />
        <div className=" group-hover:text-blue group-hover:ml-0 transition-all duration-300 text-xs font-medium text-transparent -ml-5">В топе</div>
      </div>

      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Image
            src={product.picture.picture}
            alt={product.name}
            width={150}
            height={150}
            className="object-cover rounded-lg"
          />

          <div className="flex items-center justify-between gap-1">
            <div className="bg-blue-light text-blue rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">В продаже</div>

            <div
              data-showOptions={showOptions}
              className="bg-gray-light-0 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-light data-[showOptions=true]:bg-gray-light relative"
              onClick={handleMoreOptions}
            >
              <div
                data-showOptions={showOptions}
                className="hidden absolute -right-24 bottom-0 bg-gray-light-0 rounded-lg text-xs overflow-hidden data-[showOptions=true]:block border border-gray-light"
              >
                <div className="px-3 py-1.5 hover:bg-gray-light border-b border-gray-light flex items-center gap-1">
                  <FiCheck />
                  Активный
                </div>
                <div className="px-3 py-1.5 hover:bg-gray-light flex items-center gap-1">
                  Неактивный
                </div>
              </div>
              <BsThreeDots />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <div className="text-xs font-semibold line-clamp-3">{product.name}</div>

          <div className="grid gap-1">
            <ProductData label="Рейтинг" value="0" />
            <ProductData label="Просмотры" value="0" />
            <ProductData label="Конверсия" value="0%" />
            <ProductData label="Продано" value="0" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-1">
          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">На складе 0</div>

          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">К отправке 0</div>
        </div>

        <div className="font-semibold text-sm text-center">от {Number(product.price).toLocaleString('ru')} сум</div>
      </div>

    </Link>
  )
}

function ProductData({
  label,
  value,
}: {
  label: string,
  value: string
}) {
  return (
    <div className="flex items-center justify-between text-gray-normal text-[10px]">
      {label}
      <span className="text-black">{value}</span>
    </div>
  )
}
