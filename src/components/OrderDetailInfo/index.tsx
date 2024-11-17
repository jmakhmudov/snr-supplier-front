import { OrderRow } from "@/app/(dashboard)/orders/orders-table";
import StatusSelect from "../StatusSelect";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { StatusType } from "../ui/Status";
import { Column } from "../Table/types";
import { OrderItem } from "@/types";
import Table from "../Table";
import { FaRegFileLines } from "react-icons/fa6";
import Button from "../ui/Buttons/Button";
import { useTransition } from "react";
import Cookies from "universal-cookie";

type OrderItemRow = OrderItem

const columns: Column<OrderItemRow>[] = [
  {
    header: 'Наименование товара',
    accessor: 'name',
    render: (name) => <div className="text-xs">{name}</div>
  },
  {
    header: 'Штрих-код',
    accessor: 'barcode',
    render: (barcode) => <div className="text-xs">{barcode}</div>
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
  const [isPending, setTransition] = useTransition();
  const data: OrderItemRow[] = order.order_items

  const handleReportDownload = async () => {
    setTransition(async () => {
      const cookiesStore = new Cookies();
      const accessToken = cookiesStore.get("access");
      let anchor = document.createElement("a");
      document.body.appendChild(anchor);

      let headers = new Headers();
      headers.append('Authorization', `Bearer ${accessToken}`);
      const url = `api/reports/invoice/${order.id}/`

      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blobby = await response.blob();
        let objectUrl = window.URL.createObjectURL(blobby);

        let filename = `Накладная_${order.slug}.xlsx`;;

        anchor.href = objectUrl;
        anchor.download = filename;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.log(error)
      }
    })

  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="underline font-medium cursor-pointer">{order.slug as string}</div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl select-none">
        <DialogHeader className="w-full">
          <DialogTitle>Акт приема-передачи № {order.slug as string} от {new Date(order.created_at).toLocaleDateString("ru")}</DialogTitle>
        </DialogHeader>
        <div className="py-4 grid grid-cols-2 w-full gap-2 text-sm">
          <div className="font-medium">Дата и время заказа:</div>
          <div>{new Date(order.created_at).toLocaleString('ru')}</div>

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

        <div className="flex justify-end">
          <Button disabled={isPending} className="flex items-center gap-2" onClick={handleReportDownload}>Скачать накладную <FaRegFileLines /></Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}