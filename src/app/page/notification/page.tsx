"use client"

import { useState, useMemo } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/screen/home/dashboard/components/app_sidebar"
import { DashboardHeader } from "@/components/screen/home/dashboard/components/dash_board_header"
import { NotificationsHeader } from "@/components/screen/home/notification/notifications-header"
import { NotificationsTable } from "@/components/screen/home/notification/notifications-table"
import { NotificationDialog } from "@/components/screen/home/notification/notification-dialog"

// Notification type definition
type Notification = {
  id: string
  title: string
  content: string
  type: "promotion" | "system" | "info" | "warning"
  status: "sent" | "scheduled" | "draft"
  targetAudience: "all" | "customers" | "staff" | "specific"
  createdAt: string
  sentAt?: string
  scheduledAt?: string
  readCount: number
  totalRecipients: number
  priority: "high" | "medium" | "low"
}

// Mock data
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Khuyến mãi cuối tuần",
    content: "Giảm giá 50% cho tất cả vé xem phim vào thứ 7 và chủ nhật. Áp dụng cho tất cả rạp trong hệ thống.",
    type: "promotion",
    status: "sent",
    targetAudience: "all",
    createdAt: "2024-01-15T08:00:00Z",
    sentAt: "2024-01-15T08:30:00Z",
    readCount: 1250,
    totalRecipients: 2500,
    priority: "high",
  },
  {
    id: "2",
    title: "Bảo trì hệ thống định kỳ",
    content:
      "Hệ thống sẽ được bảo trì từ 2:00 - 4:00 sáng ngày 20/01/2024. Trong thời gian này, việc đặt vé có thể bị gián đoạn.",
    type: "system",
    status: "scheduled",
    targetAudience: "all",
    createdAt: "2024-01-14T10:00:00Z",
    scheduledAt: "2024-01-19T18:00:00Z",
    readCount: 0,
    totalRecipients: 2500,
    priority: "medium",
  },
  {
    id: "3",
    title: "Phim mới: Avatar 3",
    content: "Avatar: The Seed Bearer sẽ ra mắt vào tháng 12/2024. Đặt vé sớm để nhận ưu đãi đặc biệt.",
    type: "info",
    status: "draft",
    targetAudience: "customers",
    createdAt: "2024-01-13T15:30:00Z",
    readCount: 0,
    totalRecipients: 1800,
    priority: "low",
  },
  {
    id: "4",
    title: "Cảnh báo: Lỗi thanh toán",
    content:
      "Phát hiện lỗi trong hệ thống thanh toán online. Khách hàng có thể gặp khó khăn khi thanh toán bằng thẻ tín dụng.",
    type: "warning",
    status: "sent",
    targetAudience: "staff",
    createdAt: "2024-01-12T14:20:00Z",
    sentAt: "2024-01-12T14:25:00Z",
    readCount: 45,
    totalRecipients: 50,
    priority: "high",
  },
  {
    id: "5",
    title: "Chương trình khách hàng thân thiết",
    content: "Ra mắt chương trình tích điểm mới dành cho khách hàng thường xuyên. Tích điểm để đổi vé miễn phí.",
    type: "promotion",
    status: "sent",
    targetAudience: "customers",
    createdAt: "2024-01-10T09:00:00Z",
    sentAt: "2024-01-10T09:15:00Z",
    readCount: 980,
    totalRecipients: 1800,
    priority: "medium",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.content.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = typeFilter === "all" || notification.type === typeFilter
      const matchesStatus = statusFilter === "all" || notification.status === statusFilter

      return matchesSearch && matchesType && matchesStatus
    })
  }, [notifications, searchQuery, typeFilter, statusFilter])

  const handleAddNotification = () => {
    setEditingNotification(null)
    setIsDialogOpen(true)
  }

  const handleEditNotification = (notification: Notification) => {
    setEditingNotification(notification)
    setIsDialogOpen(true)
  }

  const handleSaveNotification = (
    notificationData: Omit<Notification, "id" | "createdAt" | "readCount" | "totalRecipients"> & { id?: string },
  ) => {
    if (notificationData.id) {
      // Edit existing notification
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationData.id
            ? {
                ...notificationData,
                id: notificationData.id,
                createdAt: notification.createdAt,
                readCount: notification.readCount,
                totalRecipients: notification.totalRecipients,
              }
            : notification,
        ),
      )
    } else {
      // Add new notification
      const newNotification: Notification = {
        ...notificationData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        readCount: 0,
        totalRecipients:
          notificationData.targetAudience === "all"
            ? 2500
            : notificationData.targetAudience === "customers"
              ? 1800
              : 50,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  const handleSendNotification = (
    notificationData: Omit<Notification, "id" | "createdAt" | "readCount" | "totalRecipients"> & { id?: string },
  ) => {
    const updatedData = {
      ...notificationData,
      status: "sent" as const,
      sentAt: new Date().toISOString(),
    }
    handleSaveNotification(updatedData)
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId))
  }

  const handleSendNotificationNow = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              status: "sent" as const,
              sentAt: new Date().toISOString(),
            }
          : notification,
      ),
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <NotificationsHeader
            onAddNotification={handleAddNotification}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <NotificationsTable
            notifications={filteredNotifications}
            onEditNotification={handleEditNotification}
            onDeleteNotification={handleDeleteNotification}
            onSendNotification={handleSendNotificationNow}
          />

          <NotificationDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            notification={editingNotification}
            onSave={handleSaveNotification}
            onSend={handleSendNotification}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
