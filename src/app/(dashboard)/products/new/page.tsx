import Button from "@/components/ui/Buttons/Button";

import { FiUpload } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { getSubCategories } from "@/utils/api/categories";
import NewProductForm from "./new-product";


export default async function NewProductPage() {
  const subcategories = await getSubCategories();

  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16 z-[9]">
        <div className=" font-semibold">Добавить товар</div>

        <div className="flex items-center gap-8">
          <div className="text-xs">Информация о товаре</div>

          <div className="flex items-center">
            <div className="bg-blue w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs border-dashed border border-white">1</div>
            <div className="border-[1.5px] w-6 border-gray-light"></div>
            <div className="bg-blue bg-opacity-50 w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs">2</div>
            <div className="border-[1.5px] w-6 border-gray-light"></div>
            <div className="bg-blue bg-opacity-50 w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs">3</div>
          </div>
        </div>
      </header>

      <div className="flex gap-4">
        <Button>
          <div className="flex items-center gap-2"><RiFileAddLine size={18} /> Загрузить с Excel</div>
        </Button>
        <Button>
          <div className="flex items-center gap-2"><FiUpload size={18} /> Выгрузить данные</div>
        </Button>
      </div>

      <NewProductForm subcategories={subcategories} />
    </div>
  )
}
