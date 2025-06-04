"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Send, Save } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { Notification } from "./notifications-table"

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  notification?: Notification | null
  onSave: (
    notification: Omit<Notification, "id" | "createdAt" | "readCount" | "totalRecipients"> & { id?: string },
  ) => void
  onSend: (
    notification: Omit<Notification, "id" | "createdAt" | "readCount" | "totalRecipients"> & { id?: string },
  ) => void
}

export function NotificationDialog({ open, onOpenChange, notification, onSave, onSend }: NotificationDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info" as Notification["type"],
    targetAudience: "all" as Notification["targetAudience"],
    targetUsers: "",
    priority: "medium" as Notification["priority"],
    scheduleEnabled: false,
    scheduledAt: undefined as Date | undefined,
  })

  useEffect(() => {
    if (notification) {
      setFormData({
        title: notification.title,
        content: notification.content,
        type: notification.type,
        targetAudience: notification.targetAudience,
        targetUsers: notification.targetUsers?.join(", ") || "",
        priority: notification.priority,
        scheduleEnabled: !!notification.scheduledAt,
        scheduledAt: notification.scheduledAt ? new Date(notification.scheduledAt) : undefined,
      })
    } else {
      setFormData({
        title: "",
        content: "",
        type: "info",
        targetAudience: "all",
        targetUsers: "",
        priority: "medium",
        scheduleEnabled: false,
        scheduledAt: undefined,
      })
    }
  }, [notification, open])

  const handleSave = (sendNow = false) => {
    const notificationData = {
      ...(notification?.id && { id: notification.id }),
      title: formData.title,
      content: formData.content,
      type: formData.type,
      targetAudience: formData.targetAudience,
      targetUsers: formData.targetUsers ? formData.targetUsers.split(",").map((user) => user.trim()) : undefined,
      priority: formData.priority,
      status: sendNow ? ("sent" as const) : formData.scheduleEnabled ? ("scheduled" as const) : ("draft" as const),
      scheduledAt: formData.scheduleEnabled && formData.scheduledAt ? formData.scheduledAt.toISOString() : undefined,
      sentAt: sendNow ? new Date().toISOString() : undefined,
    }

    if (sendNow) {
      onSend(notificationData)
    } else {
      onSave(notificationData)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{notification ? "Chỉnh sửa thông báo" : "Tạo thông báo mới"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Nhập tiêu đề thông báo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Nội dung *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Nhập nội dung thông báo"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Loại thông báo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Notification["type"]) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Thông tin</SelectItem>
                  <SelectItem value="system">Hệ thống</SelectItem>
                  <SelectItem value="promotion">Khuyến mãi</SelectItem>
                  <SelectItem value="warning">Cảnh báo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Notification["priority"]) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Đối tượng nhận *</Label>
            <Select
              value={formData.targetAudience}
              onValueChange={(value: Notification["targetAudience"]) =>
                setFormData((prev) => ({ ...prev, targetAudience: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả người dùng</SelectItem>
                <SelectItem value="customers">Khách hàng</SelectItem>
                <SelectItem value="staff">Nhân viên</SelectItem>
                <SelectItem value="specific">Người dùng cụ thể</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.targetAudience === "specific" && (
            <div className="space-y-2">
              <Label htmlFor="targetUsers">Email người dùng (cách nhau bởi dấu phẩy)</Label>
              <Input
                id="targetUsers"
                value={formData.targetUsers}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetUsers: e.target.value }))}
                placeholder="user1@email.com, user2@email.com"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="schedule"
              checked={formData.scheduleEnabled}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, scheduleEnabled: checked }))}
            />
            <Label htmlFor="schedule">Lên lịch gửi</Label>
          </div>

          {formData.scheduleEnabled && (
            <div className="space-y-2">
              <Label>Thời gian gửi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.scheduledAt ? (
                      format(formData.scheduledAt, "PPP HH:mm", { locale: vi })
                    ) : (
                      <span>Chọn ngày và giờ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* <Calendar
                    mode="single"
                    selected={formData.scheduledAt}
                    onSelect={(date: Date) => setFormData((prev) => ({ ...prev, scheduledAt: date }))}
                    initialFocus
                  /> */}
                  <div className="p-3 border-t">
                    <Input
                      type="time"
                      value={formData.scheduledAt ? format(formData.scheduledAt, "HH:mm") : ""}
                      onChange={(e) => {
                        if (formData.scheduledAt && e.target.value) {
                          const [hours, minutes] = e.target.value.split(":")
                          const newDate = new Date(formData.scheduledAt)
                          newDate.setHours(Number.parseInt(hours), Number.parseInt(minutes))
                          setFormData((prev) => ({ ...prev, scheduledAt: newDate }))
                        }
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button type="button" variant="secondary" onClick={() => handleSave(false)}>
            <Save className="h-4 w-4 mr-2" />
            Lưu nháp
          </Button>
          <Button type="button" onClick={() => handleSave(true)}>
            <Send className="h-4 w-4 mr-2" />
            Gửi ngay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
