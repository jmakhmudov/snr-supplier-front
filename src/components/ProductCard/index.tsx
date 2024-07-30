'use client'

import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import Button from "../Buttons/Button"
import { addToCart } from "@/utils/cart"
import { useState, useEffect } from "react"

import { FiPlus, FiMinus } from "react-icons/fi";
import { useSnapshot } from "valtio"
import { store } from "@/store"
import Cookies from "universal-cookie"
import { syncUserData } from "@/helpers/syncUserData"

interface ProductProps {
  product: Product
}

export default function ProductCard({
  product
}: ProductProps) {
  const { user } = useSnapshot(store);
  const [isInCart, setIsInCart] = useState<boolean | null>(null);

  useEffect(() => {
    if (user.basket) {
      setIsInCart(user.basket.some(p => p.product.uuid === product.uuid));
    }
  }, [user.basket, product.uuid]);

  const handleAddProduct = async () => {
    await addToCart(product.uuid);

    await syncUserData();
  }

  if (isInCart === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="border border-gray-light hover:shadow-sm transition-all duration-150 p-2.5 rounded-md w-full h-full flex flex-col justify-between relative overflow-hidden select-none">
      {
        product.is_top &&
        <div className="bg-accent-lime py-1 px-2 absolute top-0 right-0 z-10 text-xs font-bold rounded-bl-md">ТОП</div>
      }

      <Link href={`/products/${product.uuid}`} className="w-full min-h-40 relative rounded-md bg-white">
        <Image
          alt={product.name}
          src={product.picture.picture}
          className="object-contain"
          fill
        />
      </Link>

      <div className="mt-2 flex flex-col gap-3 justify-between h-full">
        <div>
          {product.discount && <div className="text-xs line-through text-gray-normal">13900 сум</div>}
          <div className="font-bold text-lg -mt-1">{Number(product.price).toLocaleString("ru")} сум</div>
        </div>

        <div className="text-xs -mt-3 line-clamp-2">{product.name}</div>

        <Button
          onClick={handleAddProduct}
          disabled={isInCart}
        >
          {isInCart ? 'Добавлен в корзину' : 'В корзину'}
        </Button>
      </div>
    </div >
  )
}
