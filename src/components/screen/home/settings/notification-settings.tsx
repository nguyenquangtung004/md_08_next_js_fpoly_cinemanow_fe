"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Mail, Smartphone, Monitor } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thông báo</h3>
        <p className="text-sm text-muted-foreground">Quản lý cách bạn nhận thông báo</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Kênh thông báo</CardTitle>
          <CardDescription>Chọn cách bạn muốn nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push notification</p>
                <p className="text-sm text-muted-foreground">Thông báo đẩy trên thiết bị</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Thông báo trong ứng dụng</p>
                <p className="text-sm text-muted-foreground">Hiển thị thông báo trong dashboard</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loại thông báo</CardTitle>
          <CardDescription>Chọn loại thông báo bạn muốn nhận</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Đặt vé và thanh toán</h4>
              <div className="space-y-3 ml-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-booking">Đặt vé mới</Label>
                  <Switch id="new-booking" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-success">Thanh toán thành công</Label>
                  <Switch id="payment-success" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-failed">Thanh toán thất bại</Label>
                  <Switch id="payment-failed" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="booking-cancelled">Hủy đặt vé</Label>
                  <Switch id="booking-cancelled" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Hệ thống</h4>
              <div className="space-y-3 ml-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-maintenance">Bảo trì hệ thống</Label>
                  <Switch id="system-maintenance" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-updates">Cập nhật hệ thống</Label>
                  <Switch id="system-updates" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="security-alerts">Cảnh báo bảo mật</Label>
                  <Switch id="security-alerts" defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Kinh doanh</h4>
              <div className="space-y-3 ml-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-reports">Báo cáo hàng ngày</Label>
                  <Switch id="daily-reports" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-reports">Báo cáo hàng tuần</Label>
                  <Switch id="weekly-reports" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="revenue-alerts">Cảnh báo doanh thu</Label>
                  <Switch id="revenue-alerts" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tần suất thông báo</CardTitle>
          <CardDescription>Cài đặt tần suất nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email-frequency">Tần suất email</Label>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Ngay lập tức</SelectItem>
                  <SelectItem value="hourly">Mỗi giờ</SelectItem>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="digest-time">Thời gian gửi tổng hợp</Label>
              <Select defaultValue="09:00">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06:00">06:00</SelectItem>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
