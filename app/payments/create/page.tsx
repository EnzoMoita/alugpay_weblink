"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon, Copy, Link2, ArrowRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const formSchema = z.object({
  tenantName: z.string().min(2, "Tenant name must be at least 2 characters"),
  tenantEmail: z.string().email("Invalid email address"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  propertyAddress: z.string().min(5, "Property address is required"),
  paymentType: z.string(),
})

export default function CreatePaymentLink() {
  const [paymentLink, setPaymentLink] = useState("")
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: "",
      tenantEmail: "",
      amount: "",
      propertyAddress: "",
      paymentType: "rent",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const mockPaymentLink = `https://rentpay.com/pay/${Math.random().toString(36).substring(7)}`
    setPaymentLink(mockPaymentLink)
    toast.success("Payment link generated successfully!")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink)
    toast.success("Payment link copied to clipboard!")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          Create Payment Link
        </h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover-effect">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Payment Details</CardTitle>
            <CardDescription>
              Create a payment link to send to your tenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="tenantName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="glass-effect" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tenantEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="glass-effect" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                          <Input className="pl-7 glass-effect" placeholder="1000.00" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal glass-effect",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City, State" className="glass-effect" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="glass-effect">
                            <SelectValue placeholder="Select payment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="rent">Rent Payment</SelectItem>
                          <SelectItem value="deposit">Security Deposit</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="maintenance">Maintenance Fee</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Generate Payment Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {paymentLink && (
          <Card className="card-hover-effect gradient-border">
            <CardHeader>
              <CardTitle className="text-2xl">Payment Link Generated</CardTitle>
              <CardDescription>
                Share this link with your tenant to collect payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    value={paymentLink}
                    readOnly
                    className="pl-9 glass-effect"
                  />
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard} className="glass-effect">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="rounded-lg border p-6 glass-effect">
                <h4 className="font-semibold mb-4 text-lg">Next Steps:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                      1
                    </div>
                    Copy the payment link
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                      2
                    </div>
                    Share it with your tenant via email or message
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                      3
                    </div>
                    Track payment status in the dashboard
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="w-full glass-effect" onClick={() => {
                form.reset()
                setPaymentLink("")
              }}>
                Create Another Link
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}