'use client'

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/types"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

import { BsThreeDots } from "react-icons/bs";

interface ProductsListProps {
  products: Product[]
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

      <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4 mt-6">
        {
          products.map((product) => (
            <ProductCard product={product} />
          ))
        }
      </div>
    </section>
  )
}