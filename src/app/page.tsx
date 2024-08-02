import { Product } from "@/types";
import { cookies } from "next/headers";
import ProductsList from "./products-list";

async function getProducts() {
  const API_URL = process.env.API_URL;

  const products = await fetch(`${API_URL}/api/v1/suppliers/products/`, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    }
  })
  return await products.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className=" pl-48">
      {/* <header className=" absolute top-0 left-0 right-0 z-10 h-16 w-full flex items-center justify-between bg-white border-b border-gray-light order-2 px-16  pl-64">
        <div className="flex items-center divide-x divide-gray-light bg-gray-light-0 rounded-full">
          <div className="p-2.5 px-6 text-sm">Все товары</div>
          <div className="p-2.5 px-6 text-sm">В продаже</div>
        </div>

        <Link href={'/products/new'}>
          <Button>Создать товар</Button>
        </Link>
      </header> */}

      <h1 className="font-semibold">Товары</h1>

      <ProductsList products={products} />
    </div>
  );
}
