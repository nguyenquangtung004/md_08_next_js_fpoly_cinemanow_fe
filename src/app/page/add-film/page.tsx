"use client"

import { useState, useMemo } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Movie, MoviesTable } from "@/components/screen/home/film/components/movies-table"
import { AppSidebar } from "@/components/screen/home/dashboard/components/app_sidebar"
import { DashboardHeader } from "@/components/screen/home/dashboard/components/dash_board_header"
import { MoviesHeader } from "@/components/screen/home/film/components/movies-header"
import { MovieDialog } from "@/components/screen/home/film/components/movie-dialog"

// Mock data
const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Spider-Man: No Way Home",
    genre: ["Hành động", "Phiêu lưu", "Khoa học viễn tưởng"],
    duration: 148,
    director: "Jon Watts",
    actors: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    description: "Peter Parker's secret identity is revealed to the entire world...",
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    status: "now-showing",
    releaseDate: "2021-12-17",
    language: "Tiếng Anh",
    price: 120000,
  },
  {
    id: "2",
    title: "Avatar: The Way of Water",
    genre: ["Khoa học viễn tưởng", "Phiêu lưu", "Chính kịch"],
    duration: 192,
    director: "James Cameron",
    actors: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    description: "Jake Sully lives with his newfound family formed on the planet of Pandora...",
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    status: "now-showing",
    releaseDate: "2022-12-16",
    language: "Tiếng Anh",
    price: 150000,
  },
  {
    id: "3",
    title: "Top Gun: Maverick",
    genre: ["Hành động", "Chính kịch"],
    duration: 130,
    director: "Joseph Kosinski",
    actors: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator...",
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    status: "ended",
    releaseDate: "2022-05-27",
    language: "Tiếng Anh",
    price: 110000,
  },
  {
    id: "4",
    title: "Black Panther: Wakanda Forever",
    genre: ["Hành động", "Chính kịch", "Khoa học viễn tưởng"],
    duration: 161,
    director: "Ryan Coogler",
    actors: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira"],
    description: "The people of Wakanda fight to protect their home from intervening world powers...",
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    status: "now-showing",
    releaseDate: "2022-11-11",
    language: "Tiếng Anh",
    price: 130000,
  },
  {
    id: "5",
    title: "Mắt Biếc",
    genre: ["Lãng mạn", "Chính kịch"],
    duration: 117,
    director: "Victor Vũ",
    actors: ["Trần Nghĩa", "Trúc Anh", "Trang Hý"],
    description: "Chuyện tình đẹp nhưng đầy bi thương giữa Ngạn và Hà Lan...",
    poster: "/placeholder.svg?height=300&width=200",
    rating: 4.3,
    status: "coming-soon",
    releaseDate: "2024-02-14",
    language: "Tiếng Việt",
    price: 90000,
  },
]

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genreFilter, setGenreFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter === "all" || movie.status === statusFilter

      const matchesGenre =
        genreFilter === "all" || movie.genre.some((g) => g.toLowerCase().includes(genreFilter.toLowerCase()))

      return matchesSearch && matchesStatus && matchesGenre
    })
  }, [movies, searchQuery, statusFilter, genreFilter])

  const handleAddMovie = () => {
    setEditingMovie(null)
    setIsDialogOpen(true)
  }

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie)
    setIsDialogOpen(true)
  }

  const handleSaveMovie = (movieData: Omit<Movie, "id"> & { id?: string }) => {
    if (movieData.id) {
      // Edit existing movie
      setMovies((prev) => prev.map((movie) => (movie.id === movieData.id ? { ...movieData, id: movieData.id } : movie)))
    } else {
      // Add new movie
      const newMovie: Movie = {
        ...movieData,
        id: Date.now().toString(),
      }
      setMovies((prev) => [...prev, newMovie])
    }
  }

  const handleDeleteMovie = (movieId: string) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <MoviesHeader
            onAddMovie={handleAddMovie}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            genreFilter={genreFilter}
            onGenreFilterChange={setGenreFilter}
          />

          <MoviesTable movies={filteredMovies} onEditMovie={handleEditMovie} onDeleteMovie={handleDeleteMovie} />

          <MovieDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            movie={editingMovie}
            onSave={handleSaveMovie}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
