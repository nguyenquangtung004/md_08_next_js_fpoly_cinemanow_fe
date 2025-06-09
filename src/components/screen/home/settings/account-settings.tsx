"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera } from "lucide-react"

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tài khoản</h3>
        <p className="text-sm text-muted-foreground">Quản lý thông tin tài khoản cá nhân</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện</CardTitle>
          <CardDescription>Cập nhật ảnh đại diện của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Tải ảnh lên
              </Button>
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Chụp ảnh
              </Button>
              <p className="text-xs text-muted-foreground">JPG, PNG tối đa 2MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">Họ</Label>
              <Input id="first-name" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Tên</Label>
              <Input id="last-name" defaultValue="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@cinemahub.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" defaultValue="+84 123 456 789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Chức vụ</Label>
              <Input id="position" defaultValue="Quản trị viên hệ thống" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vai trò và quyền hạn</CardTitle>
          <CardDescription>Thông tin về vai trò và quyền hạn của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Vai trò hiện tại</p>
                <p className="text-sm text-muted-foreground">Quyền hạn trong hệ thống</p>
              </div>
              <Badge variant="default">Super Admin</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Quyền hạn:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Quản lý phim</Badge>
                <Badge variant="secondary">Quản lý đặt vé</Badge>
                <Badge variant="secondary">Quản lý khách hàng</Badge>
                <Badge variant="secondary">Quản lý rạp chiếu</Badge>
                <Badge variant="secondary">Xem báo cáo</Badge>
                <Badge variant="secondary">Cài đặt hệ thống</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Lưu thay đổi</Button>
      </div>
    </div>
  )
}
