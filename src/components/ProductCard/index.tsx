'use client'

import { Product } from "@/types"
import Image from "next/image"
import { useState } from "react"

import { patchProduct } from "@/utils/api/products"
import { BsLightningChargeFill, BsThreeDots } from "react-icons/bs"
import { FaStar } from "react-icons/fa"
import { FiCheck } from "react-icons/fi"
import { IoMdEye } from "react-icons/io"
import { MdOutlineHideImage } from "react-icons/md"
import { RiDiscountPercentFill } from "react-icons/ri"

interface ProductProps {
  product: Product
}

export default function ProductCard({
  product
}: ProductProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [currProduct, setCurrProduct] = useState(product);

  const handleMoreOptions = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    setShowOptions(!showOptions);
  }

  const handleUpdateStatus = async (isActive: boolean) => {
    try {
      const updatedProduct = await patchProduct('is_active', String(isActive), currProduct.slug);
      setCurrProduct((prevProduct) => ({
        ...prevProduct,
        ...updatedProduct,
      }));
    } catch (error) {
      console.error('Failed to update product status', error);
    }
  }

  return (
    <a
      href={`/products/${currProduct.slug}`}
      className="bg-white p-3 flex flex-col justify-between gap-3 rounded-xl hover:shadow-sm select-none relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 p-5 grid gap-2">
        {
          currProduct.is_top &&
          <div title="В топе" className="flex items-center gap-2 group text-blue">
            <BsLightningChargeFill />

            <div className=" group-hover:text-blue group-hover:ml-0 transition-all duration-300 text-xs font-medium text-transparent -ml-5">В топе</div>
          </div>
        }

        {
          currProduct.discount.is_active &&
          <div title="На акции" className="flex items-center gap-2 group text-orange-500">
            <RiDiscountPercentFill />

            <div className=" group-hover:text-orange-500 group-hover:ml-0 transition-all duration-300 text-xs font-medium text-transparent -ml-5">На акции</div>
          </div>
        }
      </div>

      <div className="flex gap-4 h-full">
        <div className="grid gap-2 w-1/2">
          {
            currProduct.images.length > 0 ?
              <Image
                src={currProduct.images[0].image}
                alt={currProduct.name_ru}
                width={150}
                height={150}
                className="object-contain w-full aspect-square rounded-lg border border-gray-light"
              />
              :
              <div className="bg-gray-light w-full aspect-square rounded-lg border border-gray-light grid place-items-center">
                <MdOutlineHideImage size={50} className="text-gray-light-0" />
              </div>
          }

          <div className="flex items-center justify-between gap-1 w-full">
            {
              currProduct.is_active ?
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
                className="hidden absolute -right-28 bottom-0 bg-gray-light-0 rounded-lg text-xs overflow-hidden data-[showOptions=true]:block border border-gray-light"
              >
                <div
                  className="px-3 py-1.5 hover:bg-gray-light border-b border-gray-light flex items-center gap-1"
                  onClick={() => handleUpdateStatus(true)}
                >
                  {currProduct.is_active && <FiCheck />}
                  Активный
                </div>
                <div
                  className="px-3 py-1.5 hover:bg-gray-light border-b border-gray-light flex items-center gap-1"
                  onClick={() => handleUpdateStatus(false)}
                >
                  {!currProduct.is_active && <FiCheck />}
                  Неактивный
                </div>
              </div>
              <BsThreeDots />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col gap-2">
          <div className="text-xs font-semibold line-clamp-3 min-h-12">{currProduct.name_ru}</div>

          <div className="grid gap-1">
            <ProductData label="Просмотры" value={currProduct.stats.view_count} icon={<IoMdEye size={10} />} />
            <ProductData label="Продано" value={`${currProduct.stats.sold_count} шт.`} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-1">
          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">На складе {currProduct.quantity}</div>

          <div className="bg-gray-light-0 rounded-lg text-xs font-semibold px-3 py-2 w-full text-center cursor-default">К отправке 0</div>
        </div>

        <div className="font-semibold text-sm text-center flex items-center gap-4 justify-center">
          {Number(
            currProduct.discount.is_active ?
            currProduct.discount.discounted_price :
            currProduct.price
          ).toLocaleString('ru')} сум
          <span className="text-sm font-normal line-through">{currProduct.discount.is_active && `${Number(currProduct.price)} сум`}</span>
        </div>
      </div>

    </a>
  )
}

const ProductData = ({
  label,
  value,
  icon,
}: {
  label: string,
  value: string | number | undefined,
  icon?: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-between text-black text-opacity-50 text-[10px]">
      {label}
      <span className="text-black flex items-center gap-0.5">
        {icon}
        {value || '-'}
      </span>
    </div>
  )
}
