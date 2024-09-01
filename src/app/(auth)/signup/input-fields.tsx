import { FiLock } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa6";
import { BiBuildings } from "react-icons/bi";
import { RiTextSnippet } from "react-icons/ri";

export const inputFields = [
  {
    label: 'ФИО',
    name: 'full_name',
    type: 'text',
    placeholder: 'ФИО',
    icon: <FaRegAddressBook size={17} />,
    required: true
  },
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    placeholder: '********',
    icon: <FiLock size={17} />,
    required: true
  },
  {
    label: 'Подтвердите пароль',
    name: 'password_confirmation',
    type: 'password',
    placeholder: '********',
    icon: <FiLock size={17} />,
    required: true
  },
]