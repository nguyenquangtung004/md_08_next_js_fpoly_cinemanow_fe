"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface Movie {
  id: string
  title: string
  genre: string[]
  duration: number
  director: string
  actors: string[]
  description: string
  poster: string
  rating: number
  status: "now-showing" | "coming-soon" | "ended"
  releaseDate: string
  language: string
  price: number
}

interface MoviesTableProps {
  movies: Movie[]
  onEditMovie: (movie: Movie) => void
  onDeleteMovie: (movieId: string) => void
}

const statusLabels = {
  "now-showing": { label: "Đang chiếu", variant: "default" as const },
  "coming-soon": { label: "Sắp chiếu", variant: "secondary" as const },
  ended: { label: "Đã kết thúc", variant: "outline" as const },
}

export function MoviesTable({ movies, onEditMovie, onDeleteMovie }: MoviesTableProps) {
  const [deleteMovieId, setDeleteMovieId] = useState<string | null>(null)

  const handleDeleteConfirm = () => {
    if (deleteMovieId) {
      onDeleteMovie(deleteMovieId)
      setDeleteMovieId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phim</TableHead>
              <TableHead>Thể loại</TableHead>
              <TableHead>Thời lượng</TableHead>
              <TableHead>Đạo diễn</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Giá vé</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 rounded-md">
                      <AvatarImage src={movie.poster || "/placeholder.svg"} alt={movie.title} />
                      <AvatarFallback className="rounded-md">{movie.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{movie.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {movie.language} • {movie.releaseDate}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {movie.genre.slice(0, 2).map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                    {movie.genre.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{movie.genre.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{movie.duration} phút</TableCell>
                <TableCell className="max-w-[150px] truncate">{movie.director}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusLabels[movie.status].variant}>{statusLabels[movie.status].label}</Badge>
                </TableCell>
                <TableCell className="font-medium">{movie.price.toLocaleString("vi-VN")} ₫</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditMovie(movie)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => setDeleteMovieId(movie.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteMovieId} onOpenChange={() => setDeleteMovieId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa phim</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phim này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
