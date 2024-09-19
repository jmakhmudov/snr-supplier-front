import { OrdersStatusChart } from "./charts/orders-status-chart";
import ViewsChart from "./charts/views-chart";

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="font-semibold">Аналитика</h1>

      <section className=" mt-10">
        <div>
          <div className="text-sm mb-1">Общий доход (сум)</div>
          <div className="font-bold text-4xl">34 342 000</div>
        </div>

        <section className="flex gap-5 mt-5">
          <OrdersStatusChart />
          
          <ViewsChart />
        </section>
      </section>
    </div>
  )
}