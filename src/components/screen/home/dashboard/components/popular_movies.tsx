import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

const popularMovies = [
  {
    title: "Spider-Man: No Way Home",
    genre: "Hành động, Phiêu lưu",
    rating: 4.8,
    bookings: 1250,
    revenue: "2,500,000,000 ₫",
    progress: 95,
  },
  {
    title: "Avatar: The Way of Water",
    genre: "Khoa học viễn tưởng",
    rating: 4.6,
    bookings: 980,
    revenue: "1,960,000,000 ₫",
    progress: 78,
  },
  {
    title: "Top Gun: Maverick",
    genre: "Hành động, Drama",
    rating: 4.7,
    bookings: 756,
    revenue: "1,512,000,000 ₫",
    progress: 60,
  },
  {
    title: "Black Panther",
    genre: "Hành động, Siêu anh hùng",
    rating: 4.5,
    bookings: 623,
    revenue: "1,246,000,000 ₫",
    progress: 49,
  },
]

export function PopularMovies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phim phổ biến</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {popularMovies.map((movie) => (
            <div key={movie.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{movie.title}</p>
                  <p className="text-xs text-muted-foreground">{movie.genre}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{movie.rating}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{movie.bookings} vé đã bán</span>
                  <span>{movie.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
