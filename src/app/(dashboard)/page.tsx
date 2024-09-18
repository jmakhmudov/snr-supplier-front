import Button from "@/components/ui/Buttons/Button";
import { getProducts } from "@/utils/api/products";
import Link from "next/link";
import ProductsList from "./products-list";
import { PaginatedResponse, Product } from "@/types";


export default async function Home() {
  const products: PaginatedResponse<Product> = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Товары</h1>

        <Link href={'/products/new'}>
          <Button>Добавить товар</Button>
        </Link>
      </div>

      <ProductsList defaultProducts={products} />
    </div>
  );
}
