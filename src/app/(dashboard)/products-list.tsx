'use client'

import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import { PaginatedResponse, Product } from "@/types";
import { getProducts } from "@/utils/api/products";
import { useEffect, useState } from "react";


interface ProductsListProps {
  defaultProducts: PaginatedResponse<Product>;
}

export default function ProductsList({
  defaultProducts,
}: ProductsListProps) {
  const [q, setQ] = useState('');
  const [products, setProducts] = useState<PaginatedResponse<Product>>(defaultProducts);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    async function searchProducts() {
      const p = await getProducts(currPage, q);
      setProducts(p);
    }

    searchProducts();
  }, [q, currPage])

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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 mt-6">
            {
              products.results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))
            }
          </div>
          :
          <div className="w-full text-center grid place-items-center mt-6 h-[60vh] font-medium text-gray-normal">
            Товаров нет
          </div>
      }


      <div className="mt-10">
        <Pagination
          current_page={products.current_page}
          total_pages={products.total_pages}
          onChange={(page) => setCurrPage(page)}
        />
      </div>
    </section>
  )
}
