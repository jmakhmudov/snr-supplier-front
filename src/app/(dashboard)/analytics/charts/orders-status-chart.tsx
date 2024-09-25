"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { HiShoppingCart } from "react-icons/hi";
import { statusLabels } from "@/components/ui/Status";

export const description = "A bar chart with a custom label"

interface OrdersStatusChartProps {
  data: {
    status: string;
    count: number;
  }[]
}

const chartConfig = {
  count: {
    label: "Заказы",
  },
} satisfies ChartConfig

export function OrdersStatusChart({
  data
}: OrdersStatusChartProps) {
  const chartData = data.map(item => ({
    ...item,
    status: statusLabels[item.status as keyof typeof statusLabels]
  }));

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Статус заказов</div>
        <HiShoppingCart />
      </div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 30,
            right: 15,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey="count" hide />
          <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="count" className="fill-blue" radius={5}>
            <LabelList
              dataKey="count"
              position="right"
              offset={8}
              className="fill-black"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="text-xs text-gray-normal mt-4">Статус заказов не меняется под выбор даты</div>
    </div>
  )
}
