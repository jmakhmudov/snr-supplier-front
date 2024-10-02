"use client"

import Map from "@/components/Map";
import OrderDetailInfo from "@/components/OrderDetailInfo";
import Pagination from "@/components/Pagination";
import StatusSelect from "@/components/StatusSelect";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Status, { StatusType } from "@/components/ui/Status";
import { Order, OrderItem, PaginatedResponse } from "@/types";
import { getOrders } from "@/utils/api/orders";
import { useEffect, useState } from "react";

interface OrdersTableProps {
  defaultOrders: PaginatedResponse<Order>
}


export interface OrderRow {
  id: number;
  slug: string;
  status: string;
  created_at: string;
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
  order_items: OrderItem[];
}


const columns: Column<OrderRow>[] = [
  {
    header: '№ заказа',
    accessor: 'slug',
    render: (slug, row) => (
      <OrderDetailInfo order={row}/>
    )
  },
  {
    header: 'Статус',
    accessor: 'status',
    render: (status, row) => <StatusSelect orderId={row.id} status={status as StatusType} />
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
    header: 'Кол-во SKU',
    accessor: 'product_count',
    render: (product_count) => <div className="text-xs">{product_count.toLocaleString('ru')}</div>
  },
  {
    header: 'Кол-во товаров',
    accessor: 'product_items_count',
    render: (product_items_count) => <div className="text-xs">{product_items_count.toLocaleString('ru')}</div>
  },
];


export default function OrdersTable({
  defaultOrders,
}: OrdersTableProps) {
  const [orders, setOrders] = useState<PaginatedResponse<Order>>(defaultOrders);
  const [currPage, setCurrPage] = useState(1);
  console.log(orders.results[0])

  useEffect(() => {
    async function searchProducts() {
      const p = await getOrders(currPage);
      setOrders(p);
    }

    searchProducts();
  }, [currPage])

  const data: OrderRow[] = orders.results.map(item => (
    {
      id: item.id,
      slug: item.slug,
      created_at: item.created_at,
      payment_method: item.payment_method,
      product_count: item.order_items.length,
      product_items_count: item.order_items.reduce((sum, item) => sum + item.quantity, 0),
      retailer: item.created_by,
      status: item.status,
      total_price: item.total_price,
      order_items: item.order_items
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
                current_page={orders.current_page}
                total_pages={orders.total_pages}
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