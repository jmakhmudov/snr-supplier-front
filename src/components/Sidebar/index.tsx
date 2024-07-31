'use client'

import Image from "next/image";
import logo from '@/../public/images/snr-logo.svg'
import Link from "next/link";

import { RiArchiveDrawerLine } from "react-icons/ri";
import { TbCube } from "react-icons/tb";
import { MdOutlineQueryStats } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useSnapshot } from "valtio";
import { store } from "@/store";
import { syncUserData } from "@/helpers/syncUserData";
import { useEffect } from "react";

export default function Sidebar() {
  const { user } = useSnapshot(store);

  useEffect(() => {
    const getUser = async () => {
      await syncUserData();
    }

    getUser();
  }, [])

  return (
    <div className="fixed left-0 top-0 bottom-0 border flex flex-col items-center justify-between bg-white py-8 ">
      <div className=" space-y-10 grid place-items-center w-full">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="SR logo"
          />
        </Link>

        <nav className="w-full">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-10 py-3 hover:border-r-2 border-blue transition-all duration-150 group">
            <RiArchiveDrawerLine size={20} className="group-hover:animate-bounce" />
            <div>Товары</div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-10 py-3 hover:border-r-2 border-blue transition-all duration-150 group">
            <TbCube size={20} className="group-hover:animate-bounce" />
            <div>Маркетинг</div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-10 py-3 hover:border-r-2 border-blue transition-all duration-150 group">
            <MdOutlineQueryStats size={20} className="group-hover:animate-bounce" />
            <div>Статистика</div>
          </div>
        </nav>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 aspect-square bg-blue rounded-full"></div>
          <div className="">{user.company_name ? user.company_name : 'loading'}</div>
        </div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <FiSettings size={20} className="group-hover:animate-spin" />
          <div>Настройки</div>
        </div>
      </div>
    </div>
  )
}