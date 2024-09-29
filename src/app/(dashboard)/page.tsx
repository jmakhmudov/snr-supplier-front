import Button from "@/components/ui/Buttons/Button";
import { getProducts } from "@/utils/api/products";
import Link from "next/link";
import ProductsList from "./products-list";
import { PaginatedResponse, Product } from "@/types";
import { MdAdd } from "react-icons/md";

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store';

export default async function Home() {
  const products: PaginatedResponse<Product> = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Товары</h1>

        <Link href={'/products/new'}>
          <Button>
            <div className="hidden md:block">Добавить товар</div>
            <MdAdd className="md:hidden" size={20} />
          </Button>
        </Link>
      </div>

      <ProductsList defaultProducts={products} />
    </div>
  );
}
