'use client'

import FilterSection from "@/components/FilterSection";
import SearchBar from "@/components/SearchBar";
import { ChangeEvent, useState } from "react";
import { sections } from "./filter-sections";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

interface ProductsPageProps {
  products: Product[]
}

export default function ProductsPage({
  products
}: ProductsPageProps) {
  const [searchQ, setSearchQ] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQ(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div className="">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10">
        <h1 className="font-bold">Товары</h1>

        <SearchBar
          value={searchQ}
          onChange={(e) => handleSearchInput(e)}
          setSearchQ={setSearchQ}
          placeholder="Искать товары"
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </section>

      <section className="flex flex-col md:flex-row justify-between gap-4 md:gap-10 mt-10">
        <div data-show={showFilters} className="w-full md:max-w-[20%] sticky top-8 hidden data-[show=true]:block md:block space-y-4">
          {
            sections.map((section, index) => (
              <FilterSection type="radio" section={section} key={section.name} />
            ))
          }
        </div>

        <div className="w-full md:w-3/4">
          <div className="font-semibold mb-5">Найдено {products.length}</div>

          <section className="grid grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 2xl:md:grid-cols-5 gap-4">
            {
              products.map((product) => (
                <ProductCard
                  key={product.uuid}
                  product={product}
                />
              ))
            }
          </section>
        </div>
      </section>


    </div>
  );
}
