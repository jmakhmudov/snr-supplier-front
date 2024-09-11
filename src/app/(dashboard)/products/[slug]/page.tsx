export const revalidate = 0;

import { Product } from "@/types";
import { getProductBySlug } from "@/utils/api/products";
import { notFound } from "next/navigation";
import ProductInfo from "./product-info";


export default async function ProductPage({
  params
}: { params: { slug: string } }) {
  const product: Product = await getProductBySlug(params.slug);
  console.log(product)

  if (!product.name_ru) {
    return notFound();
  }

  return (
    <ProductInfo product={product} />
  )
}
