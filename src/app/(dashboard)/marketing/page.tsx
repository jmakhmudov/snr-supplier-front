import Button from "@/components/ui/Buttons/Button";
import Link from "next/link";
import MarketingTable from "./marketing-table";
import { getMarketingData } from "@/utils/api/marketing";

export default async function MarketingPage() {
  const marketingData = await getMarketingData();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Маркетинг</h1>

        <Link href={'/marketing/new'}>
          <Button>Создать</Button>
        </Link>
      </div>

      <MarketingTable defaultData={marketingData} />
    </div>
  )
}