"use client"

import DashboardDrawer from "@/components/ui/dashboard/dashboardDrawer/DashboardDrawer"
import { isLoggedIn } from "@/server/auth.service"
import { useRouter } from "next/navigation"

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  const router = useRouter()

  if(!isLoggedIn()){
    return router.push("/login")
  }

  return <DashboardDrawer>{children}</DashboardDrawer>
}