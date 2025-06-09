"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Shield, Bell, CreditCard, Settings, MapPin, Palette, Database } from "lucide-react"

const settingsNavigation = [
  {
    id: "general",
    title: "Cài đặt chung",
    icon: Settings,
  },
  {
    id: "account",
    title: "Tài khoản",
    icon: User,
  },
  {
    id: "security",
    title: "Bảo mật",
    icon: Shield,
  },
  {
    id: "notifications",
    title: "Thông báo",
    icon: Bell,
  },
  {
    id: "payment",
    title: "Thanh toán",
    icon: CreditCard,
  },
  {
    id: "theaters",
    title: "Rạp chiếu",
    icon: MapPin,
  },
  {
    id: "appearance",
    title: "Giao diện",
    icon: Palette,
  },
  {
    id: "system",
    title: "Hệ thống",
    icon: Database,
  },
]

interface SettingsSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <div className="w-64 border-r bg-muted/10">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Cài đặt</h2>
        <p className="text-sm text-muted-foreground">Quản lý cài đặt hệ thống</p>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-1 p-2">
          {settingsNavigation.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeSection === item.id && "bg-secondary text-secondary-foreground",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
