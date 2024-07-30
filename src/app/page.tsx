import { cookies } from "next/headers";
import ProductsPage from "./(products)/products-page";
import { Product } from "@/types";

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
    <ProductsPage products={products} />
  );
}
