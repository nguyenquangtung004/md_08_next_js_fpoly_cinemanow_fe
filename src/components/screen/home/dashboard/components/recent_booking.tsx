import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentBookings = [
  {
    id: "BK001",
    customer: "Nguyễn Văn A",
    movie: "Spider-Man: No Way Home",
    theater: "CGV Vincom",
    time: "19:30",
    seats: "A1, A2",
    amount: "200,000 ₫",
    status: "confirmed",
  },
  {
    id: "BK002",
    customer: "Trần Thị B",
    movie: "Avatar: The Way of Water",
    theater: "Lotte Cinema",
    time: "21:00",
    seats: "B5, B6, B7",
    amount: "300,000 ₫",
    status: "confirmed",
  },
  {
    id: "BK003",
    customer: "Lê Văn C",
    movie: "Top Gun: Maverick",
    theater: "Galaxy Cinema",
    time: "16:45",
    seats: "C3, C4",
    amount: "180,000 ₫",
    status: "pending",
  },
  {
    id: "BK004",
    customer: "Phạm Thị D",
    movie: "Black Panther",
    theater: "CGV Landmark",
    time: "14:30",
    seats: "D1",
    amount: "120,000 ₫",
    status: "confirmed",
  },
]

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đặt vé gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>{booking.customer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{booking.customer}</p>
                  <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                    {booking.status === "confirmed" ? "Đã xác nhận" : "Chờ xử lý"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {booking.movie} • {booking.theater}
                </p>
                <p className="text-xs text-muted-foreground">
                  {booking.time} • Ghế {booking.seats} • {booking.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
