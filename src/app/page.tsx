import { Product, ProductResponse } from "@/types";
import { cookies } from "next/headers";
import ProductsList from "./products-list";
import { getProducts } from "@/utils/products";
import Link from "next/link";
import Button from "@/components/ui/Buttons/Button";

export default async function Home() {
  const products: ProductResponse = await getProducts();
  console.log("PR",products);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Товары</h1>

        <Link href={'/products/new'}>
          <Button>Добавить товар</Button>
        </Link>
      </div>

      <ProductsList products={products} />
    </div>
  );
}
