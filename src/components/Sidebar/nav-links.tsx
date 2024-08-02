import { MdOutlineQueryStats } from "react-icons/md";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { TbCube } from "react-icons/tb";

export const navLink = [
  {
    name: 'Товары',
    href: '/',
    icon: <RiArchiveDrawerLine size={20} />
  },
  {
    name: 'Маркетинг',
    href: '/marketing',
    icon: <TbCube size={20} />
  },
  {
    name: 'Статистика',
    href: '/stats',
    icon: <MdOutlineQueryStats size={20} />
  },
]