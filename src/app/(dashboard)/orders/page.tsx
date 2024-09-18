import { Order, PaginatedResponse } from "@/types";
import { getOrders } from "@/utils/api/orders";
import OrdersTable from "./orders-table";

export default async function OrdersPage() {
  const orders: PaginatedResponse<Order> = await getOrders();

  return (
    <div>
      <h1 className="font-semibold">Заказы</h1>
      <OrdersTable defaultOrders={orders} />
    </div>
  )
}