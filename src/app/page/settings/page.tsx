"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/screen/home/dashboard/components/app_sidebar"
import { DashboardHeader } from "@/components/screen/home/dashboard/components/dash_board_header"
import { SettingsSidebar } from "@/components/screen/home/settings/settings-sidebar"
import { GeneralSettings } from "@/components/screen/home/settings/general-settings"
import { AccountSettings } from "@/components/screen/home/settings/account-settings"
import { SecuritySettings } from "@/components/screen/home/settings/security-settings"
import { NotificationSettings } from "@/components/screen/home/settings/notification-settings"
import { PaymentSettings } from "@/components/screen/home/settings/payment-settings"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general")

  const renderSettingsSection = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettings />
      case "account":
        return <AccountSettings />
      case "security":
        return <SecuritySettings />
      case "notifications":
        return <NotificationSettings />
      case "payment":
        return <PaymentSettings />
      case "theaters":
        return <div>Theater Settings - Coming Soon</div>
      case "appearance":
        return <div>Appearance Settings - Coming Soon</div>
      case "system":
        return <div>System Settings - Coming Soon</div>
      default:
        return <GeneralSettings />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1">
          <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="flex-1 p-6 overflow-auto">{renderSettingsSection()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
