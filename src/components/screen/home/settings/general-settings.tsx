"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài đặt chung</h3>
        <p className="text-sm text-muted-foreground">Quản lý thông tin cơ bản của hệ thống</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Thông tin công ty</CardTitle>
          <CardDescription>Cập nhật thông tin cơ bản về rạp chiếu phim</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Tên công ty</Label>
              <Input id="company-name" defaultValue="CinemaHub Entertainment" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email liên hệ</Label>
              <Input id="company-email" type="email" defaultValue="contact@cinemahub.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company-phone">Số điện thoại</Label>
              <Input id="company-phone" defaultValue="(028) 1234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Website</Label>
              <Input id="company-website" defaultValue="https://cinemahub.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Địa chỉ</Label>
            <Textarea id="company-address" defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt vận hành</CardTitle>
          <CardDescription>Cấu hình các thông số vận hành cơ bản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Múi giờ</Label>
              <Select defaultValue="asia-ho-chi-minh">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-ho-chi-minh">Asia/Ho_Chi_Minh (UTC+7)</SelectItem>
                  <SelectItem value="asia-bangkok">Asia/Bangkok (UTC+7)</SelectItem>
                  <SelectItem value="asia-singapore">Asia/Singapore (UTC+8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Đơn vị tiền tệ</Label>
              <Select defaultValue="vnd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vnd">VND (₫)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-window">Thời gian đặt vé trước (giờ)</Label>
              <Input id="booking-window" type="number" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellation-window">Thời gian hủy vé (giờ)</Label>
              <Input id="cancellation-window" type="number" defaultValue="1" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenance-mode" />
            <Label htmlFor="maintenance-mode">Chế độ bảo trì</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
