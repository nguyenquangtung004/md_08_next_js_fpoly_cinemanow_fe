"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationDropdown } from "@/components/screen/home/notification/notification-dropdown"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Tìm kiếm phim, khách hàng, đặt vé..." className="pl-8" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <NotificationDropdown />
      </div>
    </header>
  )
}
