"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Trash2, Send, Eye, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

export interface Notification {
  id: string
  title: string
  content: string
  type: "system" | "promotion" | "warning" | "info"
  status: "sent" | "draft" | "scheduled"
  targetAudience: "all" | "customers" | "staff" | "specific"
  targetUsers?: string[]
  createdAt: string
  sentAt?: string
  scheduledAt?: string
  readCount: number
  totalRecipients: number
  priority: "low" | "medium" | "high"
}

interface NotificationsTableProps {
  notifications: Notification[]
  onEditNotification: (notification: Notification) => void
  onDeleteNotification: (notificationId: string) => void
  onSendNotification: (notificationId: string) => void
}

const typeLabels = {
  system: { label: "Hệ thống", variant: "default" as const, color: "bg-blue-500" },
  promotion: { label: "Khuyến mãi", variant: "secondary" as const, color: "bg-green-500" },
  warning: { label: "Cảnh báo", variant: "destructive" as const, color: "bg-red-500" },
  info: { label: "Thông tin", variant: "outline" as const, color: "bg-gray-500" },
}

const statusLabels = {
  sent: { label: "Đã gửi", variant: "default" as const },
  draft: { label: "Nháp", variant: "secondary" as const },
  scheduled: { label: "Đã lên lịch", variant: "outline" as const },
}

const priorityLabels = {
  low: { label: "Thấp", color: "text-gray-500" },
  medium: { label: "Trung bình", color: "text-yellow-500" },
  high: { label: "Cao", color: "text-red-500" },
}

export function NotificationsTable({
  notifications,
  onEditNotification,
  onDeleteNotification,
  onSendNotification,
}: NotificationsTableProps) {
  const [deleteNotificationId, setDeleteNotificationId] = useState<string | null>(null)

  const handleDeleteConfirm = () => {
    if (deleteNotificationId) {
      onDeleteNotification(deleteNotificationId)
      setDeleteNotificationId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thông báo</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Đối tượng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Độ ưu tiên</TableHead>
              <TableHead>Thống kê</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-2">{notification.content}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${typeLabels[notification.type].color}`} />
                    <Badge variant={typeLabels[notification.type].variant}>{typeLabels[notification.type].label}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {notification.targetAudience === "all"
                        ? "Tất cả"
                        : notification.targetAudience === "customers"
                          ? "Khách hàng"
                          : notification.targetAudience === "staff"
                            ? "Nhân viên"
                            : "Cụ thể"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusLabels[notification.status].variant}>
                    {statusLabels[notification.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${priorityLabels[notification.priority].color}`}>
                    {priorityLabels[notification.priority].label}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>
                      {notification.readCount}/{notification.totalRecipients} đã đọc
                    </div>
                    <div className="text-muted-foreground">
                      {Math.round((notification.readCount / notification.totalRecipients) * 100)}% tỷ lệ đọc
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>Tạo: {formatDate(notification.createdAt)}</div>
                    {notification.sentAt && (
                      <div className="text-muted-foreground">Gửi: {formatDate(notification.sentAt)}</div>
                    )}
                    {notification.scheduledAt && (
                      <div className="text-muted-foreground">Lên lịch: {formatDate(notification.scheduledAt)}</div>
                    )}
                  </div>
                </TableCell>
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
                      {notification.status === "draft" && (
                        <DropdownMenuItem onClick={() => onSendNotification(notification.id)}>
                          <Send className="mr-2 h-4 w-4" />
                          Gửi ngay
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onEditNotification(notification)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteNotificationId(notification.id)}
                      >
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

      <AlertDialog open={!!deleteNotificationId} onOpenChange={() => setDeleteNotificationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa thông báo</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa thông báo này? Hành động này không thể hoàn tác.
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
