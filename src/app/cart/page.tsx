'use client'

import Button from "@/components/Buttons/Button";
import { syncUserData } from "@/helpers/syncUserData";
import { store } from "@/store"
import { Basket } from "@/types";
import { addToCart, remFromCart } from "@/utils/cart";
import Image from "next/image";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useSnapshot } from "valtio"

export default function CartPage() {
  const { user } = useSnapshot(store);

  if (!user.basket) {
    return <div>loading cart</div>
  }

  return (
    <div>
      <h1 className="font-bold">Корзина</h1>

      <section className="mt-10 flex flex-col md:flex-row gap-5 items-start">
        <section className="w-full md:w-2/3 border border-gray-light rounded-md p-4 grid grid-cols-1 divide-y divide-gray-light shadow-sm">
          {
            user.basket.map(basket => (
              <CartProduct basket={basket} />
            ))
          }
        </section>

        <section className="border border-gray-light rounded-md p-4 shadow-sm w-full md:w-1/3 grid gap-4">
          <div className="flex items-center justify-between text-sm">
            <div>Итого:</div>
            <div className="text-base md:text-lg font-semibold">{Number(user.total_price).toLocaleString('ru')} сум</div>
          </div>

          <Button>Перейти к оплате</Button>
        </section>

      </section>
    </div>
  )
}

function CartProduct({
  basket
}: { basket: Basket }) {
  const handleAddToCart = async (id: string) => {
    await addToCart(id);
    await syncUserData();
  }

  const handleRemFromCart = async (id: string) => {
    await remFromCart(id);
    await syncUserData();
  }

  return (
    <div className="py-4 first:pt-0 last:pb-0 w-full flex justify-between gap-4">
      <div>
        <div className="w-40 aspect-square rounded-md bg-white relative">
          <Image
            src={basket.product.picture.picture}
            alt={basket.product.name}
            className="object-contain"
            fill
          />
        </div>

        <div className="w-full flex items-center justify-between border border-gray-light rounded-sm text-gray-normal p-2 px-4">
          <div>
            <FiMinus
              size={20}
              className="cursor-pointer"
              onClick={() => handleRemFromCart(basket.product.uuid)}
            />
          </div>

          <input
            type="text"
            className="w-full text-center outline-none"
            value={basket.quantity}
          />

          <div>
            <FiPlus
              size={20}
              className="cursor-pointer"
              onClick={() => handleAddToCart(basket.product.uuid)}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-end justify-between">
        <div className="w-full grid gap-2">
          <div>{basket.product.name}</div>
          <div className="text-xs text-gray-normal">
            Поставщик: <span className="text-black">{basket.product.supplier}</span>
          </div>
        </div>

        <div className="text-lg font-medium">
          {(Number(basket.product.price) * basket.quantity).toLocaleString("ru")} сум
        </div>
      </div>
    </div>
  )
}