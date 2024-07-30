import { ChangeEvent, SetStateAction } from "react";

import { FiSearch } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchQ: (value: string) => void;
  placeholder: string;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}

export default function SearchBar({
  value,
  onChange,
  setSearchQ,
  placeholder,
  showFilters,
  setShowFilters,
}: SearchBarProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 md:hidden">
        <div className="flex items-center justify-between border border-black border-opacity-10 bg-gray-light h-8 px-2 rounded-md overflow-hidden w-full">
          <FiSearch size={16} className="text-gray-normal" />

          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent h-full focus:outline-none text-xs w-full px-3"
            onChange={(e) => onChange(e)}
            value={value}
          />

          <TiDelete
            onClick={() => setSearchQ('')}
            data-isempty={!Boolean(value)}
            size={16}
            className="text-gray-normal hidden data-[isempty=false]:block cursor-pointer"
          />
        </div>

        <VscSettings onClick={() => setShowFilters(!showFilters)} size={24} className="cursor-pointer" />
      </div>

      <div className="w-3/4 md:flex items-center h-12 rounded-md overflow-hidden border border-gray-light hidden">
        <input
          type="text"
          className="w-full h-full px-5 text-sm"
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />

        <button className="bg-purple text-white h-full px-8 hover:bg-purple-hover">
          <FiSearch size={24} />
        </button>
      </div>
    </>
  )
}