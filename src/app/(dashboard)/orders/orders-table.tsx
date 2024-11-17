"use client"

import Map from "@/components/Map";
import OrderDetailInfo from "@/components/OrderDetailInfo";
import Pagination from "@/components/Pagination";
import StatusSelect from "@/components/StatusSelect";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SearchBar from "@/components/ui/SearchBar";
import Status, { StatusType } from "@/components/ui/Status";
import { Company, Order, OrderItem, PaginatedResponse } from "@/types";
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
  created_by: Company,
  payment_method: string;
  total_price: number;
  product_count: number;
  product_items_count: number;
  order_items: OrderItem[];
  supplier: Company;
}


const columns: Column<OrderRow>[] = [
  {
    header: '№ заказа',
    accessor: 'slug',
    render: (slug, row) => (
      <OrderDetailInfo order={row} />
    )
  },
  {
    header: 'Статус',
    accessor: 'status',
    render: (status, row) => <StatusSelect orderId={row.id} status={status as StatusType} />
  },
  {
    header: 'Дата и время заказа',
    accessor: 'created_at',
    render: (created_at, row) => <div>{new Date(created_at as string).toLocaleString("ru")}</div>
  },
  {
    header: 'Магазин',
    accessor: 'created_by',
    render: (_, row) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:underline cursor-pointer overflow-hidden text-ellipsis w-[15ch] text-xs whitespace-nowrap">{row.created_by.name}</div>
        </PopoverTrigger>
        <PopoverContent className="w-64 text-sm">
          <div className="font-semibold">{row.created_by.name}</div>
          <div className="mt-4">ИНН: {row.created_by.inn}</div>
          <div className="mt-4">Телефон: {row.created_by.phone_number}</div>

          <section className="mt-5 grid gap-5">
            <a target="_blank" className="text-blue underline" href={row.created_by.registration_certificate_path}>Свидетельство о государственной регистрации юридического лица</a>
            <a target="_blank" className="text-blue underline" href={row.created_by.cash_register_document_path}>Документ о регистрации кассового аппарата</a>
            <a target="_blank" className="text-blue underline" href={row.created_by.vat_certificate_path}>Свидетельство о регистрации в качестве налогоплательщика налога на добавленную стоимость</a>
          </section>
        </PopoverContent>
      </Popover>
    )
  },
  {
    header: 'Адрес магазина',
    accessor: 'created_by',
    render: (_, row) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:underline cursor-pointer text-xs">{row.created_by.address}</div>
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">
          {
            (row.created_by.lat && row.created_by.lon) &&
            <Map defaultCoordinates={[row.created_by.lat, row.created_by.lon]} disabled />
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
  const [q, setQ] = useState('');

  useEffect(() => {
    async function searchProducts() {
      const p = await getOrders(currPage, q);
      setOrders(p);
    }

    searchProducts();
  }, [currPage, q])

  const data: OrderRow[] = orders.results.map(item => (
    {
      id: item.id,
      slug: item.slug,
      created_at: item.created_at,
      payment_method: item.payment_method,
      product_count: item.order_items.length,
      product_items_count: item.order_items.reduce((sum, item) => sum + item.quantity, 0),
      created_by: item.created_by,
      status: item.status,
      total_price: item.total_price,
      order_items: item.order_items,
      supplier: item.supplier
    }
  ))

  return (
    <section className="mt-10 space-y-5">
      <SearchBar
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Введите № заказа"
        setSearchQ={setQ}
      />

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