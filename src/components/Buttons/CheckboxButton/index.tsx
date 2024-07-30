import { ChangeEvent, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxButtonProps {
  id: string;
  name: string;
  onChange?: (value: boolean) => void;
  children: React.ReactNode
}

export default function CheckboxButton({
  children,
  id,
  name,
  onChange,
}: CheckboxButtonProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    if (onChange)
      onChange(e.target.checked)
  }

  return (
    <label htmlFor={id} className="gap-2 flex items-center hover:bg-gray-light hover:bg-opacity-30 cursor-pointer p-1 px-1.5 rounded-md">
      <div
        data-checked={isChecked}
        className="h-4 aspect-square bg-gray-light data-[checked=true]:bg-purple rounded-sm grid place-items-center peer transition-all duration-150"
      >
        <FaCheck data-checked={isChecked} className="h-0 aspect-square rounded-sm data-[checked=true]:text-white data-[checked=true]:h-2 text-gray-light transition-all duration-200" />
      </div>
      <input
        id={id}
        checked={isChecked}
        type="checkbox"
        name={name}
        onChange={handleChange}
        className="hidden"
      />
      <span className="text-sm font-medium cursor-pointer select-none flex items-center gap-1">{children}</span>
    </label>
  )
}