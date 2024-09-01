'use client'

import logo from '@/../public/images/snr-logo.svg';
import Image from "next/image";
import Link from "next/link";

import { store } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { useSnapshot } from "valtio";
import { navLink } from "./nav-links";
import { syncUserData } from '@/utils/api/syncUserData';

export default function Sidebar() {
  const { user } = useSnapshot(store);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      await syncUserData();
    }

    getUser();
  }, [])

  return (
    <div className=" fixed left-0 top-0 bottom-0 border-r border-gray-light-0 flex flex-col items-center justify-between bg-white py-8 w-[210px] z-[100] select-none">
      <div className=" space-y-10 grid place-items-center w-full">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="SR logo"
            className='w-16'
          />
        </Link>

        <nav className="w-full">
          {
            navLink.map(link => (
              <Link
                key={link.href}
                data-isActive={pathname === link.href}
                href={link.href}
                className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-10 py-3 hover:border-r-2 border-blue transition-all duration-150 data-[isActive=true]:text-blue"
              >
                {link.icon}
                <div>{link.name}</div>
              </Link>
            ))
          }
        </nav>

      </div>

      <div className="w-full">
        <Link href={'/account'} className="flex items-center gap-3 cursor-pointer px-10 py-3">
          <div className="w-6 h-6 aspect-square bg-blue rounded-full"></div>
          <div className="text-xs font-medium">{user.full_name || 'loading'}</div>
        </Link>

        <div className="flex items-center gap-3 cursor-pointer group px-10 py-3">
          <FiSettings size={20} className="group-hover:animate-spin" />
          <div>Настройки</div>
        </div>
      </div>
    </div>
  )
}