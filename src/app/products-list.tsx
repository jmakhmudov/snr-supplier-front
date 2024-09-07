'use client'

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import { ProductResponse } from "@/types";
import { useState } from "react";


interface ProductsListProps {
  products: ProductResponse
}

export default function ProductsList({
  products
}: ProductsListProps) {
  const [q, setQ] = useState('');

  return (
    <section className="mt-5">

      <SearchBar
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск товаров"
        setSearchQ={setQ}
      />

      {
        products.results.length > 0 ?
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
            {
              products.results.map((product) => (
                <ProductCard key={product.uuid} product={product} />
              ))
            }
          </div>
          :
          <div className="w-full text-center grid place-items-center mt-6 h-[60vh] font-medium text-gray-normal">
            Товаров нет
          </div>
      }
    </section>
  )
}