import { IoFastFood } from "react-icons/io5";
import { PiMonitorFill } from "react-icons/pi";

export const sections = [
  {
    title: 'Тип',
    name: 'product_type',
    options: [
      {
        label: 'Все',
        value: 'all',
        checked: true,
        icon: null
      },
      {
        label: 'Food',
        value: 'food',
        checked: false,
        icon: <IoFastFood />
      },
      {
        label: 'Non food',
        value: 'nonfood',
        checked: false,
        icon: <PiMonitorFill />
      }
    ]
  },
]