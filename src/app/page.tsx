// "use client";
// import LoginScrenn from "@/app/screen/login";
// import AppError from "@/app/error";

import { AppSidebar } from "@/components/screen/home/dashboard/components/app_sidebar";
import { DashboardHeader } from "@/components/screen/home/dashboard/components/dash_board_header";
import { PopularMovies } from "@/components/screen/home/dashboard/components/popular_movies";
import { RecentBookings } from "@/components/screen/home/dashboard/components/recent_booking";
import { RevenueChart } from "@/components/screen/home/dashboard/components/revenue_chart";
import { StatsCards } from "@/components/screen/home/dashboard/components/starts_cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// import Loading from "@/app/loading";
export default function Home() {
  return (
    <div>
   <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Tổng quan hệ thống đặt vé xem phim</p>
            </div>

            <StatsCards />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <RevenueChart />
              </div>
              <div className="col-span-3">
                <PopularMovies />
              </div>
            </div>

            <RecentBookings />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}
