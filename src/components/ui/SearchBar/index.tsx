import { ChangeEvent, SetStateAction, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchQ: (value: string) => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  setSearchQ,
  placeholder,
}: SearchBarProps) {

  return (
    <div className="w-96 md:flex gap-3 px-3.5 items-center h-10 rounded-full overflow-hidden border border-gray-normal hidden bg-white">
      <FiSearch size={17} className="text-gray-normal" />

      <input
        type="text"
        className="w-full h-full text-sm outline-none bg-transparent"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}