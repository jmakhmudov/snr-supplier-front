import { Analytics, getAnalytics } from "@/utils/api/analytics";
import { OrdersStatusChart } from "./charts/orders-status-chart";
import ViewsChart from "./charts/views-chart";

export default async function AnalyticsPage() {
  const data: Analytics = await getAnalytics();
  console.log(data);
  return (
    <div>
      <h1 className="font-semibold">Аналитика</h1>

      <section className=" mt-10 grid grid-cols-1 md:grid-cols-2 w-full gap-5">
        <div>
          <div className="text-sm mb-1">Общий доход (сум)</div>
          <div className="font-bold text-4xl">{data.total_revenue.toLocaleString("ru")}</div>
        </div>

        <div>
          <div className="text-sm mb-1">Всего товаров продано (шт.)</div>
          <div className="font-bold text-4xl">{data.total_sold.toLocaleString("ru")}</div>
        </div>

        <OrdersStatusChart data={data.order_status_stats} />

        <ViewsChart data={data.total_views} />
      </section>
    </div>
  )
}