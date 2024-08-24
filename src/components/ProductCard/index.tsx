'use client'

import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { memo, useMemo, useState } from "react"

import { BsLightningChargeFill, BsThreeDots } from "react-icons/bs"
import { FiCheck } from "react-icons/fi"
import { FaStar } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";

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
      data-blocked={product.is_blocked}
      className="bg-white p-3 grid gap-3 rounded-xl hover:shadow-sm select-none relative overflow-hidden data-[blocked=true]:border data-[blocked=true]:border-red-200"
    >
      {
        product.is_blocked &&
        <div
          className="absolute top-0 bottom-0 right-0 left-0 grid place-items-center bg-red-500 bg-opacity-10 z-10 backdrop-blur-sm font-semibold text-red-500"
        >
          <div className="flex items-center gap-2">
            <MdBlock />
            Заблокирован
          </div>
        </div>
      }
      <div className="absolute top-0 left-0 p-5 grid gap-2">
        {
          !product.is_top &&
          <div title="В топе" className="flex items-center gap-2 group text-blue">
            <BsLightningChargeFill />

            <div className=" group-hover:text-blue group-hover:ml-0 transition-all duration-300 text-xs font-medium text-transparent -ml-5">В топе</div>
          </div>
        }

        {
          product.discount &&
          <div title="На акции" className="flex items-center gap-2 group text-orange-500">
            <RiDiscountPercentFill />

            <div className=" group-hover:text-orange-500 group-hover:ml-0 transition-all duration-300 text-xs font-medium text-transparent -ml-5">На акции</div>
          </div>
        }
      </div>

      <div className="flex gap-3">
        <div className="grid gap-2 w-1/2">
          <Image
            src={product.picture.picture}
            alt={product.name}
            width={150}
            height={150}
            className="object-cover w-[150px] aspect-square rounded-lg border border-gray-light"
          />

          <div className="flex items-center justify-between gap-1">
            {
              product.is_active ?
                <div className="bg-blue-light text-blue rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">Активен</div>
                :
                <div className="bg-red-100 text-red-500 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">Неактивен</div>
            }

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
          <div className="text-xs font-semibold line-clamp-3 min-h-12">{product.name}</div>

          <div className="grid gap-1">
            <ProductData label="Рейтинг" value={product.rating} icon={<FaStar size={8} />} />
            <ProductData label="Просмотры" value={product.views} icon={<IoMdEye size={10} />} />
            <ProductData label="Конверсия" value={`${product.conversion}%`} />
            <ProductData label="Продано" value={`${product.quantity_sold} шт.`} />
            <ProductData label="Скидка" value={`${product.discount}%`} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-1">
          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">На складе {product.stock}</div>

          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">К отправке 0</div>
        </div>

        <div className="font-semibold text-sm text-center">от {Number(product.price).toLocaleString('ru')} сум</div>
      </div>

    </Link>
  )
}

const  ProductData = memo(({
  label,
  value,
  icon,
}: {
  label: string,
  value: string | number,
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-between text-black text-opacity-50 text-[10px]">
      {label}
      <span className="text-black flex items-center gap-0.5">
        {icon}
        {value}
      </span>
    </div>
  )
})
