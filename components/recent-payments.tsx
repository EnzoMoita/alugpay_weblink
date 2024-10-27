"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentPayments = [
  {
    tenant: "Sarah Johnson",
    amount: 1200,
    status: "Completed",
    date: "2024-03-20",
    initials: "SJ"
  },
  {
    tenant: "Michael Chen",
    amount: 950,
    status: "Processing",
    date: "2024-03-19",
    initials: "MC"
  },
  {
    tenant: "Emily Brown",
    amount: 1500,
    status: "Completed",
    date: "2024-03-19",
    initials: "EB"
  },
  {
    tenant: "David Wilson",
    amount: 800,
    status: "Completed",
    date: "2024-03-18",
    initials: "DW"
  },
  {
    tenant: "Lisa Anderson",
    amount: 1100,
    status: "Processing",
    date: "2024-03-18",
    initials: "LA"
  }
]

export function RecentPayments() {
  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {recentPayments.map((payment, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{payment.initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{payment.tenant}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(payment.date).toLocaleDateString()}
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-medium leading-none">${payment.amount}</p>
              <p className={`text-sm ${
                payment.status === "Completed" 
                  ? "text-green-500" 
                  : "text-orange-500"
              }`}>
                {payment.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}