'use client'

import SearchBar from "@/components/SearchBar";
import { ChangeEvent, useState } from "react";

export default function SuppliersPageList() {
  const [searchQ, setSearchQ] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQ(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10">
        <h1 className="font-bold">Поставщики</h1>

        <SearchBar
          value={searchQ}
          onChange={(e) => handleSearchInput(e)}
          setSearchQ={setSearchQ}
          placeholder="Искать постащиков"
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </section>
    </div>
  )
}