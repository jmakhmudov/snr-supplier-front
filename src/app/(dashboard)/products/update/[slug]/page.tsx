
import { getSubCategories } from "@/utils/api/categories";
import UpdateProductForm from "./update-product";
import { getProductBySlug } from "@/utils/api/products";


export default async function UpdateProductPage({
  params
}: {
  params: { slug: string }
}) {
  const subcategories = await getSubCategories();
  const product = await getProductBySlug(params.slug);

  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16 z-[9]">
        <div className=" font-semibold">Изменить товар</div>
      </header>

      <UpdateProductForm product={product} subcategories={subcategories} />
    </div>
  )
}
