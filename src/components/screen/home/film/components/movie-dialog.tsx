"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Movie } from "./movies-table"

interface MovieDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  movie?: Movie | null
  onSave: (movie: Omit<Movie, "id"> & { id?: string }) => void
}

const genreOptions = [
  "Hành động",
  "Hài kịch",
  "Chính kịch",
  "Kinh dị",
  "Lãng mạn",
  "Khoa học viễn tưởng",
  "Phiêu lưu",
  "Hoạt hình",
  "Tài liệu",
  "Âm nhạc",
]

export function MovieDialog({ open, onOpenChange, movie, onSave }: MovieDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    genre: [] as string[],
    duration: "",
    director: "",
    actors: "",
    description: "",
    poster: "",
    rating: "",
    status: "coming-soon" as Movie["status"],
    releaseDate: "",
    language: "Tiếng Việt",
    price: "",
  })

  const [newGenre, setNewGenre] = useState("")

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration.toString(),
        director: movie.director,
        actors: movie.actors.join(", "),
        description: movie.description,
        poster: movie.poster,
        rating: movie.rating.toString(),
        status: movie.status,
        releaseDate: movie.releaseDate,
        language: movie.language,
        price: movie.price.toString(),
      })
    } else {
      setFormData({
        title: "",
        genre: [],
        duration: "",
        director: "",
        actors: "",
        description: "",
        poster: "",
        rating: "",
        status: "coming-soon",
        releaseDate: "",
        language: "Tiếng Việt",
        price: "",
      })
    }
  }, [movie, open])

  const handleAddGenre = (genre: string) => {
    if (genre && !formData.genre.includes(genre)) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genre],
      }))
    }
    setNewGenre("")
  }

  const handleRemoveGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre.filter((g) => g !== genreToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const movieData = {
      ...(movie?.id && { id: movie.id }),
      title: formData.title,
      genre: formData.genre,
      duration: Number.parseInt(formData.duration),
      director: formData.director,
      actors: formData.actors.split(",").map((actor) => actor.trim()),
      description: formData.description,
      poster: formData.poster || "/placeholder.svg?height=300&width=200",
      rating: Number.parseFloat(formData.rating),
      status: formData.status,
      releaseDate: formData.releaseDate,
      language: formData.language,
      price: Number.parseInt(formData.price),
    }

    onSave(movieData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{movie ? "Chỉnh sửa phim" : "Thêm phim mới"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tên phim *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Thời lượng (phút) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Thể loại</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                  {genre}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveGenre(genre)} />
                </Badge>
              ))}
            </div>
            <Select value={newGenre} onValueChange={handleAddGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thể loại" />
              </SelectTrigger>
              <SelectContent>
                {genreOptions.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="director">Đạo diễn *</Label>
              <Input
                id="director"
                value={formData.director}
                onChange={(e) => setFormData((prev) => ({ ...prev, director: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5) *</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="actors">Diễn viên (cách nhau bởi dấu phẩy)</Label>
            <Input
              id="actors"
              value={formData.actors}
              onChange={(e) => setFormData((prev) => ({ ...prev, actors: e.target.value }))}
              placeholder="Diễn viên 1, Diễn viên 2, ..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poster">URL Poster</Label>
            <Input
              id="poster"
              value={formData.poster}
              onChange={(e) => setFormData((prev) => ({ ...prev, poster: e.target.value }))}
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Movie["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
                  <SelectItem value="now-showing">Đang chiếu</SelectItem>
                  <SelectItem value="ended">Đã kết thúc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Ngày khởi chiếu *</Label>
              <Input
                id="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, releaseDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Giá vé (VNĐ) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Ngôn ngữ</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tiếng Việt">Tiếng Việt</SelectItem>
                <SelectItem value="Tiếng Anh">Tiếng Anh</SelectItem>
                <SelectItem value="Tiếng Hàn">Tiếng Hàn</SelectItem>
                <SelectItem value="Tiếng Nhật">Tiếng Nhật</SelectItem>
                <SelectItem value="Tiếng Trung">Tiếng Trung</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">{movie ? "Cập nhật" : "Thêm phim"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
