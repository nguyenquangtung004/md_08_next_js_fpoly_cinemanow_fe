"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Key } from "lucide-react"

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bảo mật</h3>
        <p className="text-sm text-muted-foreground">Quản lý cài đặt bảo mật tài khoản</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Đổi mật khẩu</CardTitle>
          <CardDescription>Cập nhật mật khẩu để bảo vệ tài khoản</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Đổi mật khẩu</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
          <CardDescription>Tăng cường bảo mật với xác thực hai yếu tố</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ứng dụng xác thực</p>
                <p className="text-sm text-muted-foreground">Google Authenticator, Authy</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Chưa kích hoạt</Badge>
              <Switch />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Key className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Khóa bảo mật</p>
                <p className="text-sm text-muted-foreground">YubiKey, FIDO2</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Chưa kích hoạt</Badge>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phiên đăng nhập</CardTitle>
          <CardDescription>Quản lý các phiên đăng nhập hoạt động</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Chrome trên Windows</p>
                <p className="text-sm text-muted-foreground">192.168.1.100 • Hiện tại</p>
              </div>
              <Badge variant="default">Hiện tại</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Safari trên iPhone</p>
                <p className="text-sm text-muted-foreground">192.168.1.101 • 2 giờ trước</p>
              </div>
              <Button variant="outline" size="sm">
                Đăng xuất
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Firefox trên MacOS</p>
                <p className="text-sm text-muted-foreground">192.168.1.102 • 1 ngày trước</p>
              </div>
              <Button variant="outline" size="sm">
                Đăng xuất
              </Button>
            </div>
          </div>
          <Button variant="destructive" className="w-full">
            Đăng xuất tất cả thiết bị khác
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt bảo mật nâng cao</CardTitle>
          <CardDescription>Các tùy chọn bảo mật bổ sung</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Thông báo đăng nhập</p>
              <p className="text-sm text-muted-foreground">Nhận email khi có đăng nhập mới</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Khóa tài khoản tự động</p>
              <p className="text-sm text-muted-foreground">Khóa sau 5 lần đăng nhập sai</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Phiên làm việc tự động hết hạn</p>
              <p className="text-sm text-muted-foreground">Đăng xuất sau 8 giờ không hoạt động</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
