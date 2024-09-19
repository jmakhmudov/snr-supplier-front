"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { HiShoppingCart } from "react-icons/hi";


export const description = "A bar chart with a custom label"

const chartData = [
  { status: "В ожидании", views: 42, fill: "fill-yellow-400" },
  { status: "Доставляется", views: 8 },
  { status: "Доставлен", views: 4 },
  { status: "Отменен", views: 0 },
]

const chartConfig = {
  views: {
    label: "Заказы",
  },
} satisfies ChartConfig

export function OrdersStatusChart() {
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
            right: 16,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="status"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="views" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar
            dataKey="views"
            layout="vertical"
            fill="var(--color-views)"
            radius={4}
          >
            <LabelList
              dataKey="views"
              offset={8}
              className="fill-white"
              fontSize={12}
            />
            <LabelList
              dataKey="status"
              position="right"
              offset={8}
              className="fill-[--color-label]"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
