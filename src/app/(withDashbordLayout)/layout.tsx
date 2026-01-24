"use client"

import DashboardDrawer from "@/components/ui/dashboard/dashboardDrawer/DashboardDrawer"

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  

  return <DashboardDrawer>{children}</DashboardDrawer>
}