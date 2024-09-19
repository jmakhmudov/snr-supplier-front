export type StatusType = 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'cash' | 'transfer';

interface StatusProps {
  label: StatusType
}

const statusLabels = {
  pending: 'собирается',
  shipped: 'доставляется',
  delivered: 'доставлен',
  cancelled: 'отменен',
  cash: 'наличные',
  transfer: 'перечисление',
}

export default function Status({
  label,
}: StatusProps) {
  const colors = {
    delivered: "bg-green-50 text-green-400",
    pending: "bg-yellow-50 text-yellow-400",
    cancelled: "bg-red-50 text-red-400",
    shipped: "bg-blue-50 text-blue-400",
    transfer: "bg-blue-50 text-blue-400",
    cash: "bg-green-50 text-green-400"
  }

  return (
    <div className={`p-1.5 py-0.5 rounded-md text-xs text-center inline-block ${colors[label]}`}>
      {statusLabels[label]}
    </div>
  )
}