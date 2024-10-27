import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight, Clock, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

const paymentLinks = [
  {
    tenant: "Sarah Johnson",
    amount: 1200,
    status: "paid",
    dueDate: "2024-03-25",
    created: "2024-03-18",
  },
  {
    tenant: "Michael Chen",
    amount: 950,
    status: "pending",
    dueDate: "2024-03-30",
    created: "2024-03-19",
  },
  {
    tenant: "Emily Brown",
    amount: 1500,
    status: "expired",
    dueDate: "2024-03-15",
    created: "2024-03-10",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-orange-500" />
    case "expired":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return null
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "paid":
      return "Paid"
    case "pending":
      return "Pending"
    case "expired":
      return "Expired"
    default:
      return status
  }
}

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          Payment Links
        </h2>
        <Button asChild className="shadow-lg">
          <Link href="/payments/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Payment Link
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,650</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover-effect">
        <CardHeader>
          <CardTitle>Recent Payment Links</CardTitle>
          <CardDescription>
            Track and manage your payment links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg glass-effect hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-1">
                  <p className="font-medium">{link.tenant}</p>
                  <p className="text-sm text-muted-foreground">
                    Created on {new Date(link.created).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">${link.amount}</div>
                  <div className="text-sm">Due: {new Date(link.dueDate).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {getStatusIcon(link.status)}
                  <span className={`text-sm ${
                    link.status === "paid" 
                      ? "text-green-500" 
                      : link.status === "pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}>
                    {getStatusText(link.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}