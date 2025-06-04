"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "T2", revenue: 45000000 },
  { name: "T3", revenue: 52000000 },
  { name: "T4", revenue: 38000000 },
  { name: "T5", revenue: 61000000 },
  { name: "T6", revenue: 78000000 },
  { name: "T7", revenue: 95000000 },
  { name: "CN", revenue: 87000000 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu 7 ngày qua</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
            <Tooltip formatter={(value) => [`${Number(value).toLocaleString("vi-VN")} ₫`, "Doanh thu"]} />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
