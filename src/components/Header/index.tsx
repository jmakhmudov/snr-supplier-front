'use client'

import Image from "next/image";
import logo from '@/../public/images/snr-logo.svg'
import Link from "next/link";

import { AiOutlineProduct } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { store } from "@/store";
import { useSnapshot } from "valtio";
import { syncUserData } from "@/helpers/syncUserData";

export default function Header() {
  const pathname = usePathname();
  const { user } = useSnapshot(store);

  useEffect(() => {
    const getUser = async () => {
      await syncUserData();
    }

    getUser();
  }, [])

  return (
    <header>
      <div className="md:hidden bg-purple px-3.5 p-2 flex items-center justify-between select-none">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="SR logo"
            className="w-8 p-1 aspect-square rounded-sm bg-white"
          />
        </Link>

        <div className="text-xs text-white grow ml-2">
          <div className="text-sm font-medium">S&R app</div>
          <div className="opacity-50">В приложении удобнее!</div>
        </div>

        <button className="bg-white text-purple rounded-md p-2 px-2.5 font-semibold text-sm">Скачать</button>
      </div>

      <div className="hidden md:flex items-center justify-between p-3.5 md:px-16 border-b">
        <nav className="flex items-center gap-8 font-medium text-sm">
          <Link href={'/'}>
            <Image
              src={logo}
              alt="SR logo"
            />
          </Link>

          <Link
            href={'/'}
            data-isactive={pathname === '/'}
            className="hover:text-purple data-[isactive=true]:text-purple hidden md:block"
          >
            Товары
          </Link>

          <Link
            href={'/suppliers'}
            data-isactive={pathname === '/suppliers'}
            className="hover:text-purple data-[isactive=true]:text-purple hidden md:block"
          >
            Поставщики
          </Link>
        </nav>

        <section className="items-center gap-8 text-black text-xs hidden md:flex">
          <Link
            href={'/search'}
            className="data-[isactive=true]:text-purple data-[isactive=true]:font-semibold font-medium flex flex-col gap-1 items-center hover:text-purple"
          >
            <FiSearch size={28} />
            <div>Поиск</div>
          </Link>

          <Link
            href={'/cart'}
            className="data-[isactive=true]:text-purple data-[isactive=true]:font-semibold font-medium flex flex-col gap-1 items-center hover:text-purple relative"
          >
            {
              user.basket && <div className="h-4 aspect-square rounded-full bg-purple absolute -top-1 right-2 grid place-items-center text-white font-semibold text-xs">{user.basket.length}</div>
            }
            <FiShoppingBag size={28} />
            <div>Корзина</div>
          </Link>

          <Link
            href={'/account'}
            className="data-[isactive=true]:text-purple data-[isactive=true]:font-semibold font-medium flex flex-col gap-1 items-center hover:text-purple"
          >
            <FiUser size={28} />
            <div>Кабинет</div>
          </Link>
        </section>

        <FiMenu size={28} className="text-gray-normal md:hidden cursor-pointer" />
      </div>

      <section className="fixed bottom-0 left-0 right-0 p-3.5 flex items-center justify-between border-t text-gray-normal font-semibold text-[11px] md:hidden bg-white z-50">
        <Link
          href={'/'}
          data-isactive={pathname === '/'}
          className="w-[50px] data-[isactive=true]:text-purple font-medium flex flex-col gap-1 items-center"
        >
          <AiOutlineProduct size={28} />
          <div>Товары</div>
        </Link>

        <Link
          href={'/suppliers'}
          data-isactive={pathname === '/suppliers'}
          className="w-[50px] data-[isactive=true]:text-purple font-medium flex flex-col gap-1 items-center"
        >
          <FiTruck size={28} />
          <div>Поставщики</div>
        </Link>

        <Link
          href={'/cart'}
          data-isactive={pathname === '/cart'}
          className="w-[50px] data-[isactive=true]:text-purple font-medium flex flex-col gap-1 items-center relative"
        >
          {
            user.basket && <div className="h-4 aspect-square rounded-full bg-purple absolute -top-1 right-2 grid place-items-center text-white font-semibold text-xs">{user.basket.length}</div>
          }
          <FiShoppingBag size={28} />
          <div>Корзина</div>
        </Link>

        <Link
          href={'/search'}
          data-isactive={pathname === '/search'}
          className="w-[50px] data-[isactive=true]:text-purple font-medium flex flex-col gap-1 items-center"
        >
          <FiSearch size={28} />
          <div>Поиск</div>
        </Link>

        <Link
          href={'/account'}
          data-isactive={pathname === '/account'}
          className="w-[50px] data-[isactive=true]:text-purple font-medium flex flex-col gap-1 items-center"
        >
          <FiUser size={28} />
          <div>Кабинет</div>
        </Link>
      </section>
    </header>
  )
}