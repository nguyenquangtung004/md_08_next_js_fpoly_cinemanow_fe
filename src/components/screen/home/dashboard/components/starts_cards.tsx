import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Users, Film, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Tổng vé bán hôm nay",
    value: "1,234",
    change: "+12%",
    icon: Ticket,
    color: "text-blue-600",
  },
  {
    title: "Doanh thu hôm nay",
    value: "45,678,000 ₫",
    change: "+8%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Khách hàng mới",
    value: "89",
    change: "+23%",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Phim đang chiếu",
    value: "24",
    change: "+2",
    icon: Film,
    color: "text-orange-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> so với hôm qua
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
