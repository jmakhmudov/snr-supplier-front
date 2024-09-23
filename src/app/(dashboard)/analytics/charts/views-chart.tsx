"use client"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { IoMdEye } from "react-icons/io"
import { getViewsLabelRu } from "@/helpers/getViewsLabelRu"

const chartConfig = {
  views: {
    label: "views",
  }
} satisfies ChartConfig

interface ViewsChartProps {
  data: number;
}

export default function ViewsChart({
  data
}: ViewsChartProps) {
  const chartData = [
    { views: data, fill: "#3A76FF" },
  ]

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className=" mb-3 flex items-center justify-between">
        <div className="text-lg font-semibold">Просмотры товаров</div>
        <IoMdEye />
      </div>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full"
      >
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
          innerRadius={80}
          outerRadius={110}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background w-full"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="views" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold w-full"
                      >
                        {chartData[0].views.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {getViewsLabelRu(data)}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}