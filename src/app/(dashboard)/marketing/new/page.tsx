import { getProductList } from "@/utils/api/products";
import NewMarketingForm from "./new-marketing";

export default async function NewMarketingPage() {
  const productList = await getProductList();

  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16 z-[99]">
        <div className=" font-semibold">Создать маркетинговую кампанию</div>
      </header>


      <NewMarketingForm products={productList} />
    </div>
  )
}
