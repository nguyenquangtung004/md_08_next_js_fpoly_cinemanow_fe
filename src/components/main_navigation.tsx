'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/screen/home/dashboard/components/app_sidebar";
import { DashboardHeader } from "@/components/screen/home/dashboard/components/dash_board_header";
import { PopularMovies } from "@/components/screen/home/dashboard/components/popular_movies";
import { RecentBookings } from "@/components/screen/home/dashboard/components/recent_booking";
import { RevenueChart } from "@/components/screen/home/dashboard/components/revenue_chart";
import { StatsCards } from "@/components/screen/home/dashboard/components/starts_cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// FUNCTIONALITY: Navigation component với đường dẫn chính xác
function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  // FUNCTIONALITY: Xử lý navigation programmatic
  const handleDashboardClick = () => {
    try {
      router.push('/dashboard');
    } catch (error) {
      // DEBUG: Log lỗi navigation
      console.error('Navigation error:', error);
    }
  };

  // FUNCTIONALITY: Xử lý navigation cho add-film
  const handleAddFilmClick = () => {
    try {
      router.push('/page/add-film');
    } catch (error) {
      console.error('Add film navigation error:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* NOTE: Logo hoặc tên ứng dụng */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Cinema App
          </Link>
        </div>

        {/* UI/UX: Menu điều hướng với routes chính xác */}
        <div className="space-x-4 flex items-center">
          {/* FIXME: Sửa lại link "Trang chủ" về root path */}
          <Link 
            href="/"
            className={`hover:text-gray-300 transition-colors ${
              pathname === '/' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Trang chủ
          </Link>
          
          {/* FUNCTIONALITY: Link đến trang add-film */}
          <Link 
            href="/page/add-film"
            className={`hover:text-gray-300 transition-colors ${
              pathname === '/page/add-film' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Thêm phim
          </Link>
          
          {/* FUNCTIONALITY: Link đến dashboard */}
          <Link 
            href="/dashboard"
            className={`hover:text-gray-300 transition-colors ${
              pathname === '/dashboard' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </Link>

            <Link 
            href="/dashboard"
            className={`hover:text-gray-300 transition-colors ${
              pathname === '/dashboard' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
            Dashboard
          </Link>

          <Link
           href="/page/notification"
            className={`hover:text-gray-300 transition-colors ${
              pathname === '/page/notification' ? 'text-blue-400 font-semibold' : ''
            }`}
          >
          
          </Link>
        </div>

        {/* UI/UX: Action buttons */}
        <div className="flex space-x-2">
          {/* FUNCTIONALITY: Button thêm phim */}
          <button 
            onClick={handleAddFilmClick}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-green-400"
            type="button"
          >
            + Thêm phim
          </button>
          
          {/* FUNCTIONALITY: Button đi đến Dashboard */}
          <button 
            onClick={handleDashboardClick}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
          >
            Đi đến Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}

// FUNCTIONALITY: Main Home component với dashboard và navigation
export default function Home() {
  return (
    <div>
      {/* UI/UX: Navigation component được render trước */}
      <Navigation />
      
      {/* FUNCTIONALITY: Dashboard content với sidebar */}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="space-y-4">
              {/* NOTE: Dashboard header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Tổng quan hệ thống đặt véx xem phim</p>
              </div>

              {/* PERFORMANCE: Stats cards component */}
              <StatsCards />

              {/* UI/UX: Revenue chart và popular movies layout */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <RevenueChart />
                </div>
                <div className="col-span-3">
                  <PopularMovies />
                </div>
              </div>

              {/* FEATURE: Recent bookings component */}
              <RecentBookings />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}