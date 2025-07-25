'use client'

import logo from '@/../public/images/snr-logo.svg';
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import { navLink } from "./nav-links";
import { User } from '@/types';

export default function Sidebar({
  user
}: {
  user: User
}) {
  const pathname = usePathname();

  return (
    <div className=" fixed left-0 top-0 bottom-0 border-r border-gray-light-0 flex flex-col items-center justify-between bg-white py-8 z-[10] select-none">
      <div className=" space-y-10 grid place-items-center w-full">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="SR logo"
            className='w-10 md:w-16'
          />
        </Link>

        <nav className="w-full">
          {
            user?.role &&
            navLink[user.role].map(link => (
              <Link
                key={link.href}
                data-isActive={pathname === link.href}
                href={link.href}
                className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-5 md:px-10 py-3 transition-all duration-150 data-[isActive=true]:text-blue"
              >
                {link.icon}
                <div className="hidden md:block font-medium">{link.name}</div>
              </Link>
            ))
          }
        </nav>

      </div>

      <Link 
      href={'/account'} 
      data-isActive={pathname === '/account'}
      className="flex items-center gap-3 cursor-pointer hover:bg-blue-light hover:text-blue w-full px-5 md:px-10 py-3 transition-all duration-150 data-[isActive=true]:text-blue"
      >
        <FiSettings size={20} className="group-hover:animate-spin" />
        <div className="hidden md:block font-medium">Аккаунт</div>
      </Link>
    </div>
  )
}