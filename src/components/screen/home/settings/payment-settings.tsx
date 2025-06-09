"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, Plus } from "lucide-react"

export function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Thanh toán</h3>
        <p className="text-sm text-muted-foreground">Quản lý phương thức thanh toán</p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
          <CardDescription>Cấu hình các phương thức thanh toán được chấp nhận</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Hoạt động</Badge>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ví điện tử</p>
                <p className="text-sm text-muted-foreground">MoMo, ZaloPay, VNPay</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Hoạt động</Badge>
              <Switch defaultChecked />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Chuyển khoản ngân hàng</p>
                <p className="text-sm text-muted-foreground">Internet Banking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Tạm dừng</Badge>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cấu hình thanh toán</CardTitle>
          <CardDescription>Thiết lập các thông số thanh toán</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transaction-fee">Phí giao dịch (%)</Label>
              <Input id="transaction-fee" type="number" defaultValue="2.5" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-amount">Số tiền tối thiểu (VNĐ)</Label>
              <Input id="min-amount" type="number" defaultValue="50000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max-amount">Số tiền tối đa (VNĐ)</Label>
              <Input id="max-amount" type="number" defaultValue="10000000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Thời gian chờ thanh toán (phút)</Label>
              <Input id="timeout" type="number" defaultValue="15" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-refund" defaultChecked />
            <Label htmlFor="auto-refund">Tự động hoàn tiền khi hủy vé</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tài khoản ngân hàng</CardTitle>
          <CardDescription>Quản lý tài khoản ngân hàng nhận tiền</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Vietcombank - Chi nhánh TP.HCM</p>
                <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default">Chính</Badge>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Techcombank - Chi nhánh Quận 1</p>
                <p className="text-sm text-muted-foreground">**** **** **** 5678</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Phụ</Badge>
                <Button variant="outline" size="sm">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Thêm tài khoản ngân hàng
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Lưu cài đặt</Button>
      </div>
    </div>
  )
}
