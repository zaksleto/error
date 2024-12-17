"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { Acesso, End } from "@/lib/utils"

const chartConfig = {
  access: {
    label: "Acessos",
    color: "hsl(var(--chart-1))",
  },
  answers: {
    label: "Respostas",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function FunisAnalytics({
  acessos,
  end
}: {
  acessos: Acesso[]
  end: End[]
}) {
  const chartData = React.useMemo(() => {
    // Create a map to store counts per date
    const dateMap = new Map<string, { access: number; answers: number }>()

    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    thirtyDaysAgo.setHours(0, 0, 0, 0)

    // Get the current date for the end of our range
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    // Fill in all dates for the last 30 days
    const currentDate = new Date(thirtyDaysAgo)
    while (currentDate <= today) {
      const dateStr = currentDate.toISOString().split('T')[0]
      dateMap.set(dateStr, { access: 0, answers: 0 })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Now add the actual data, but only for the last 30 days

    acessos.forEach(acesso => {
      const dateStr = (acesso.date.toDate()).toISOString().split('T')[0]
      const current = dateMap.get(dateStr) || { access: 0, answers: 0 }
      dateMap.set(dateStr, { 
        ...current, 
        access: current.access + 1
      })
    })

    end.forEach(end => {
      const dateStr = (end.date.toDate()).toISOString().split('T')[0]
      const current = dateMap.get(dateStr) || { access: 0, answers: 0 }
      dateMap.set(dateStr, { 
        ...current, 
        answers: current.answers + 1
      })
    })

    //funils.forEach(funil => {
    //  // Process access dates
    //  funil.access_dates.forEach(date => {
    //    if (date >= thirtyDaysAgo && date <= today) {
    //      const dateStr = date.toISOString().split('T')[0]
    //      const current = dateMap.get(dateStr) || { access: 0, answers: 0 }
    //      dateMap.set(dateStr, { 
    //        ...current, 
    //        access: current.access + 1
    //      })
    //    }
    //  })
//
    //  // Process answer dates
    //  funil.answers_dates.forEach(date => {
    //    if (date >= thirtyDaysAgo && date <= today) {
    //      const dateStr = date.toISOString().split('T')[0]
    //      const current = dateMap.get(dateStr) || { access: 0, answers: 0 }
    //      dateMap.set(dateStr, { 
    //        ...current, 
    //        answers: current.answers + 1
    //      })
    //    }
    //  })
    //})

    // Convert map to array and sort by date
    return Array.from(dateMap.entries())
      .map(([date, counts]) => ({
        date,
        ...counts
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [acessos, end])

  const total = React.useMemo(
    () => ({
      access: chartData.reduce((acc, curr) => acc + curr.access, 0),
      answers: chartData.reduce((acc, curr) => acc + curr.answers, 0),
    }),
    [chartData]
  )

  const completionPercentage = React.useMemo(() => {
    if (total.access === 0) return 0
    return ((total.answers / total.access) * 100).toFixed(1)
  }, [total])

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Analytics Últimos 30 Dias</CardTitle>
          <CardDescription>
            Mostrando interações para todos os funis de forma agregada
          </CardDescription>
        </div>
        <div className="flex">
          {["access", "answers"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <div
                key={chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </div>
            )
          })}
          <div
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              % De Finalizações
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {completionPercentage}%
            </span>
          </div>
          <div
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Interações
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.access + total.answers}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={0}
              tickFormatter={(value: string) => {
                const date = new Date(value)
                let mes = date.toLocaleDateString("pt-BR", {
                  month: "short",
                })
                // Uppercase the first letter of the month
                mes = mes.charAt(0).toUpperCase() + mes.slice(1)

                const dia = date.toLocaleDateString("pt-BR", {
                  day: "numeric",
                })

                return `${mes} ${dia}`

              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  formatter={(value: ValueType, name: NameType) => `${value} ${chartConfig[name as keyof typeof chartConfig].label}`}
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey="access" fill="var(--color-access)" stackId="interactions" />
            <Bar dataKey="answers" fill="var(--color-answers)" stackId="interactions" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
