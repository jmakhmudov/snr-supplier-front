import Button from "@/components/ui/Buttons/Button";
import { ProductResponse } from "@/types";
import { getProducts } from "@/utils/api/products";
import Link from "next/link";
import ProductsList from "../products-list";

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
