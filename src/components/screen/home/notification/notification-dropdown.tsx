"use client"

import { useState } from "react"
import { Bell, Check, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserNotification {
  id: string
  title: string
  content: string
  type: "system" | "promotion" | "warning" | "info"
  isRead: boolean
  createdAt: string
}

const mockUserNotifications: UserNotification[] = [
  {
    id: "1",
    title: "Khuyến mãi đặc biệt",
    content: "Giảm 50% cho tất cả vé xem phim vào cuối tuần",
    type: "promotion",
    isRead: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Bảo trì hệ thống",
    content: "Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày mai",
    type: "system",
    isRead: false,
    createdAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    title: "Phim mới ra mắt",
    content: "Spider-Man: No Way Home đã có lịch chiếu mới",
    type: "info",
    isRead: true,
    createdAt: "2024-01-14T16:45:00Z",
  },
]

const typeColors = {
  system: "bg-blue-500",
  promotion: "bg-green-500",
  warning: "bg-red-500",
  info: "bg-gray-500",
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<UserNotification[]>(mockUserNotifications)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Vừa xong"
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    return `${Math.floor(diffInHours / 24)} ngày trước`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{unreadCount}</Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h4 className="font-semibold">Thông báo</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">Không có thông báo nào</div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-muted/50 cursor-pointer border-l-4 ${
                    notification.isRead ? "border-transparent" : "border-primary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${typeColors[notification.type]}`} />
                        <p className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                          {notification.title}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.content}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(notification.createdAt)}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Xem tất cả thông báo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
