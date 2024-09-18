"use client"

import Map from "@/components/Map";
import Pagination from "@/components/Pagination";
import StatusSelect from "@/components/StatusSelect";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Status, { StatusType } from "@/components/ui/Status";
import { Order, PaginatedResponse } from "@/types";
import { getOrders } from "@/utils/api/orders";
import { useEffect, useState } from "react";

interface OrdersTableProps {
  defaultOrders: PaginatedResponse<Order>
}


interface Row {
  slug: string;
  status: string;
  date: string;
  retailer: {
    inn: string;
    name: string
    address: string | null;
    lat: number;
    lon: number;
  },
  payment_method: string;
  total_price: number;
  product_count: number;
  product_items_count: number;
}


const columns: Column<Row>[] = [
  {
    header: '№ заказа',
    accessor: 'slug',
    render: (slug) => <div className="underline font-medium cursor-pointer">{slug as string}</div>
  },
  {
    header: 'Статус',
    accessor: 'status',
    render: (status) => <StatusSelect status={status as StatusType} />
  },
  {
    header: 'Магазин',
    accessor: 'retailer',
    render: (_, row) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:underline cursor-pointer overflow-hidden text-ellipsis w-[15ch] text-xs whitespace-nowrap">{row.retailer.name}</div>
        </PopoverTrigger>
        <PopoverContent className="w-40 text-sm">
          <div className="font-semibold">{row.retailer.name}</div>
          <div className="mt-4">ИНН: {row.retailer.inn}</div>
        </PopoverContent>
      </Popover>
    )
  },
  {
    header: 'Адрес магазина',
    accessor: 'retailer',
    render: (_, row) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:underline cursor-pointer text-xs">{row.retailer.address}</div>
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">
          {
            (row.retailer.lat && row.retailer.lon) &&
            <Map defaultCoordinates={[row.retailer.lat, row.retailer.lon]} disabled />
          }
        </PopoverContent>
      </Popover>
    )
  },
  {
    header: 'Метод оплаты',
    accessor: 'payment_method',
    render: (method) => <Status label={method as StatusType} />
  },
  {
    header: 'Сумма',
    accessor: 'total_price',
    render: (price) => <div className="text-xs">{`${price.toLocaleString('ru')} сум`}</div>
  },
  {
    header: 'SKU',
    accessor: 'product_count',
  },
  {
    header: 'Кол-во товаров',
    accessor: 'product_items_count',
  },
];


export default function OrdersTable({
  defaultOrders,
}: OrdersTableProps) {
  const [orders, setOrders] = useState<PaginatedResponse<Order>>(defaultOrders);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    async function searchProducts() {
      const p = await getOrders(currPage);
      setOrders(p);
    }

    searchProducts();
  }, [currPage])

  const data: Row[] = orders.results.map(item => (
    {
      slug: item.slug,
      date: item.created_at,
      payment_method: item.payment_method,
      product_count: item.order_items.length,
      product_items_count: item.order_items.reduce((sum, item) => sum + item.quantity, 0),
      retailer: item.created_by,
      status: item.status,
      total_price: item.total_price
    }
  ))

  return (
    <section className="mt-10">
      <Table
        columns={columns}
        data={data}
      />
      <div className="mt-10">
        <Pagination
          current_page={orders.current_page}
          total_pages={orders.total_pages}
          onChange={(page) => setCurrPage(page)}
        />
      </div>
    </section>
  )
}