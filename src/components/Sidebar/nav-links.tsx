import { IoCart } from "react-icons/io5";
import { MdOutlineQueryStats, MdPeople } from "react-icons/md";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { TbCube } from "react-icons/tb";

export const navLink = {
  ADMIN: [
    {
      name: 'Товары',
      href: '/',
      icon: <RiArchiveDrawerLine size={20} />
    },
    {
      name: 'Заказы',
      href: '/orders',
      icon: <IoCart size={20} />
    },
    {
      name: 'Аналитика',
      href: '/analytics',
      icon: <MdOutlineQueryStats size={20} />
    },
    {
      name: 'Маркетинг',
      href: '/marketing',
      icon: <TbCube size={20} />
    },
    {
      name: 'Сотрудники',
      href: '/employees',
      icon: <MdPeople size={20} />
    },
  ],
  MANAGER: [
    {
      name: 'Товары',
      href: '/',
      icon: <RiArchiveDrawerLine size={20} />
    },
    {
      name: 'Заказы',
      href: '/orders',
      icon: <IoCart size={20} />
    },
    {
      name: 'Аналитика',
      href: '/analytics',
      icon: <MdOutlineQueryStats size={20} />
    },
    {
      name: 'Маркетинг',
      href: '/marketing',
      icon: <TbCube size={20} />
    },
  ],
  AGENT: [
    {
      name: 'Товары',
      href: '/',
      icon: <RiArchiveDrawerLine size={20} />
    },
    {
      name: 'Заказы',
      href: '/orders',
      icon: <IoCart size={20} />
    },
  ],
}