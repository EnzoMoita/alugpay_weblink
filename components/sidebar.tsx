"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreditCard, Home, Settings, Users, Activity, PieChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "Tenants",
    href: "/tenants",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: PieChart,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Activity,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-card lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="flex items-center text-2xl font-semibold tracking-tight">
            <CreditCard className="mr-2 h-6 w-6" />
            RentPay
          </h2>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}