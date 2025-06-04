"use client"

import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MoviesHeaderProps {
  onAddMovie: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  genreFilter: string
  onGenreFilterChange: (value: string) => void
}

export function MoviesHeader({
  onAddMovie,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  genreFilter,
  onGenreFilterChange,
}: MoviesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý phim</h1>
        <p className="text-muted-foreground">Quản lý danh sách phim trong hệ thống</p>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm phim..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 w-full md:w-[300px]"
          />
        </div>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full md:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="now-showing">Đang chiếu</SelectItem>
            <SelectItem value="coming-soon">Sắp chiếu</SelectItem>
            <SelectItem value="ended">Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>

        <Select value={genreFilter} onValueChange={onGenreFilterChange}>
          <SelectTrigger className="w-full md:w-[150px]">
            <SelectValue placeholder="Thể loại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="action">Hành động</SelectItem>
            <SelectItem value="comedy">Hài kịch</SelectItem>
            <SelectItem value="drama">Chính kịch</SelectItem>
            <SelectItem value="horror">Kinh dị</SelectItem>
            <SelectItem value="romance">Lãng mạn</SelectItem>
            <SelectItem value="sci-fi">Khoa học viễn tưởng</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onAddMovie} className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Thêm phim mới
        </Button>
      </div>
    </div>
  )
}
