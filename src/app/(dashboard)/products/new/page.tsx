
import { getSubCategories } from "@/utils/api/categories";
import NewProductForm from "./new-product";


export default async function NewProductPage() {
  const subcategories = await getSubCategories();

  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16 z-[9]">
        <div className=" font-semibold">Добавить товар</div>
      </header>

      <NewProductForm subcategories={subcategories} />
    </div>
  )
}
