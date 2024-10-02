import { OrderRow } from "@/app/(dashboard)/orders/orders-table";
import StatusSelect from "../StatusSelect";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { StatusType } from "../ui/Status";
import { Column } from "../Table/types";
import { OrderItem } from "@/types";
import Table from "../Table";

type OrderItemRow = OrderItem

const columns: Column<OrderItemRow>[] = [
  {
    header: 'Наименование товара',
    accessor: 'product_name',
    render: (product_name) => <div className="text-xs">{product_name}</div>
  },
  {
    header: 'Штрих-код',
    accessor: 'product_barcode',
    render: (product_barcode) => <div className="text-xs">{product_barcode}</div>
  },
  {
    header: 'Количество',
    accessor: 'quantity',
    render: (quantity) => <div className="text-xs">{Number(quantity).toLocaleString('ru')}</div>
  },
  {
    header: 'Общая стоимость',
    accessor: 'total_price',
    render: (total_price) => <div className="text-xs">{`${Number(total_price).toLocaleString('ru')} сум`}</div>
  },
];


export default function OrderDetailInfo({
  order
}: {
  order: OrderRow
}) {
  const data: OrderItemRow[] = order.order_items

  return (
    <Dialog>
      <DialogTrigger>
        <div className="underline font-medium cursor-pointer">{order.slug as string}</div>
      </DialogTrigger>
      <DialogContent className="w-full select-none">
        <DialogHeader>
          <DialogTitle>Акт приема-передачи № {order.slug as string} от {new Date(order.created_at).toLocaleDateString("ru")}</DialogTitle>
          <div className="py-4 grid grid-cols-2 w-full gap-2 text-sm">
            <div className="font-medium">Статус:</div>
            <StatusSelect orderId={order.id} status={order.status as StatusType} />

            <div className="font-medium">Общая стоимость:</div>
            <div>{`${order.total_price.toLocaleString('ru')} сум`}</div>
          </div>

          <div>
            <Table 
              data={data}
              columns={columns}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}