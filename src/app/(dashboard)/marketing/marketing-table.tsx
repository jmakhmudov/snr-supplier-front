"use client"

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import Button from "@/components/ui/Buttons/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Status from "@/components/ui/Status";
import { Discount, Order, PaginatedResponse } from "@/types";
import { getMarketingData } from "@/utils/api/marketing";
import Image from "next/image";
import { useEffect, useState } from "react";

interface MarketingTableProps {
  defaultData: PaginatedResponse<Discount>
}


type Row = Discount;


const columns: Column<Row>[] = [
  {
    header: 'ID',
    accessor: 'id',
    render: (id) => <div className="underline font-medium cursor-pointer">{id as string}</div>
  },
  {
    header: 'Фото',
    accessor: 'product',
    render: (_, row) => <div className="relative w-10 h-10">
      <Image
        quality={20}
        alt={row.product.name_ru}
        src={row.product.images[0].image}
        fill
      />
    </div>
  },
  {
    header: 'SKU',
    accessor: 'product',
    render: (_, row) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:underline cursor-pointer overflow-hidden text-ellipsis w-[15ch] text-xs whitespace-nowrap">{row.product.name_ru}</div>
        </PopoverTrigger>
        <PopoverContent className="w-40 text-sm">
          <div className="font-semibold">{row.product.name_ru}</div>
        </PopoverContent>
      </Popover>
    )
  },
  {
    header: 'Стоимость без скидки',
    accessor: 'product',
    render: (_, row) => <div className="text-xs">{`${Number(row.product.price).toLocaleString("ru")} сум`}</div>
  },
  {
    header: 'Стоимость со скидкой',
    accessor: 'product',
    render: (_, row) => <div className="text-xs">{`${Number(row.discounted_price).toLocaleString("ru")} сум`}</div>
  },
  {
    header: 'Статус',
    accessor: 'is_active',
    render: (is_active) => <Status label={is_active ? "active" : "nonactive"} />
  },
  {
    header: 'Начало',
    accessor: 'start_date',
    render: (start_date) => <div className="text-xs">{`${new Date(start_date as string).toLocaleString("ru")}`}</div>
  },
  {
    header: 'Конец',
    accessor: 'end_date',
    render: (end_date) => <div className="text-xs">{`${new Date(end_date as string).toLocaleString("ru")}`}</div>
  },
];


export default function MarketingTable({
  defaultData,
}: MarketingTableProps) {
  const [marketingData, setMarketingData] = useState<PaginatedResponse<Discount>>(defaultData);
  const [currPage, setCurrPage] = useState(1);
  console.log(defaultData)

  useEffect(() => {
    async function searchProducts() {
      const p = await getMarketingData(currPage);
      setMarketingData(p);
    }

    searchProducts();
  }, [currPage])

  const data: Row[] = marketingData.results.map(item => (
    {
      id: item.id,
      start_date: item.start_date,
      end_date: item.end_date,
      is_active: item.is_active,
      discounted_price: item.discounted_price,
      product: item.product
    }
  ))

  return (
    <section className="mt-10">
      {
        data.length > 0 ?
          <>
            <Table
              columns={columns}
              data={data}
            />
            <div className="mt-10">
              <Pagination
                current_page={marketingData.current_page}
                total_pages={marketingData.total_pages}
                onChange={(page) => setCurrPage(page)}
              />
            </div>
          </>
          :
          <div className="w-full text-center grid place-items-center mt-6 h-[60vh] font-medium text-gray-normal">
            Заказов нет
          </div>
      }

    </section>
  )
}