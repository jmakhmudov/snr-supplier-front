import Button from "@/components/ui/Buttons/Button";
import Link from "next/link";
import { getMarketingData } from "@/utils/api/marketing";
import MarketingTable from "./marketing-table";
import { MdAdd } from "react-icons/md";

export default async function MarketingPage() {
  const marketingData = await getMarketingData();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Маркетинг</h1>

        <Link href={'/marketing/new'}>
          <Button>
            <div className="hidden md:block">Создать</div>
            <MdAdd className="md:hidden" size={20} />
          </Button>
        </Link>
      </div>

      <MarketingTable defaultData={marketingData} />
    </div>
  )
}